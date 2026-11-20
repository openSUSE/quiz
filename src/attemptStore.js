const crypto = require("crypto");

function attemptKey(username, quizSlug) {
  return crypto
    .createHash("sha256")
    .update(`${username.trim().toLowerCase()}\0${quizSlug}`)
    .digest("hex");
}

function createAttempt({
  username,
  quizSlug,
  questionCount,
  now = Date.now(),
}) {
  return {
    id: crypto.randomUUID(),
    username,
    quizSlug,
    questionCount,
    currentQuestion: 0,
    correct: 0,
    wrong: 0,
    points: 0,
    answers: [],
    agility: {},
    questionStartedAt: null,
    updatedAt: now,
  };
}

function createAttemptStore(attempts = {}) {
  return {
    get(username, quizSlug) {
      return attempts[attemptKey(username, quizSlug)] || null;
    },
    start(options) {
      const key = attemptKey(options.username, options.quizSlug);
      if (!attempts[key]) attempts[key] = createAttempt(options);
      return attempts[key];
    },
    answer({
      username,
      quizSlug,
      questionIndex,
      answerIndex,
      correct,
      points,
      now = Date.now(),
    }) {
      const attempt = this.get(username, quizSlug);
      if (!attempt) return { error: "not_found" };

      // A retried request for the last accepted answer returns the saved state.
      if (questionIndex === attempt.currentQuestion - 1) {
        const previous = attempt.answers[questionIndex];
        if (previous && previous.answerIndex === answerIndex) {
          return { attempt, duplicate: true };
        }
      }
      if (
        questionIndex !== attempt.currentQuestion ||
        questionIndex >= attempt.questionCount
      ) {
        return { error: "out_of_order" };
      }

      const earned = Number.isFinite(Number(points))
        ? correct
          ? Math.max(0, Math.round(Number(points)))
          : 0
        : 0;
      attempt.answers.push({
        answerIndex,
        correct: Boolean(correct),
        points: earned,
      });
      if (correct) attempt.correct += 1;
      else attempt.wrong += 1;
      attempt.points += earned;
      attempt.currentQuestion += 1;
      attempt.questionStartedAt = null;
      attempt.updatedAt = now;
      return { attempt, duplicate: false };
    },
    startQuestion({ username, quizSlug, questionIndex, now = Date.now() }) {
      const attempt = this.get(username, quizSlug);
      if (!attempt) return { error: "not_found" };
      if (
        questionIndex !== attempt.currentQuestion ||
        questionIndex >= attempt.questionCount
      ) {
        return { error: "out_of_order" };
      }
      if (attempt.questionStartedAt === null) {
        attempt.questionStartedAt = now;
        attempt.updatedAt = now;
      }
      return { attempt };
    },
    addAgilityPoints({
      username,
      quizSlug,
      checkpoint,
      points,
      maxPoints,
      now = Date.now(),
    }) {
      const attempt = this.get(username, quizSlug);
      if (!attempt) return { error: "not_found" };
      if (attempt.agility[checkpoint]?.finished)
        return { attempt, duplicate: true };
      const requested = Number(points);
      const earned = Number.isFinite(requested)
        ? Math.max(0, Math.min(Math.round(requested), maxPoints))
        : 0;
      attempt.agility[checkpoint] = { points: earned, finished: true };
      attempt.points += earned;
      attempt.updatedAt = now;
      return { attempt, duplicate: false };
    },
    startAgilityRound({ username, quizSlug, checkpoint, now = Date.now() }) {
      const attempt = this.get(username, quizSlug);
      if (!attempt) return { error: "not_found" };
      const previous = attempt.agility[checkpoint];
      if (previous?.finished) return { attempt, skipped: true };
      if (previous?.startedAt) {
        // An interrupted round is forfeited, so a reload cannot reroll it.
        attempt.agility[checkpoint] = { points: 0, finished: true };
        attempt.updatedAt = now;
        return { attempt, skipped: true };
      }
      attempt.agility[checkpoint] = { startedAt: now };
      attempt.updatedAt = now;
      return { attempt, skipped: false };
    },
    finish(username, quizSlug) {
      const key = attemptKey(username, quizSlug);
      const attempt = attempts[key] || null;
      if (attempt) delete attempts[key];
      return attempt;
    },
    restore(attempt) {
      if (attempt)
        attempts[attemptKey(attempt.username, attempt.quizSlug)] = attempt;
    },
  };
}

function publicAttempt(attempt) {
  if (!attempt) return null;
  return {
    id: attempt.id,
    username: attempt.username,
    quizSlug: attempt.quizSlug,
    currentQuestion: attempt.currentQuestion,
    correct: attempt.correct,
    wrong: attempt.wrong,
    points: attempt.points,
    answers: attempt.answers,
    agility: attempt.agility,
    questionStartedAt: attempt.questionStartedAt,
  };
}

module.exports = { attemptKey, createAttemptStore, publicAttempt };
