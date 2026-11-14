const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const routes = require("../src/route");
const consts = require("../src/consts");
const { createAttemptStore } = require("../src/attemptStore");

const quizFiles = fs
  .readdirSync(consts.DATA_DIR_PATH)
  .filter((file) => file.endsWith(".js"));
const quizSlug = path.basename(quizFiles[0], ".js");
const quiz = require(path.join(consts.DATA_DIR_PATH, quizFiles[0]));
const secondQuizSlug = path.basename(quizFiles[1], ".js");
const agilityQuizEntry = quizFiles
  .map((file) => ({
    slug: path.basename(file, ".js"),
    quiz: require(path.join(consts.DATA_DIR_PATH, file)),
  }))
  .find(
    ({ quiz: data }) =>
      data.quizData.agility !== false && data.questions.length > 0
  );

async function createTestServer({ saveResultsToFile = () => {} } = {}) {
  const app = express();
  const results = {};
  const attempts = createAttemptStore({});
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    "/",
    routes({
      loadTranslations: async () => {},
      quizzes: [],
      gt: { gettext: (text) => text, setLocale: () => {} },
      results,
      attemptStore: attempts,
      RESET_TOKEN: "test-token",
      clearResults: () => {},
      saveResultsToFile,
      getWinnerCallTime: () => null,
      setWinnerCallTime: () => {},
    })
  );
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  return {
    server,
    results,
    attempts,
    baseUrl: `http://127.0.0.1:${server.address().port}`,
  };
}

async function post(baseUrl, route, payload) {
  return fetch(`${baseUrl}${route}`, {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function startQuestion(
  baseUrl,
  username,
  slug,
  attemptId,
  questionIndex
) {
  return post(baseUrl, "/api/attempt/question", {
    username,
    quizSlug: slug,
    attemptId,
    questionIndex,
  });
}

test("server resumes attempts, isolates identities, and accepts client retries safely", async (t) => {
  const context = await createTestServer();
  t.after(() => context.server.close());

  const first = await post(context.baseUrl, "/api/attempt/start", {
    username: "FirstPlayer",
    quizSlug,
  });
  assert.equal(first.status, 200);
  const firstAttempt = (await first.json()).attempt;
  const beforeAnswerRefresh = await post(
    context.baseUrl,
    "/api/attempt/start",
    { username: "FirstPlayer", quizSlug, attemptId: firstAttempt.id }
  );
  assert.equal(beforeAnswerRefresh.status, 200);
  assert.equal((await beforeAnswerRefresh.json()).attempt.currentQuestion, 0);
  const questionStarted = await startQuestion(
    context.baseUrl,
    "FirstPlayer",
    quizSlug,
    firstAttempt.id,
    0
  );
  assert.equal(questionStarted.status, 200);
  const wrongIndex = quiz.questions[0].answers.findIndex(
    (answer) => !answer.correct
  );
  const wrongPayload = {
    username: "FirstPlayer",
    quizSlug,
    attemptId: firstAttempt.id,
    questionIndex: 0,
    answerIndex: wrongIndex,
    correct: true,
    points: 999999,
  };
  const wrongResponse = await post(
    context.baseUrl,
    "/api/attempt/answer",
    wrongPayload
  );
  assert.equal(wrongResponse.status, 200);
  const savedWrong = (await wrongResponse.json()).attempt;
  assert.equal(savedWrong.wrong, 1);
  assert.equal(savedWrong.correct, 0);
  assert.equal(savedWrong.points, 0);

  const retryResponse = await post(
    context.baseUrl,
    "/api/attempt/answer",
    wrongPayload
  );
  assert.equal(retryResponse.status, 200);
  assert.equal((await retryResponse.json()).attempt.wrong, 1);

  const resumed = await post(context.baseUrl, "/api/attempt/start", {
    username: "FirstPlayer",
    quizSlug,
    attemptId: firstAttempt.id,
  });
  const resumedAttempt = (await resumed.json()).attempt;
  assert.equal(resumedAttempt.id, firstAttempt.id);
  assert.equal(resumedAttempt.currentQuestion, 1);
  assert.equal(resumedAttempt.wrong, 1);
  const secondRefresh = await post(context.baseUrl, "/api/attempt/start", {
    username: "FirstPlayer",
    quizSlug,
    attemptId: firstAttempt.id,
  });
  assert.equal((await secondRefresh.json()).attempt.wrong, 1);

  const stolen = await post(context.baseUrl, "/api/attempt/start", {
    username: "FirstPlayer",
    quizSlug,
  });
  assert.equal(stolen.status, 409);

  const otherParticipant = await post(context.baseUrl, "/api/attempt/start", {
    username: "OtherPlayer",
    quizSlug,
  });
  const otherQuiz = await post(context.baseUrl, "/api/attempt/start", {
    username: "FirstPlayer",
    quizSlug: secondQuizSlug,
  });
  assert.notEqual((await otherParticipant.json()).attempt.id, firstAttempt.id);
  assert.notEqual((await otherQuiz.json()).attempt.id, firstAttempt.id);
  assert.equal(
    context.attempts.get("OtherPlayer", quizSlug).currentQuestion,
    0
  );
});

test("normal completion scores server answers and duplicate submit requests do not create retakes", async (t) => {
  const context = await createTestServer();
  t.after(() => context.server.close());

  const started = await post(context.baseUrl, "/api/attempt/start", {
    username: "CompletePlayer",
    quizSlug,
  });
  let attempt = (await started.json()).attempt;
  for (
    let questionIndex = 0;
    questionIndex < quiz.questions.length;
    questionIndex++
  ) {
    const questionStarted = await startQuestion(
      context.baseUrl,
      "CompletePlayer",
      quizSlug,
      attempt.id,
      questionIndex
    );
    assert.equal(questionStarted.status, 200);
    const answerIndex = quiz.questions[questionIndex].answers.findIndex(
      (answer) => answer.correct
    );
    const response = await post(context.baseUrl, "/api/attempt/answer", {
      username: "CompletePlayer",
      quizSlug,
      attemptId: attempt.id,
      questionIndex,
      answerIndex,
      correct: false,
      points: 0,
    });
    assert.equal(response.status, 200);
    attempt = (await response.json()).attempt;
  }

  const submission = {
    username: "CompletePlayer",
    quizTitle: quiz.quizData.title,
    quizSlug,
    attemptId: attempt.id,
    correct: 0,
    total: 0,
    points: 0,
    lang: "en",
  };
  const response = await post(context.baseUrl, "/submit", submission);
  assert.equal(response.status, 302);
  const saved = context.results.CompletePlayer.quizzes[quizSlug];
  assert.equal(saved.correct, attempt.correct);
  assert.equal(saved.correct, quiz.questions.length);
  assert.equal(saved.total, quiz.questions.length);
  assert.equal(saved.points, attempt.points);
  assert.ok(saved.points > 0);
  assert.equal(context.attempts.get("CompletePlayer", quizSlug), null);

  const duplicate = await post(context.baseUrl, "/submit", submission);
  assert.equal(duplicate.status, 302);
  assert.equal(context.results.CompletePlayer.quizzes[quizSlug].retakes, 0);

  const retake = await post(context.baseUrl, "/api/attempt/start", {
    username: "CompletePlayer",
    quizSlug,
  });
  const newAttempt = (await retake.json()).attempt;
  assert.notEqual(newAttempt.id, attempt.id);
  assert.equal(newAttempt.currentQuestion, 0);
});

test("an interrupted agility checkpoint cannot be rerolled after refresh", async (t) => {
  assert.ok(agilityQuizEntry, "test data includes an agility quiz");
  const context = await createTestServer();
  t.after(() => context.server.close());
  const { slug, quiz: agilityQuiz } = agilityQuizEntry;
  const started = await post(context.baseUrl, "/api/attempt/start", {
    username: "AgilityPlayer",
    quizSlug: slug,
  });
  let attempt = (await started.json()).attempt;
  const checkpoint = consts.agilityCheckpoints(agilityQuiz.questions.length)[0];

  for (let questionIndex = 0; questionIndex < checkpoint; questionIndex++) {
    const questionStarted = await startQuestion(
      context.baseUrl,
      "AgilityPlayer",
      slug,
      attempt.id,
      questionIndex
    );
    assert.equal(questionStarted.status, 200);
    const answerIndex = agilityQuiz.questions[questionIndex].answers.findIndex(
      (answer) => answer.correct
    );
    const response = await post(context.baseUrl, "/api/attempt/answer", {
      username: "AgilityPlayer",
      quizSlug: slug,
      attemptId: attempt.id,
      questionIndex,
      answerIndex,
    });
    assert.equal(response.status, 200);
    attempt = (await response.json()).attempt;
  }

  const round = {
    username: "AgilityPlayer",
    quizSlug: slug,
    attemptId: attempt.id,
    checkpoint,
  };
  const firstStart = await post(
    context.baseUrl,
    "/api/attempt/agility/start",
    round
  );
  assert.equal(firstStart.status, 200);
  const refresh = await post(
    context.baseUrl,
    "/api/attempt/agility/start",
    round
  );
  assert.equal(refresh.status, 200);
  const resumed = (await refresh.json()).attempt;
  assert.deepEqual(resumed.agility[checkpoint], { points: 0, finished: true });

  const replay = await post(context.baseUrl, "/api/attempt/agility", {
    ...round,
    points: 1000,
  });
  assert.equal(replay.status, 409);
});

test("a failed progress save can be retried without losing or duplicating an answer", async (t) => {
  let failSave = false;
  const context = await createTestServer({
    saveResultsToFile: () => {
      if (failSave) throw new Error("simulated storage failure");
    },
  });
  t.after(() => context.server.close());
  const started = await post(context.baseUrl, "/api/attempt/start", {
    username: "RetryPlayer",
    quizSlug,
  });
  const attempt = (await started.json()).attempt;
  await startQuestion(context.baseUrl, "RetryPlayer", quizSlug, attempt.id, 0);
  const payload = {
    username: "RetryPlayer",
    quizSlug,
    attemptId: attempt.id,
    questionIndex: 0,
    answerIndex: quiz.questions[0].answers.findIndex(
      (answer) => !answer.correct
    ),
  };

  failSave = true;
  assert.equal(
    (await post(context.baseUrl, "/api/attempt/answer", payload)).status,
    503
  );
  failSave = false;
  const retry = await post(context.baseUrl, "/api/attempt/answer", payload);
  assert.equal(retry.status, 200);
  const saved = (await retry.json()).attempt;
  assert.equal(saved.wrong, 1);
  assert.equal(saved.currentQuestion, 1);
});
