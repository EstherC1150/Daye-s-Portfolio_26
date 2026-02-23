"use client";
import { useRef, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ── Rocket scroll indicator ──────────────────────────────────────────────────
function RocketIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      style={{ zIndex: 10, animation: "rocketAppear 0.8s ease-out forwards" }}
    >
      {/* Star trail — emanates UPWARD from exhaust (top of flipped rocket) */}
      <div className="relative flex justify-center" style={{ height: 36, marginBottom: 4 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute text-[10px] select-none"
            style={{
              left: `calc(50% + ${(i - 2) * 7}px)`,
              bottom: 0,
              animation: `starTrail 1.1s ease-out ${i * 0.18}s infinite`,
              opacity: 0,
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Rocket — rotated 180° so nose points DOWN */}
      <div style={{ animation: "rocketFloat 1.6s ease-in-out infinite alternate", transform: "rotate(180deg)" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 60"
          width="34"
          height="52"
          style={{ filter: "drop-shadow(0 0 8px rgba(0,200,120,0.75))" }}
        >
          {/* Body */}
          <path d="M20 55 C20 55 10 40 10 25 C10 10 20 3 20 3 C20 3 30 10 30 25 C30 40 20 55 20 55 Z"
            fill="url(#rBody)" />
          {/* Window */}
          <circle cx="20" cy="22" r="5" fill="rgba(0,200,120,0.2)" stroke="rgba(0,200,120,0.85)" strokeWidth="1.2" />
          {/* Left fin */}
          <path d="M10 38 L5 50 L14 42 Z" fill="#00c878" opacity="0.9" />
          {/* Right fin */}
          <path d="M30 38 L35 50 L26 42 Z" fill="#00c878" opacity="0.9" />
          {/* Exhaust glow */}
          <ellipse cx="20" cy="56" rx="5" ry="3"
            fill="none" stroke="rgba(0,200,120,0.6)" strokeWidth="1" />
          <defs>
            <linearGradient id="rBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#e0e8ff" />
              <stop offset="100%" stopColor="#7090c0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        @keyframes rocketFloat {
          from { transform: rotate(180deg) translateY(0px);   }
          to   { transform: rotate(180deg) translateY(-10px); }
        }
        @keyframes starTrail {
          0%   { transform: translateY(0px)   scale(1);   opacity: 0.9; }
          60%  { opacity: 0.5; }
          100% { transform: translateY(-32px) scale(0.3); opacity: 0; }
        }
        @keyframes rocketAppear {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }
      `}</style>
    </div>
  );
}


const SHARD_PATHS = [
  "M0,0 L42,-8 L28,32 Z",        "M0,0 L-38,-14 L-18,38 Z",
  "M0,0 L32,26 L-8,44 L-22,12 Z","M0,0 L-30,16 L-34,-20 L-6,-40 Z",
  "M0,0 L16,-40 L40,-6 L24,18 Z","M0,0 L-24,-34 L24,-40 L34,-4 Z",
  "M0,0 L34,30 L10,46 L-16,34 Z","M0,0 L-40,24 L-30,-14 Z",
  "M0,0 L10,40 L-30,34 L-34,8 Z","M0,0 L30,-24 L40,16 L18,34 Z",
  "M0,0 L-14,-44 L16,-44 L28,-16 Z","M0,0 L44,6 L34,26 L8,40 Z",
];
const CANDY_COLORS = [
  "#00c878","#ffffff","#34d399","#6ee7b7",
  "#f1f5f9","#a7f3d0","#00c878","#94a3b8",
];

type Phase = "orbit" | "shatter" | "final";

// ── Starfield Canvas ──────────────────────────────────────────────────────────
function Starfield() {
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars once
    const stars = Array.from({ length: 280 }, () => ({
      x:       Math.random(),
      y:       Math.random(),
      size:    Math.random() * 1.4 + 0.2,
      base:    Math.random() * 0.55 + 0.08,
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 0.008 + 0.002,
    }));

    let t = 0, raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        const op = s.base * (0.65 + 0.35 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${op.toFixed(3)})`;
        ctx.fill();
      });

      // Subtle nebula glows — use site green accent
      [
        { cx: 0.25, cy: 0.35, r: 260, c: "rgba(0,200,120,0.05)" },
        { cx: 0.75, cy: 0.65, r: 220, c: "rgba(15,23,42,0.03)"  },
        { cx: 0.5,  cy: 0.5,  r: 180, c: "rgba(0,200,120,0.04)" },
      ].forEach(({ cx, cy, r, c }) => {
        const g = ctx.createRadialGradient(
          cx * canvas.width, cy * canvas.height, 0,
          cx * canvas.width, cy * canvas.height, r
        );
        g.addColorStop(0, c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MainBanner() {
  const container = useRef<HTMLDivElement>(null);
  const worldRef  = useRef<HTMLDivElement>(null);
  const floorRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);

  const [phase, setPhase] = useState<Phase>("orbit");

  // Burst precompute
  const shards = useMemo(() =>
    SHARD_PATHS.map((path, i) => {
      const a = (i / SHARD_PATHS.length) * Math.PI * 2 + (i % 2 ? 0.3 : -0.3);
      const d = 230 + (i % 4) * 70;
      return {
        id: i, path,
        tx: Math.cos(a) * d, ty: Math.sin(a) * d,
        tz: (i % 2 ? 1 : -1) * (60 + i * 18),
        rot: (i % 2 ? 1 : -1) * (200 + i * 30),
        rotX: (i % 3 - 1) * 130,
      };
    }), []);

  const candies = useMemo(() => {
    // Use viewport size for full-screen spread (client-side only)
    const hw = typeof window !== "undefined" ? window.innerWidth  / 2 : 600;
    const hh = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
    return Array.from({ length: 90 }, (_, i) => ({
      id:    i,
      size:  5 + (i % 5) * 3,
      color: CANDY_COLORS[i % CANDY_COLORS.length],
      // Spread randomly across the full viewport
      tx:    (Math.random() - 0.5) * hw * 1.8,
      ty:    (Math.random() - 0.5) * hh * 1.8,
      tz:    (Math.random() - 0.5) * 300,
    }));
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!worldRef.current) return;
      const mx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
      const my = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      gsap.to(worldRef.current, {
        rotateY: mx * 10, rotateX: -my * 10 + 18,
        duration: 1.5, ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Burst FX animation
  useGSAP(() => {
    if (phase !== "shatter") return;
    gsap.fromTo(".glass-shard",
      { x: 0, y: 0, z: 0, rotation: 0, rotateX: 0, opacity: 1, scale: 1 },
      {
        x: (i) => shards[i % shards.length].tx,
        y: (i) => shards[i % shards.length].ty,
        z: (i) => shards[i % shards.length].tz,
        rotation: (i) => shards[i % shards.length].rot,
        rotateX:  (i) => shards[i % shards.length].rotX,
        opacity: 0, scale: 0.3, duration: 1.4, stagger: 0.02, ease: "power2.out",
      }
    );
    gsap.fromTo(".candy-piece",
      { x: 0, y: 0, z: 0, opacity: 1, scale: 1 },
      {
        x: (i) => candies[i % candies.length].tx,
        y: (i) => candies[i % candies.length].ty,
        z: (i) => candies[i % candies.length].tz,
        opacity: 0, scale: 0,
        duration: 1.2, stagger: { each: 0.008, from: "random" }, ease: "power3.out",
      }
    );
  }, { scope: container, dependencies: [phase] });

  // Main animation — letters ALREADY orbiting from frame 1, burst after 4s
  useGSAP(() => {
    const charGroups = gsap.utils.toArray<HTMLElement>(".char-group");
    if (!charGroups.length || !container.current) return;

    const cRect = container.current.getBoundingClientRect();
    const cCx   = cRect.width  / 2;
    const cCy   = cRect.height / 2;

    const nat = charGroups.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: (r.left - cRect.left + r.width  / 2) - cCx,
        y: (r.top  - cRect.top  + r.height / 2) - cCy,
      };
    });

    // ── Galaxy: 2 spiral arms ────────────────────────────────────────────
    const total = charGroups.length;
    // Very slow, majestic rotation — all same speed so arm shape holds
    const ARM_SPEED = 0.22;

    const orbitParams = charGroups.map((_, i) => {
      const arm    = i % 2;
      const pos    = Math.floor(i / 2);
      const armLen = Math.ceil(total / 2);
      const t      = pos / armLen;                           // 0 → 1 along arm
      // More irregular: randomise radius around a spiral base
      const baseR  = 65 + t * 200;
      const radius = baseR + (Math.random() - 0.5) * 50;    // ±25px scatter
      // Spiral angle with extra randomness for organic feel
      const startAngle = t * Math.PI * 3 + arm * Math.PI
                       + (Math.random() - 0.5) * 0.55;      // wider scatter
      // Larger orbit scale (was 0.14−0.04t, now bigger)
      const scale  = 0.22 - t * 0.05 + (Math.random() - 0.5) * 0.04;
      return { radius, startAngle, scale };
    });

    // ── Place letters immediately at orbit positions (invisible) ─────────
    charGroups.forEach((el, i) => {
      const p = orbitParams[i];
      gsap.set(el, {
        x:       Math.cos(p.startAngle) * p.radius - nat[i].x,
        y:       Math.sin(p.startAngle) * p.radius * 0.05 - nat[i].y,
        z:       Math.sin(p.startAngle) * p.radius,
        scale:   p.scale,
        rotateX: 0, rotateY: 0, rotation: 0,
        opacity: 0,
      });
    });

    // ── Fade letters in gently while ALREADY spinning ────────────────────
    gsap.to(".char-group", {
      opacity:  1,
      duration: 2.0,
      stagger:  { each: 0.12, from: "random" },
      ease:     "power2.inOut",
    });

    // ── Floor ─────────────────────────────────────────────────────────────
    gsap.from(floorRef.current, { opacity: 0, scaleX: 1.4, duration: 3, ease: "power3.out" });

    // ── Start galaxy rotation immediately ─────────────────────────────────
    const BURST_MS   = 4000;
    const ACCEL_FROM = 1200; // last 1200ms ramp up
    const startTime  = performance.now();
    let t = 0;

    const tick = () => {
      const elapsed   = performance.now() - startTime;
      const remaining = BURST_MS - elapsed;

      // dt ramps exponentially: 0.012 → ~0.075 in the last 1200ms
      let dt = 0.012;
      if (remaining < ACCEL_FROM && remaining > 0) {
        const accel = 1 - remaining / ACCEL_FROM;   // 0 → 1
        dt = 0.012 + accel * accel * 0.063;          // quadratic ease-in
      }

      t += dt;
      charGroups.forEach((el, i) => {
        const p     = orbitParams[i];
        const angle = p.startAngle + t * ARM_SPEED;
        gsap.set(el, {
          x: Math.cos(angle) * p.radius - nat[i].x,
          y: Math.sin(angle) * p.radius * 0.05 - nat[i].y,
          z: Math.sin(angle) * p.radius,
        });
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // ── BURST after 4 s ───────────────────────────────────────────────────
    const burstTimer = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      setPhase("shatter");

      // All chars burst simultaneously → smooth swoop to final positions
      gsap.to(charGroups, {
        x: 0, y: 0, z: 0,
        scale: 1, rotateX: 0, rotateY: 0, rotation: 0, opacity: 1,
        duration: 1.4,
        stagger:  0,        // all at once
        ease:     "power2.out",
      });

      setTimeout(() => {
        setPhase("final");
        gsap.to(".char-group", {
          y: "-=15", duration: 2.5, repeat: -1,
          yoyo: true, ease: "sine.inOut", stagger: 0.07,
        });
      }, 1600);
    }, 4000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(burstTimer);
    };
  }, { scope: container, dependencies: [] });

  // Volumetric text
  const renderText = (text: string, fontSize: string, color: string = "#fff") =>
    text.split("").map((char, i) => (
      <div key={i} className="char-group relative inline-block mx-1" style={{ transformStyle: "preserve-3d" }}>
        {[...Array(8)].map((_, li) => (
          <span key={li}
            className={`absolute left-0 top-0 inline-block font-black ${fontSize}`}
            style={{
              color:            li === 7 ? color : "rgba(255,255,255,0.04)",
              transform:        `translateZ(${li * 2}px)`,
              WebkitTextStroke: li === 7 ? "none" : "1px rgba(255,255,255,0.07)",
              zIndex:           li,
              textShadow:       li === 7 ? `0 0 20px ${color}66` : "none",
              transformStyle:   "preserve-3d",
              willChange:       "transform, opacity",
            }}
          >{char}</span>
        ))}
        <span className={`inline-block font-black ${fontSize} opacity-0`}>{char}</span>
      </div>
    ));

  const showShatter = phase === "shatter";

  return (
    <section
      ref={container}
      className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-[#03070f] text-white"
      style={{ perspective: "1000px" }}
    >
      {/* ── Starfield background ── */}
      <Starfield />

      <div
        ref={worldRef}
        className="relative flex flex-col items-center justify-center w-full h-full"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(18deg)", zIndex: 1 }}
      >
        {/* Floor grid */}
        <div
          ref={floorRef}
          className="absolute w-[200vw] h-[200vw] top-1/2 left-1/2 -translate-x-1/2 opacity-[0.12]"
          style={{
            transform: "rotateX(90deg) translateY(-50%)",
            backgroundImage: `
              linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 60% 60% at center, black 0%, transparent 100%)",
          }}
        />

        {/* Burst FX — candy particles only (no glass shards) */}
        {showShatter && (
          <div
            className="absolute pointer-events-none overflow-visible"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              transformStyle: "preserve-3d",
              zIndex: 40, width: 0, height: 0,
            }}
          >
            {candies.map((c) => (
              <div key={c.id} className="candy-piece absolute rounded-full"
                style={{
                  width: c.size, height: c.size, top: 0, left: 0,
                  transform: "translate(-50%,-50%)",
                  background: c.color,
                  boxShadow: `0 0 ${c.size * 3}px ${c.color}99`,
                }}
              />
            ))}
          </div>
        )}

        {/* Text */}
        <div
          className="relative z-10 flex flex-col items-center gap-6 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex" style={{ transformStyle: "preserve-3d" }}>
            {renderText("DA YE", "text-5xl md:text-[7rem]", "#ffffff")}
          </div>
          <div className="flex" style={{ transformStyle: "preserve-3d" }}>
            {renderText("FULLSTACK", "text-xl md:text-[2.8rem]", "#f59e0b")}
          </div>
          <div className="flex" style={{ transformStyle: "preserve-3d" }}>
            {renderText("DEVELOPER", "text-3xl md:text-[4.5rem]", "#00c878")}
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-emerald-900/20 blur-[120px]" />
        </div>
      </div>

      {/* Rocket scroll indicator — appears only after text is placed */}
      <RocketIndicator visible={phase === "final"} />
    </section>
  );
}
