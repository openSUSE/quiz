/* Agility mini-games played between question blocks.
 *
 * Every round resolves to { points, max } where max is AGILITY_MAX_POINTS.
 * Rounds use the inline <symbol id="geeko"> from views/partials/geeko-symbol.ejs
 * so the Geeko can be recoloured through CSS `color`.
 */
/* exported Agility */

const Agility = (() => {
  const MAX_POINTS = 1000;

  // openSUSE LCP palette
  const PALETTE = {
    geekoGreen: "#42cd42",
    yarrowYellow: "#d4cb1b",
    orange: "#f68946",
    radishRed: "#ff5b45",
    plumPurple: "#a498ff",
    butterflyBlue: "#00c8ff",
    turquoiseTeal: "#20caa3",
    gabbroGray: "#b8aeab",
    mapleMaroon: "#301a14",
  };
  // Distractors must stay distinguishable from green for colour-blind
  // players. Red, orange and yellow collapse into green for protan/deutan
  // vision and teal does for tritan, so they are deliberately left out.
  const DISTRACTORS = [
    PALETTE.mapleMaroon,
    PALETTE.plumPurple,
    PALETTE.butterflyBlue,
    PALETTE.gabbroGray,
  ];

  const ROUND_TYPES = ["tapGreen", "swipeAway", "puzzle"];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Linear decay from 1.0 (at or below `fastMs`) to `floor` (at `slowMs`).
  function speedFactor(ms, fastMs, slowMs, floor = 0.5) {
    if (ms <= fastMs) return 1;
    const t = clamp((ms - fastMs) / (slowMs - fastMs), 0, 1);
    return 1 - t * (1 - floor);
  }

  function geekoSvg(color, extraClass = "") {
    return `<svg class="geeko-svg ${extraClass}" viewBox="0 0 400 188" style="color:${color}" aria-hidden="true"><use href="#geeko"/></svg>`;
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function floatText(stage, x, y, text, good) {
    const f = el("div", `agility-float ${good ? "good" : "bad"}`, text);
    f.style.left = `${x}px`;
    f.style.top = `${y}px`;
    stage.appendChild(f);
    setTimeout(() => f.remove(), 900);
  }

  function makeHud(root, s) {
    const hud = el("div", "agility-hud");
    hud.innerHTML = `
      <span class="agility-hud-points">${s.points}: <strong>0</strong></span>
      <span class="agility-hud-bar"><span></span></span>`;
    root.appendChild(hud);
    const pointsEl = hud.querySelector("strong");
    const barEl = hud.querySelector(".agility-hud-bar span");
    return {
      setPoints: (p) => (pointsEl.textContent = Math.round(p)),
      setProgress: (fraction) =>
        (barEl.style.width = `${clamp(1 - fraction, 0, 1) * 100}%`),
    };
  }

  /* ---------- intro + countdown + result screens ---------- */

  function showIntro(root, s, title, help, demoHtml) {
    return new Promise((resolve) => {
      root.innerHTML = `
        <div class="agility-intro">
          <p class="agility-kicker">⚡ ${s.agilityTime}</p>
          <h2>${title}</h2>
          <div class="agility-demo">${demoHtml}</div>
          <p class="agility-help">${help}</p>
          <button type="button" class="agility-go">${s.ready}</button>
        </div>`;
      root
        .querySelector(".agility-go")
        .addEventListener("click", () => resolve(), { once: true });
    });
  }

  async function countdown(root, s) {
    for (const label of ["3", "2", "1", s.go]) {
      root.innerHTML = `<div class="agility-countdown">${label}</div>`;
      await sleep(label === s.go ? 400 : 650);
    }
    root.innerHTML = "";
  }

  function showResult(root, s, points) {
    return new Promise((resolve) => {
      root.innerHTML = `
        <div class="agility-result">
          <p>${s.roundPoints}</p>
          <div class="agility-result-points">+${Math.round(points)}</div>
          <button type="button" class="agility-continue" disabled>${s.continue}</button>
        </div>`;
      const btn = root.querySelector(".agility-continue");
      // short delay so a frantic last tap does not skip the result
      setTimeout(() => (btn.disabled = false), 700);
      btn.addEventListener("click", () => resolve(), { once: true });
    });
  }

  /* ---------- round 1: tap only the green Geekos ---------- */

  async function playTapGreen(root, s) {
    const GREENS = 10;
    const POINTS_HIT = MAX_POINTS / GREENS;
    const POINTS_MISS = 50;
    const SPAWN_EVERY = 600;

    const hud = makeHud(root, s);
    const stage = el("div", "agility-stage tap-stage");
    root.appendChild(stage);

    const spawns = shuffle([
      ...Array(GREENS).fill(PALETTE.geekoGreen),
      ...Array.from({ length: GREENS }, () => pick(DISTRACTORS)),
    ]);
    let points = 0;
    const total = spawns.length * SPAWN_EVERY + 1200;
    const start = performance.now();

    const tick = setInterval(() => {
      hud.setProgress((performance.now() - start) / total);
    }, 50);

    const live = new Set();

    function place(w, h) {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      let best = null;
      for (let attempt = 0; attempt < 12; attempt++) {
        const x = rand(0, Math.max(1, W - w));
        const y = rand(0, Math.max(1, H - h));
        const overlaps = [...live].some((g) => {
          const r = g._rect;
          return x < r.x + r.w && x + w > r.x && y < r.y + r.h && y + h > r.y;
        });
        best = { x, y };
        if (!overlaps) break;
      }
      return best;
    }

    function spawn(color, lifetime) {
      const w = clamp(stage.clientWidth * rand(0.24, 0.32), 90, 150);
      const h = w * (188 / 400) + 16;
      const { x, y } = place(w, h);
      const g = el("button", "tap-geeko", geekoSvg(color));
      g.type = "button";
      g._rect = { x, y, w, h };
      g.style.left = `${x}px`;
      g.style.top = `${y}px`;
      g.style.width = `${w}px`;
      const flip = Math.random() < 0.5 ? -1 : 1;
      g.style.setProperty("--tilt", `${rand(-18, 18)}deg`);
      g.style.setProperty("--flip", flip);
      const isGreen = color === PALETTE.geekoGreen;

      g.addEventListener(
        "pointerdown",
        (e) => {
          e.preventDefault();
          if (g.dataset.done) return;
          g.dataset.done = "1";
          const fx = x + w / 2;
          const fy = y;
          if (isGreen) {
            points += POINTS_HIT;
            g.classList.add("hit");
            floatText(stage, fx, fy, `+${POINTS_HIT}`, true);
          } else {
            points = Math.max(0, points - POINTS_MISS);
            g.classList.add("miss");
            stage.classList.remove("shake");
            void stage.offsetWidth;
            stage.classList.add("shake");
            floatText(stage, fx, fy, `−${POINTS_MISS}`, false);
          }
          hud.setPoints(points);
          setTimeout(() => remove(g), 250);
        },
        { once: false }
      );

      live.add(g);
      stage.appendChild(g);
      setTimeout(() => remove(g), lifetime);
    }

    function remove(g) {
      if (!live.has(g)) return;
      live.delete(g);
      g.classList.add("gone");
      setTimeout(() => g.remove(), 200);
    }

    for (let i = 0; i < spawns.length; i++) {
      // lifetime shrinks from 1500ms to 1000ms over the round
      const lifetime = 1500 - (500 * i) / (spawns.length - 1);
      spawn(spawns[i], lifetime);
      await sleep(SPAWN_EVERY);
    }
    await sleep(1200);
    clearInterval(tick);
    return clamp(points, 0, MAX_POINTS);
  }

  /* ---------- round 2: swipe away from the spinning Geeko ---------- */

  // Geeko artwork faces right; CSS rotation is clockwise.
  const FACING = { right: 0, down: 90, left: 180, up: 270 };
  const OPPOSITE = { right: "left", left: "right", up: "down", down: "up" };
  const ARROWS = { right: "→", left: "←", up: "↑", down: "↓" };

  async function playSwipeAway(root, s) {
    const TURNS = 8;
    const PER_TURN = MAX_POINTS / TURNS;
    const WINDOW_MS = 2500;

    const hud = makeHud(root, s);
    const stage = el("div", "agility-stage swipe-stage");
    stage.innerHTML = `<div class="swipe-geeko">${geekoSvg(PALETTE.geekoGreen)}</div><div class="swipe-hint"></div>`;
    root.appendChild(stage);
    const geeko = stage.querySelector(".swipe-geeko");
    const hint = stage.querySelector(".swipe-hint");

    let angle = 0;
    let points = 0;
    let facing = "right";

    // input: pointer swipes + arrow keys, routed to the current resolver
    let resolveInput = null;
    let downAt = null;
    const onDown = (e) => {
      downAt = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e) => {
      if (!downAt) return;
      const dx = e.clientX - downAt.x;
      const dy = e.clientY - downAt.y;
      downAt = null;
      if (Math.hypot(dx, dy) < 30) return;
      const dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? "right"
            : "left"
          : dy > 0
            ? "down"
            : "up";
      if (resolveInput) resolveInput(dir);
    };
    const onKey = (e) => {
      const map = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      };
      if (map[e.key]) {
        e.preventDefault();
        if (resolveInput) resolveInput(map[e.key]);
      }
    };
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);

    for (let turn = 0; turn < TURNS; turn++) {
      hud.setProgress(turn / TURNS);
      stage.classList.remove("good", "bad");
      hint.textContent = "";

      // spin: a couple of full turns, then land on a new direction
      let next = pick(Object.keys(FACING));
      if (next === facing && Math.random() < 0.7)
        next = pick(Object.keys(FACING));
      const spinMs = rand(550, 900);
      const base = Math.ceil(angle / 360) * 360;
      angle = base + 360 * Math.ceil(rand(1, 2.5)) + FACING[next];
      facing = next;
      geeko.style.transition = `transform ${spinMs}ms cubic-bezier(.2,.8,.25,1)`;
      geeko.style.transform = `rotate(${angle}deg)`;
      await sleep(spinMs);

      const t0 = performance.now();
      const answer = await new Promise((resolve) => {
        const timer = setTimeout(() => resolve(null), WINDOW_MS);
        resolveInput = (dir) => {
          clearTimeout(timer);
          resolve(dir);
        };
      });
      resolveInput = null;
      const rt = performance.now() - t0;

      const expected = OPPOSITE[facing];
      const cx = stage.clientWidth / 2;
      if (answer === expected) {
        const gained = Math.round(PER_TURN * speedFactor(rt, 500, 2000));
        points += gained;
        stage.classList.add("good");
        floatText(stage, cx, 20, `+${gained}`, true);
      } else {
        stage.classList.add("bad");
        hint.textContent = answer
          ? ARROWS[expected]
          : `${s.tooSlow} ${ARROWS[expected]}`;
        floatText(stage, cx, 20, "+0", false);
      }
      hud.setPoints(points);
      await sleep(550);
    }

    hud.setProgress(1);
    stage.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("keydown", onKey);
    return clamp(points, 0, MAX_POINTS);
  }

  /* ---------- round 3: put the sliced Geeko back together ---------- */

  async function playPuzzle(root, s) {
    const COLS = 3;
    const ROWS = 2;
    const N = COLS * ROWS;
    const LIMIT_MS = 30000;
    const VB_W = 400;
    const VB_H = 188;
    const tileW = VB_W / COLS;
    const tileH = VB_H / ROWS;

    const hud = makeHud(root, s);
    const stage = el("div", "agility-stage puzzle-stage");
    const board = el("div", "puzzle-board");
    board.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
    board.style.aspectRatio = `${VB_W} / ${VB_H}`;
    stage.appendChild(board);
    root.appendChild(stage);

    // order[slot] = piece index; make sure we never start solved
    let order;
    do {
      order = shuffle([...Array(N).keys()]);
    } while (order.every((p, i) => p === i));

    const tiles = order.map(() => {
      const t = el("button", "puzzle-tile");
      t.type = "button";
      board.appendChild(t);
      return t;
    });

    function render() {
      tiles.forEach((t, slot) => {
        const piece = order[slot];
        const vx = (piece % COLS) * tileW;
        const vy = Math.floor(piece / COLS) * tileH;
        t.innerHTML = `<svg viewBox="${vx} ${vy} ${tileW} ${tileH}" preserveAspectRatio="none" style="color:${PALETTE.geekoGreen}"><use href="#geeko" x="0" y="0" width="${VB_W}" height="${VB_H}"/></svg>`;
        t.classList.toggle("in-place", piece === slot);
      });
    }
    render();

    const solved = () => order.every((p, i) => p === i);
    const start = performance.now();
    let selected = null;

    const result = await new Promise((resolve) => {
      const tick = setInterval(() => {
        const elapsed = performance.now() - start;
        hud.setProgress(elapsed / LIMIT_MS);
        if (elapsed >= LIMIT_MS) {
          clearInterval(tick);
          resolve({ done: false, elapsed });
        }
      }, 50);

      tiles.forEach((t, slot) => {
        t.addEventListener("click", () => {
          if (selected === null) {
            selected = slot;
            t.classList.add("selected");
            return;
          }
          tiles[selected].classList.remove("selected");
          if (selected !== slot) {
            [order[selected], order[slot]] = [order[slot], order[selected]];
            render();
          }
          selected = null;
          if (solved()) {
            clearInterval(tick);
            resolve({ done: true, elapsed: performance.now() - start });
          }
        });
      });
    });

    tiles.forEach((t) => (t.disabled = true));
    let points;
    if (result.done) {
      board.classList.add("solved");
      points = Math.round(
        MAX_POINTS * speedFactor(result.elapsed, 6000, LIMIT_MS)
      );
    } else {
      // partial credit for pieces already in place
      const placed = order.filter((p, i) => p === i).length;
      points = Math.round((MAX_POINTS * 0.4 * placed) / N);
    }
    hud.setPoints(points);
    floatText(stage, stage.clientWidth / 2, 20, `+${points}`, result.done);
    await sleep(900);
    return clamp(points, 0, MAX_POINTS);
  }

  /* ---------- public API ---------- */

  const ROUNDS = {
    tapGreen: {
      title: (s) => s.tapGreenTitle,
      help: (s) => s.tapGreenHelp,
      demo: () =>
        geekoSvg(PALETTE.geekoGreen, "demo-good") +
        geekoSvg(PALETTE.plumPurple, "demo-bad") +
        geekoSvg(PALETTE.mapleMaroon, "demo-bad"),
      play: playTapGreen,
    },
    swipeAway: {
      title: (s) => s.swipeTitle,
      help: (s) => s.swipeHelp,
      demo: () =>
        `<span class="demo-arrow">←</span>${geekoSvg(PALETTE.geekoGreen)}`,
      play: playSwipeAway,
    },
    puzzle: {
      title: (s) => s.puzzleTitle,
      help: (s) => s.puzzleHelp,
      demo: () => `<span class="demo-puzzle">🧩</span>`,
      play: playPuzzle,
    },
  };

  async function runRound(type, root, strings) {
    const round = ROUNDS[type] || ROUNDS.tapGreen;
    document.body.classList.add("agility-active");
    root.classList.remove("hide");
    root.scrollIntoView({ block: "start", behavior: "smooth" });
    await showIntro(
      root,
      strings,
      round.title(strings),
      round.help(strings),
      round.demo()
    );
    await countdown(root, strings);
    root.scrollIntoView({ block: "start", behavior: "smooth" });
    const points = await round.play(root, strings);
    await showResult(root, strings, points);
    root.innerHTML = "";
    root.classList.add("hide");
    document.body.classList.remove("agility-active");
    return { points, max: MAX_POINTS };
  }

  return {
    MAX_POINTS,
    ROUND_TYPES,
    runRound,
    speedFactor,
  };
})();
