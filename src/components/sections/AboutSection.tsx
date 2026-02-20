import { motion } from "framer-motion";
import useProfileStore from "../../store/profileStore";
import { images } from "../../constants/images";

const AboutSection = () => {
  const { name, introduction } = useProfileStore();

  const techIcons = [
    // Development
    { src: images.icons.development.javascript, alt: "JavaScript" },
    { src: images.icons.development.typescript, alt: "TypeScript" },
    { src: images.icons.development.react, alt: "React" },
    { src: images.icons.development.vite, alt: "Vite" },
    { src: images.icons.development.nextjs, alt: "Next.js" },
    { src: images.icons.development.vue, alt: "Vue" },
    { src: images.icons.development.nodejs, alt: "Node.js" },
    { src: images.icons.development.oracle, alt: "Oracle" },
    { src: images.icons.development.mysql, alt: "MySQL" },
    { src: images.icons.development.mssql, alt: "MSSQL" },
    { src: images.icons.development.linux, alt: "Linux" },
    { src: images.icons.development.docker, alt: "Docker" },
    { src: images.icons.development.aws, alt: "AWS" },
    { src: images.icons.development.github, alt: "GitHub" },
    { src: images.icons.development.vercel, alt: "Vercel" },
    { src: images.icons.development.discord, alt: "Discord" },
    { src: images.icons.development.postman, alt: "Postman" },
    // Design
    { src: images.icons.design.figma, alt: "Figma" },
    { src: images.icons.design.photoshop, alt: "Photoshop" },
    { src: images.icons.design.illustrator, alt: "Illustrator" },
    { src: images.icons.design.inDesign, alt: "InDesign" },
    { src: images.icons.design.xd, alt: "XD" },
  ];


  return (
    <section
      id="about"
      className="relative pt-32 min-h-screen h-fit bg-[var(--color-city-bg)] overflow-x-hidden"
    >
      {/* Background Gradients - More subtle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-city-accent)] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative px-8 py-16 mx-auto max-w-7xl h-fit">

        {/* ── 헤더: 배경 텍스트와 타이틀을 같은 relative 블록 안에 배치 ── */}
        <div className="relative mb-16 w-fit">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-black text-white/5 corncorn select-none absolute -top-8 -left-6 whitespace-nowrap z-0"
          >
            About
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-4xl font-bold corncorn text-[var(--color-city-accent)]"
          >
            About Me
          </motion.h2>
        </div>

        {/* 프로필 이미지와 소개 섹션 */}
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center justify-between mb-20 relative w-full">

          {/* 이미지 + 별자리 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0 flex flex-col items-center"
          >
            {/* 별자리 + 프로필 컨테이너 */}
            <div className="relative w-[420px] h-[400px]">

              {/* SVG 황소자리 별자리 레이어 (z-0) */}
              <svg
                className="absolute inset-0 z-0 overflow-visible"
                width="420" height="400"
                viewBox="0 0 340 320"
              >
                {/* 연결선 */}
                <g stroke="rgba(0,200,120,0.13)" strokeWidth="0.8" strokeLinecap="round">
                  {/* Hyades V → Aldebaran */}
                  <line x1="163" y1="150" x2="148" y2="133" />
                  <line x1="148" y1="133" x2="138" y2="144" />
                  <line x1="138" y1="144" x2="133" y2="158" />
                  <line x1="133" y1="158" x2="141" y2="173" />
                  <line x1="163" y1="150" x2="133" y2="158" />
                  {/* 뿔: Zeta Tau → Beta Tau */}
                  <line x1="163" y1="150" x2="248" y2="68" />
                  <line x1="248" y1="68" x2="308" y2="18" />
                  {/* 몸통: Lambda, Xi, Nu */}
                  <line x1="133" y1="158" x2="65" y2="248" />
                  <line x1="65" y1="248" x2="38" y2="218" />
                  <line x1="38" y1="218" x2="30" y2="170" />
                </g>

                {/* 바깥 별들 — 반짝임 + 태그 */}
                {[
                  { x: 248, y: 68,  r: 2.2, delay: '0s',    dur: '2.8s'},
                  { x: 308, y: 18,  r: 2.8, delay: '0.8s',  dur: '2.2s', label: '꾸준함'  },
                  { x: 65,  y: 248, r: 1.8, delay: '1.5s',  dur: '3.2s', label: '성장중' },
                  { x: 38,  y: 218, r: 1.8, delay: '2.1s',  dur: '2.6s', label: '도전정신' },
                  { x: 30,  y: 170, r: 1.8, delay: '0.4s',  dur: '3.5s', label: '협동심' },
                  { x: 62,  y: 48,  r: 1.5, delay: '1.2s',  dur: '2.4s' },
                  // { x: 78,  y: 37,  r: 2.0, delay: '1.8s',  dur: '3.0s'},
                  { x: 93,  y: 15,  r: 1.5, delay: '0.6s',  dur: '2.7s', label: '적응력'  },
                  { x: 87,  y: 48,  r: 1.2, delay: '2.4s',  dur: '3.3s' },
                  { x: 105, y: 45,  r: 1.2, delay: '1.0s',  dur: '2.5s' },
                  { x: 72,  y: 60,  r: 1.2, delay: '2.8s',  dur: '3.8s' },
                ].map((s, i) => (
                  <g key={i}>
                    <circle
                      cx={s.x} cy={s.y} r={s.r * 3.5}
                      fill="rgba(0,200,120,0.07)"
                      style={{ animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}` }}
                    />
                    <circle
                      cx={s.x} cy={s.y} r={s.r}
                      fill="rgba(236,254,245,0.92)"
                      style={{ animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}` }}
                    />
                    {s.label && (
                      <text
                        x={s.x}
                        y={s.y + s.r * 3.5 + 13}
                        textAnchor="middle"
                        fontSize="11"
                        fill="rgba(255,255,255,0.6)"
                        letterSpacing="0.1em"
                        style={{ animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}` }}
                      >
                        {s.label}
                      </text>
                    )}
                  </g>
                ))}
              </svg>

              {/* 프로필 원 — 중앙 z-10 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative group">
                  <div className="w-64 h-64 rounded-full overflow-hidden relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <img
                      src={images.profile.main}
                      alt="Profile"
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute inset-4 bg-[var(--color-city-accent)] rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0" />
                </div>
              </div>
            </div>

          </motion.div>

          {/* 소개 섹션 - Text only, no box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-grow space-y-6 text-left"
          >
               <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                안녕하세요,<br/>
                <span className="text-[var(--color-city-accent)]">{name || "최다예"}</span> 입니다.
              </h3>
              
              <div className="w-12 h-1 bg-[var(--color-city-accent)]/50" />

              <p className="text-lg md:text-xl text-[var(--color-city-text)] opacity-80 leading-relaxed font-light whitespace-pre-line">
                {introduction ||
                  `꾸준함과 도전정신을 바탕으로 성장하는 웹 개발자입니다.
웹디자인 경험을 살려 기능 뿐 아니라 UX/UI 디자인까지 고려한 개발을 지향합니다.

React, Next.js, Tailwind CSS 기술을 주로 사용하며, 
Node.js로 REST API 서버 구축 및 다양한 DBMS 활용이 가능합니다.

맡은 일에 애정을 갖고 책임감 있게 임하며, 
주어진 역할 속에서 가치를 만들어내는 개발자가 되고자 합니다.`}
              </p>
          </motion.div>
        </div>

        {/* 기술 스택 섹션 — 두 줄 Marquee */}
        <div className="mt-16">
          <h3 className="text-sm font-bold text-[var(--color-city-secondary)] uppercase tracking-[0.2em] mb-8">
            Tech Stack
          </h3>

          <div
            className="flex flex-col gap-6 overflow-x-hidden relative pt-6 pb-6"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >

            {/* 첫 번째 줄 — → 방향 (4배 복사, 25%씩 이동) */}
            <motion.div
              animate={{ x: ["0%", "-25%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }}
              className="flex gap-10 w-max"
            >
              {[...Array(4)].flatMap(() => techIcons.slice(0, 11)).map((icon, i) => (
                <div key={i} className="group relative flex flex-col items-center gap-2 cursor-default">
                  <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="w-full h-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-400"
                    />
                  </div>
                  <span className="text-[9px] text-[var(--color-city-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-mono">
                    {icon.alt}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* 두 번째 줄 — ← 방향 (4배 복사, 역방향) */}
            <motion.div
              animate={{ x: ["-25%", "0%"] }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear", repeatType: "loop" }}
              className="flex gap-10 w-max"
            >
              {[...Array(4)].flatMap(() => techIcons.slice(11)).map((icon, i) => (
                <div key={i} className="group relative flex flex-col items-center gap-2 cursor-default">
                  <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="w-full h-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-400"
                    />
                  </div>
                  <span className="text-[9px] text-[var(--color-city-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-mono">
                    {icon.alt}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
