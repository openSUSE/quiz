const test = require("node:test");
const assert = require("node:assert/strict");
const { createAttemptStore } = require("../src/attemptStore");

test("attempts survive store reconstruction and stay isolated by participant and quiz", () => {
  const persistedAttempts = {};
  const firstStore = createAttemptStore(persistedAttempts);
  const started = firstStore.start({
    username: "QuizPlayer",
    quizSlug: "linux",
    questionCount: 3,
    now: 100,
  });

  const reloadedStore = createAttemptStore(persistedAttempts);
  assert.equal(reloadedStore.get("QuizPlayer", "linux").id, started.id);
  assert.equal(reloadedStore.get("OtherPlayer", "linux"), null);
  assert.equal(reloadedStore.get("QuizPlayer", "other-quiz"), null);
  assert.notEqual(
    reloadedStore.start({
      username: "QuizPlayer",
      quizSlug: "other-quiz",
      questionCount: 3,
    }).id,
    started.id
  );
});

test("wrong answers persist and retried requests cannot count an answer twice", () => {
  const store = createAttemptStore({});
  const attempt = store.start({
    username: "QuizPlayer",
    quizSlug: "linux",
    questionCount: 2,
  });

  const wrong = store.answer({
    username: "QuizPlayer",
    quizSlug: "linux",
    questionIndex: 0,
    answerIndex: 1,
    correct: false,
    points: 500,
    now: 200,
  });
  assert.equal(wrong.attempt.wrong, 1);
  assert.equal(wrong.attempt.points, 0);
  assert.deepEqual(wrong.attempt.answers[0], {
    answerIndex: 1,
    correct: false,
    points: 0,
  });

  const retry = store.answer({
    username: "QuizPlayer",
    quizSlug: "linux",
    questionIndex: 0,
    answerIndex: 1,
    correct: true,
    points: 1000,
  });
  assert.equal(retry.duplicate, true);
  assert.equal(retry.attempt.wrong, 1);
  assert.equal(retry.attempt.correct, 0);
  assert.equal(retry.attempt.points, 0);
  assert.equal(store.get("QuizPlayer", "linux").currentQuestion, 1);
});

test("reloading a question never resets its server-side scoring clock", () => {
  const store = createAttemptStore({});
  store.start({ username: "QuizPlayer", quizSlug: "linux", questionCount: 2 });
  const firstView = store.startQuestion({
    username: "QuizPlayer",
    quizSlug: "linux",
    questionIndex: 0,
    now: 100,
  });
  const refreshedView = store.startQuestion({
    username: "QuizPlayer",
    quizSlug: "linux",
    questionIndex: 0,
    now: 900,
  });
  assert.equal(firstView.attempt.questionStartedAt, 100);
  assert.equal(refreshedView.attempt.questionStartedAt, 100);
});

test("out-of-order answers and duplicate agility submissions cannot inflate scores", () => {
  const store = createAttemptStore({});
  store.start({ username: "QuizPlayer", quizSlug: "linux", questionCount: 2 });
  const outOfOrder = store.answer({
    username: "QuizPlayer",
    quizSlug: "linux",
    questionIndex: 1,
    answerIndex: 0,
    correct: true,
    points: 1000,
  });
  assert.equal(outOfOrder.error, "out_of_order");

  store.startAgilityRound({
    username: "QuizPlayer",
    quizSlug: "linux",
    checkpoint: 1,
  });
  const earned = store.addAgilityPoints({
    username: "QuizPlayer",
    quizSlug: "linux",
    checkpoint: 1,
    points: 1000,
    maxPoints: 1000,
  });
  const duplicate = store.addAgilityPoints({
    username: "QuizPlayer",
    quizSlug: "linux",
    checkpoint: 1,
    points: 1000,
    maxPoints: 1000,
  });
  assert.equal(earned.attempt.points, 1000);
  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.attempt.points, 1000);
});

test("an interrupted agility round is forfeited and cannot be replayed", () => {
  const store = createAttemptStore({});
  store.start({ username: "QuizPlayer", quizSlug: "linux", questionCount: 2 });

  assert.equal(
    store.startAgilityRound({
      username: "QuizPlayer",
      quizSlug: "linux",
      checkpoint: 1,
    }).skipped,
    false
  );
  const afterReload = store.startAgilityRound({
    username: "QuizPlayer",
    quizSlug: "linux",
    checkpoint: 1,
  });
  assert.equal(afterReload.skipped, true);
  assert.equal(afterReload.attempt.agility[1].points, 0);
  assert.equal(
    store.startAgilityRound({
      username: "QuizPlayer",
      quizSlug: "linux",
      checkpoint: 1,
    }).skipped,
    true
  );
});
