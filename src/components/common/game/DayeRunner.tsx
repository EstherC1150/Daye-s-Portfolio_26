import { useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 800;
const H = 300;
const GROUND_Y = 240;
const GRAVITY = 0.6;
const JUMP_FORCE = -13;
const INITIAL_SPEED = 5;

const OBSTACLES = ["Bug 🐛", "404", "Deadline", "NaN", "undefined"];
const COINS = ["React", "TS", "CSS", "Git", "Node"];
const ACCENT = "#00c878";
const BG = "#0f172a";
const DIM = "#1e293b";
const TEXT_COLOR = "#f1f5f9";
const SECONDARY = "#64748b";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Obstacle { x: number; w: number; h: number; label: string }
interface Coin { x: number; y: number; label: string; collected: boolean }
interface Star { x: number; y: number; r: number; twinkle: number }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string }

const makeStars = (): Star[] =>
  Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * (GROUND_Y - 40),
    r: Math.random() * 1.5 + 0.3,
    twinkle: Math.random() * Math.PI * 2,
  }));

// ─── Draw helpers ─────────────────────────────────────────────────────────────
function drawPixelChar(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const p = 4;
  // Head
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillRect(x + p, y, p * 2, p);         // head top
  ctx.fillRect(x, y + p, p * 4, p);          // head mid
  ctx.fillRect(x, y + p * 2, p * 4, p);      // head bot
  // Glasses
  ctx.fillStyle = ACCENT;
  ctx.fillRect(x + p, y + p, p, p);
  ctx.fillRect(x + p * 3, y + p, p, p);
  // Body
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillRect(x, y + p * 3, p * 4, p);      // torso
  ctx.fillRect(x, y + p * 4, p * 4, p);
  // Legs (running animation via Y offset passed in)
  ctx.fillRect(x, y + p * 5, p, p * 2);
  ctx.fillRect(x + p * 3, y + p * 5, p, p * 2);
}

function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
  ctx.shadowColor = "#ef4444";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#7f1d1d";
  ctx.fillRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h);
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 2;
  ctx.strokeRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fca5a5";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText(obs.label, obs.x + obs.w / 2, GROUND_Y - obs.h - 5);
}

function drawCoin(ctx: CanvasRenderingContext2D, coin: Coin, frame: number) {
  if (coin.collected) return;
  const pulse = Math.sin(frame * 0.08) * 2;
  ctx.shadowColor = ACCENT;
  ctx.shadowBlur = 8 + pulse;
  ctx.fillStyle = ACCENT;
  ctx.beginPath();
  ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = BG;
  ctx.font = "bold 7px monospace";
  ctx.textAlign = "center";
  ctx.fillText(coin.label, coin.x, coin.y + 3);
}

function drawCityBg(ctx: CanvasRenderingContext2D, bgX: number) {
  const buildings = [
    { w: 60, h: 100, c: "#1e293b" }, { w: 40, h: 140, c: "#162032" },
    { w: 80, h: 80, c: "#1a2840" },  { w: 50, h: 120, c: "#1e293b" },
    { w: 70, h: 90, c: "#162032" },  { w: 45, h: 160, c: "#1a2840" },
    { w: 55, h: 110, c: "#1e293b" }, { w: 65, h: 75, c: "#162032" },
  ];
  const totalW = buildings.reduce((s, b) => s + b.w + 10, 0);
  const offset = ((bgX * 0.3) % totalW + totalW) % totalW;
  let xPos = -offset;
  for (let rep = 0; rep < 3; rep++) {
    buildings.forEach((b) => {
      ctx.fillStyle = b.c;
      ctx.fillRect(xPos, GROUND_Y - b.h, b.w, b.h);
      ctx.fillStyle = ACCENT + "44";
      for (let wy = GROUND_Y - b.h + 10; wy < GROUND_Y - 8; wy += 20) {
        for (let wx = xPos + 6; wx < xPos + b.w - 6; wx += 14) {
          if (Math.random() > 0.45) ctx.fillRect(wx, wy, 6, 8);
        }
      }
      xPos += b.w + 10;
    });
  }
}

function drawStars(ctx: CanvasRenderingContext2D, stars: Star[], frame: number) {
  stars.forEach((s) => {
    const alpha = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.02 + s.twinkle));
    ctx.fillStyle = `rgba(241,245,249,${alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawGround(ctx: CanvasRenderingContext2D, bgX: number) {
  ctx.strokeStyle = SECONDARY + "44";
  ctx.lineWidth = 1;
  const step = 40;
  const offset = bgX % step;
  for (let x = -offset; x < W + step; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, GROUND_Y);
    ctx.lineTo(x - 20, H);
    ctx.stroke();
  }
  ctx.fillStyle = DIM;
  ctx.fillRect(0, GROUND_Y, W, 2);
  ctx.fillStyle = ACCENT + "55";
  ctx.fillRect(0, GROUND_Y, W, 1);
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach((p) => {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 4, 4);
  });
  ctx.globalAlpha = 1;
}

function drawHUD(ctx: CanvasRenderingContext2D, score: number, hiScore: number, speed: number) {
  ctx.font = "bold 13px 'Courier New', monospace";
  ctx.textAlign = "left";
  ctx.fillStyle = ACCENT;
  ctx.fillText(`SCORE  ${String(Math.floor(score)).padStart(6, "0")}`, 14, 22);
  ctx.fillStyle = SECONDARY;
  ctx.fillText(`HI  ${String(Math.floor(hiScore)).padStart(6, "0")}`, 14, 40);
  const lvl = Math.min(Math.floor((speed - INITIAL_SPEED) / 0.5) + 1, 10);
  ctx.textAlign = "right";
  ctx.fillStyle = ACCENT;
  ctx.fillText(`LV.${lvl}`, W - 14, 22);
}

// ─── Component ────────────────────────────────────────────────────────────────
interface DayeRunnerProps { isActive: boolean }

export default function DayeRunner({ isActive }: DayeRunnerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef({
    playerY: GROUND_Y - 44,
    playerVY: 0,
    onGround: true,
    obstacles: [] as Obstacle[],
    coins: [] as Coin[],
    particles: [] as Particle[],
    score: 0,
    hiScore: 0,
    speed: INITIAL_SPEED,
    frame: 0,
    gameOver: false,
    // 0 = title, 1 = playing, 2 = gameover
    phase: 0 as 0 | 1 | 2,
    nextObs: 90,
    nextCoin: 55,
    bgX: 0,
    stars: makeStars(),
  });
  const rafRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset game when modal opens
    const g = gameRef.current;
    const savedHi = g.hiScore;
    const savedStars = g.stars;
    Object.assign(g, {
      playerY: GROUND_Y - 44,
      playerVY: 0,
      onGround: true,
      obstacles: [],
      coins: [],
      particles: [],
      score: 0,
      hiScore: savedHi,
      speed: INITIAL_SPEED,
      frame: 0,
      gameOver: false,
      phase: 0,
      nextObs: 90,
      nextCoin: 55,
      bgX: 0,
      stars: savedStars,
    });

    function handleInput() {
      const g = gameRef.current;
      if (g.phase === 0) {
        // Title → start playing immediately AND jump
        g.phase = 1;
        g.playerVY = JUMP_FORCE;
        g.onGround = false;
      } else if (g.phase === 1 && g.onGround) {
        // Playing — jump
        g.playerVY = JUMP_FORCE;
        g.onGround = false;
        for (let i = 0; i < 6; i++) {
          g.particles.push({
            x: 20 + Math.random() * 16, y: GROUND_Y,
            vx: (Math.random() - 0.5) * 3, vy: -(Math.random() * 2.5 + 1),
            life: 1, color: ACCENT,
          });
        }
      } else if (g.phase === 2) {
        // Game over → restart
        const hi = g.hiScore;
        const stars = g.stars;
        Object.assign(g, {
          playerY: GROUND_Y - 44, playerVY: JUMP_FORCE,
          onGround: false, obstacles: [], coins: [], particles: [],
          score: 0, hiScore: hi, speed: INITIAL_SPEED,
          frame: 0, gameOver: false, phase: 1,
          nextObs: 90, nextCoin: 55, bgX: 0, stars,
        });
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); handleInput(); }
    };
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("click", handleInput);

    function tick() {
      const g = gameRef.current;
      ctx!.clearRect(0, 0, W, H);

      // ── Background always drawn ──
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      if (g.phase === 0) {
        // ── Title screen ──
        drawStars(ctx!, g.stars, g.frame++);
        drawCityBg(ctx!, 0);
        drawGround(ctx!, 0);
        drawPixelChar(ctx!, 16, GROUND_Y - 44);

        ctx!.fillStyle = "rgba(15,23,42,0.72)";
        ctx!.fillRect(0, 0, W, H);

        ctx!.shadowColor = ACCENT;
        ctx!.shadowBlur = 14;
        ctx!.font = "bold 30px 'Courier New', monospace";
        ctx!.textAlign = "center";
        ctx!.fillStyle = ACCENT;
        ctx!.fillText("DAYE RUNNER", W / 2, H / 2 - 32);
        ctx!.shadowBlur = 0;

        ctx!.font = "14px 'Courier New', monospace";
        ctx!.fillStyle = TEXT_COLOR;
        ctx!.fillText("Press SPACE / ↑ / Click to Start", W / 2, H / 2 + 8);

        ctx!.font = "11px 'Courier New', monospace";
        ctx!.fillStyle = SECONDARY;
        ctx!.fillText("Dodge Bugs • Collect Tech Stack coins • Survive!", W / 2, H / 2 + 32);

        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // ── Playing / GameOver update ──
      if (g.phase === 1) {
        g.frame++;
        g.score += g.speed * 0.04;
        g.speed = Math.min(INITIAL_SPEED + Math.floor(g.score / 150) * 0.5, 16);
        g.bgX += g.speed * 0.7;

        // Player physics
        g.playerVY += GRAVITY;
        g.playerY += g.playerVY;
        if (g.playerY >= GROUND_Y - 44) {
          g.playerY = GROUND_Y - 44;
          g.playerVY = 0;
          g.onGround = true;
        }

        // Spawn obstacles
        g.nextObs--;
        if (g.nextObs <= 0) {
          const h = 32 + Math.random() * 28;
          g.obstacles.push({ x: W + 10, w: 46, h, label: OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)] });
          g.nextObs = Math.max(35, Math.floor(90 + Math.random() * 50 - g.speed * 2.5));
        }

        // Spawn coins
        g.nextCoin--;
        if (g.nextCoin <= 0) {
          g.coins.push({ x: W + 10, y: GROUND_Y - 80 - Math.random() * 55, label: COINS[Math.floor(Math.random() * COINS.length)], collected: false });
          g.nextCoin = Math.floor(55 + Math.random() * 45);
        }

        g.obstacles = g.obstacles.map(o => ({ ...o, x: o.x - g.speed })).filter(o => o.x + o.w > -10);
        g.coins = g.coins.map(c => ({ ...c, x: c.x - g.speed })).filter(c => c.x > -20);

        // Collision: obstacles
        const px = 14, py = g.playerY, pw = 20, ph = 44;
        for (const obs of g.obstacles) {
          if (px + pw > obs.x + 6 && px < obs.x + obs.w - 6 && py + ph > GROUND_Y - obs.h && py < GROUND_Y) {
            g.phase = 2;
            if (g.score > g.hiScore) g.hiScore = g.score;
            for (let i = 0; i < 24; i++) {
              g.particles.push({ x: px + pw / 2, y: py + ph / 2, vx: (Math.random() - 0.5) * 9, vy: (Math.random() - 0.5) * 9, life: 1, color: Math.random() > 0.5 ? "#ef4444" : ACCENT });
            }
            break;
          }
        }

        // Collision: coins
        g.coins.forEach(c => {
          if (!c.collected && Math.abs(c.x - (px + pw / 2)) < 18 && Math.abs(c.y - (py + ph / 2)) < 26) {
            c.collected = true;
            g.score += 50;
            for (let i = 0; i < 10; i++) {
              g.particles.push({ x: c.x, y: c.y, vx: (Math.random() - 0.5) * 5, vy: -(Math.random() * 4 + 1), life: 1, color: ACCENT });
            }
          }
        });

        g.particles = g.particles.map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.18, life: p.life - 0.035 })).filter(p => p.life > 0);
      } else {
        // phase 2: still animate particles
        g.particles = g.particles.map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.18, life: p.life - 0.025 })).filter(p => p.life > 0);
      }

      // ── Draw ──
      drawStars(ctx!, g.stars, g.frame);
      drawCityBg(ctx!, g.bgX);
      drawGround(ctx!, g.bgX);
      g.coins.forEach(c => drawCoin(ctx!, c, g.frame));

      // Player bob when running
      const bob = g.onGround ? Math.sin(g.frame * 0.3) * 2 : 0;
      drawPixelChar(ctx!, 14, g.playerY + bob);

      g.obstacles.forEach(o => drawObstacle(ctx!, o));
      drawParticles(ctx!, g.particles);
      drawHUD(ctx!, g.score, g.hiScore, g.speed);

      // Game Over overlay
      if (g.phase === 2) {
        ctx!.fillStyle = "rgba(15,23,42,0.78)";
        ctx!.fillRect(0, 0, W, H);
        ctx!.shadowColor = "#ef4444";
        ctx!.shadowBlur = 14;
        ctx!.font = "bold 28px 'Courier New', monospace";
        ctx!.textAlign = "center";
        ctx!.fillStyle = "#ef4444";
        ctx!.fillText("GAME OVER", W / 2, H / 2 - 28);
        ctx!.shadowBlur = 0;
        ctx!.font = "13px 'Courier New', monospace";
        ctx!.fillStyle = TEXT_COLOR;
        ctx!.fillText(`Score: ${Math.floor(g.score)}   Best: ${Math.floor(g.hiScore)}`, W / 2, H / 2 + 4);
        ctx!.font = "12px 'Courier New', monospace";
        ctx!.fillStyle = ACCENT;
        ctx!.fillText("SPACE / Click to Retry", W / 2, H / 2 + 30);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("click", handleInput);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="block w-full rounded-b-lg"
      style={{ cursor: "pointer" }}
    />
  );
}
