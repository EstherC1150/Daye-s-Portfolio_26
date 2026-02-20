"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ─────────────────────────────────────────────
   Per-card component (hooks OK here, one per card)
   ───────────────────────────────────────────── */
function StackedCard({
  item,
  index,
  totalItems,
  scrollYProgress,
  isWork,
}: {
  item: any;
  index: number;
  totalItems: number;
  scrollYProgress: MotionValue<number>;
  isWork: boolean;
}) {
  const title    = isWork ? item.company  : item.school;
  const subtitle = isWork ? item.position : item.major;
  const desc     = item.description;
  const period   = item.period;

  // Stacking: cards 0→N enter during 0–0.85 of scroll progress.
  // Remaining 0.15 = fully stacked, section holds briefly before exiting.
  const STACK_RANGE = 0.85;
  const entryStart  = index === 0 ? -0.05 : (index / totalItems) * STACK_RANGE;
  const entryEnd    = index === 0 ?  0.05 : entryStart + (STACK_RANGE / totalItems) * 0.55;

  const opacity = useTransform(scrollYProgress, [entryStart, entryEnd], [0, 1]);
  // y:200→0: card physically rises from below the visible area (overflow:hidden clips it
  // until it reaches y < container height, then it slides into view — "올라오는 느낌")
  const y = useTransform(scrollYProgress, [entryStart, entryEnd], [200, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: `${index * 40}px`,
        left: 0,
        right: 0,
        opacity,
        y,
        zIndex: index + 1,
      }}
    >
      {/* Tab bar */}
      <div className="w-full h-10 bg-[#0f172a] border-t border-x border-white/10 rounded-t-xl flex items-end relative overflow-hidden">
        <div className="flex items-center h-full px-6 bg-[#1e293b] border-r border-white/10 text-xs text-white font-mono relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-city-accent)]" />
          <span className={`${isWork ? "text-[#61dafb]" : "text-[#f1e05a]"} mr-2`}>
            {isWork ? "TSX" : "TS"}
          </span>
          {title.replace(/\s+/g, "")}{isWork ? ".tsx" : ".ts"}
          <span className="ml-4 text-white/20 hover:text-white cursor-pointer">×</span>
        </div>
        <div className="flex-1 h-full bg-[#0f172a]" />
      </div>

      {/* Card body.
          min-height: 100vh ensures EVERY card body covers the full visible height.
          Combined with overflow:hidden on the cards container, this means:
            • No bleed-through from lower-z cards peeking below shorter top cards.
            • No empty dark gap at the bottom of the visible area.
      */}
      <div
        className="relative bg-[#0f172a] border-x border-b border-white/10 p-8 md:p-10
                   shadow-[0_-10px_40px_rgba(0,0,0,0.9)] group
                   hover:border-[var(--color-city-accent)] transition-colors duration-300"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute inset-0 bg-[#0f172a]" />
        <div className="absolute left-4 top-10 w-6 flex flex-col gap-1 text-[10px] text-white/10 font-mono text-right select-none pointer-events-none z-10">
          {Array.from({ length: 10 }).map((_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <div className="relative z-10 pl-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="md:w-1/3 shrink-0">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono mb-3 border ${
                isWork
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
              }`}>
                {period}
              </span>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h4>
              <span className="text-sm md:text-base text-[var(--color-city-secondary)]">{subtitle}</span>
            </div>
            <div className="md:w-2/3">
              <div className="text-[var(--color-city-text)] opacity-80 text-sm leading-loose whitespace-pre-line font-mono">
                <span className="text-purple-400">const </span>
                <span className="text-blue-400">details </span>
                <span className="text-white">= </span>
                <span className="text-white">{"{"}</span>
                <br />
                <div className="pl-4 border-l border-white/5 ml-1">{desc}</div>
                <span className="text-white">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
   ───────────────────────────────────────────── */
const WorkSection = () => {
  const experiences = [
    {
      period: "2024.06 - 현재",
      company: "알씨케이",
      position: "DX사업부 | 사원",
      description: `회사 홈페이지 구현
• Next.js를 이용하여 개발
• Vercel을 이용하여 배포 속도 향상
• 퍼포먼스 향상(기존 PHP 기반 -> Next.js SSG/SSR)
• Serverless 함수로 운영 효율성 강화
• 다국어 지원(한국어/영어) / IP 기반 자동 언어 감지


실시간 3D 뷰어 디스플레이 개발
• 실시간 3D 스토커 뷰어 응용프로그램 화면 UI 설계

스마트 팩토리 라이브러리 관리기 개발
• FBX 웹뷰어 기능 제공
• 파일 관리 서버 구축 및 유저 관리 시스템
• 카테고리별 다운로드 수 차트

WebSocket 미들웨어 서버 개발
• Node.js 기반 실시간 WebSocket 중계 서버
• 대용량 파일 청크 스트리밍 처리`,
    },
    {
      period: "2022.11 - 2023.08",
      company: "노블진",
      position: "웹디자인 | 사원",
      description: `쇼핑몰 운영 관리 및 상세페이지 제작
• 제품 촬영, 상세페이지 디자인, 마케팅 콘텐츠 제작
• Adobe Photoshop, Illustrator, InDesign 활용`,
    },
    {
      period: "2022.02 - 2022.10",
      company: "메디바이스",
      position: "웹디자인 및 전략기획 | 사원",
      description: `웹디자인 및 편집디자인 기획
• 디자인 기획 및 시안 제작, 블로그 콘텐츠 관리
• 웹 퍼블리싱(HTML/CSS) 수행`,
    },
  ];

  const education = [
    {
      period: "2023.08 - 2024.02",
      school: "㈜예담직업전문학교",
      major: "Vue, Spring 개발자 양성 과정",
      description: "Vue.js 프론트엔드 • Spring Framework 백엔드 개발 실무 프로젝트",
    },
    {
      period: "2021.07 - 2021.12",
      school: "SBS아카데미컴퓨터아트학원",
      major: "스마트기기 UXUI 웹디자이너양성",
      description: "Adobe Tools 웹디자인 실무 • HTML, CSS, jQuery 퍼블리싱",
    },
  ];

  const allItems   = [...experiences, ...education];
  const totalItems = allItems.length; // 5

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    /*
     * SCROLL-PIN ARCHITECTURE
     * ───────────────────────
     * Outer div:  tall (provides scroll room) — (5 × 70 + 80) = 430vh
     * Inner div:  sticky top-0 h-screen — locks the ENTIRE layout to the viewport
     *   → Explorer + Cards both live INSIDE → always scroll out together (no drift)
     *
     * Cards container:  overflow:hidden
     *   → Bleed-through fix: lower-z cards that extend below shorter top cards are clipped
     *   → No empty space: card bodies with min-h-100vh fill to the container bottom
     *   → Cards animate in with y:200→0 (physically rises from below visible area)
     */
    <div
      ref={containerRef}
      id="experience"
      className="relative bg-[var(--color-city-bg)]"
      style={{ height: `${totalItems * 70 + 80}vh` }}
    >
      {/* Sticky inner — everything scrolls out as one unit */}
      <div className="sticky top-0 h-screen flex flex-col">

        {/* Section header */}
        <div className="px-8 pt-28 pb-4 max-w-7xl mx-auto w-full shrink-0">
          <div className="relative">
            <h2 className="text-6xl md:text-9xl font-black text-white/[0.03] corncorn absolute -top-14 -left-10 select-none z-0">
              Work
            </h2>
            <h2 className="relative z-10 text-4xl font-bold corncorn text-[var(--color-city-accent)] pl-4">
              Experience
            </h2>
          </div>
        </div>

        {/* Explorer + Cards row */}
        <div className="flex-1 flex gap-8 lg:gap-20 px-8 max-w-7xl mx-auto w-full min-h-0">

          {/* Explorer — just a regular block inside the sticky viewport */}
          <div className="lg:w-1/3 hidden lg:flex shrink-0 items-start pt-2">
            <div className="w-full p-6 rounded-xl bg-[#0f172a] border border-white/10 font-mono text-sm shadow-2xl">
              <div className="flex items-center justify-between text-[var(--color-city-secondary)] mb-4 text-xs tracking-widest uppercase border-b border-white/5 pb-2">
                <span>Explorer</span>
                <span>...</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white/50">
                  <span className="text-[10px]">▼</span>
                  <span className="font-bold text-white/90">PORTFOLIO-V2026</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/50 pl-4">
                  <span className="text-[10px]">▼</span><span>src</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/50 pl-8">
                  <span className="text-[10px]">▼</span>
                  <span className="text-[#4d9375]">experience</span>
                </div>
                <div className="flex flex-col pl-12 border-l border-white/5 ml-[37px]">
                  {experiences.map((exp, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 text-[var(--color-city-secondary)] hover:text-white transition-colors cursor-pointer">
                      <span className="text-[#61dafb] text-xs">TSX</span>
                      <span className="truncate">{exp.company.replace(/\s+/g, "")}.tsx</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-white/50 pl-8 mt-2">
                  <span className="text-[10px]">▼</span>
                  <span className="text-[#c98bd9]">education</span>
                </div>
                <div className="flex flex-col pl-12 border-l border-white/5 ml-[37px]">
                  {education.map((edu, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 text-[var(--color-city-secondary)] hover:text-white transition-colors cursor-pointer">
                      <span className="text-[#f1e05a] text-xs">TS</span>
                      <span className="truncate">{edu.school.substring(0, 8)}.ts</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-white/50 pl-8 mt-2 opacity-50">
                  <span className="text-[10px]">▶</span>
                  <span className="text-[#e2c08d]">assets</span>
                </div>
              </div>
            </div>
          </div>

          {/*
           * Cards container
           * overflow:hidden = clips card bodies at container boundary
           *   → no bleed-through from taller lower-z cards
           *   → no empty gap at bottom (min-h-100vh fills beyond, gets clipped cleanly)
           */}
          <div className="lg:w-2/3 relative overflow-hidden pt-2">
            {allItems.map((item, i) => (
              <StackedCard
                key={i}
                item={item}
                index={i}
                totalItems={totalItems}
                scrollYProgress={scrollYProgress}
                isWork={i < experiences.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
