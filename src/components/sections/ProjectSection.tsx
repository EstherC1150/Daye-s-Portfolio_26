"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../../constants/images";
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [direction, setDirection] = useState(0); // Removed unused state

  const projects = [
    {
      title: "포트폴리오 웹사이트",
      shortDescription: "React & Tailwind CSS 포트폴리오",
      thumbnail: images.projects.portfolio,
      fullDescription: `React와 Tailwind CSS를 활용한 반응형 웹사이트입니다.
Framer Motion을 통해 부드러운 애니메이션을 구현하였으며,
사용자 경험을 고려한 모던한 UI/UX를 적용했습니다.`,
      technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      link: "https://github.com/EstherC1150/Daye-s-Portfolio",
    },
    {
      title: "라이브러리 관리기",
      shortDescription: "3D 모델 라이브러리 관리 시스템",
      thumbnail: images.projects.libraryManager,
      fullDescription: `3D 모델 파일(FBX)을 웹에서 바로 확인하는 뷰어 기능과
체계적인 파일 관리 시스템을 구축했습니다.
카테고리별 통계 차트와 유저 권한 관리 기능을 포함합니다.`,
      technologies: ["Next.js", "Three.js", "Node.js", "MSSQL"],
      link: "https://github.com/EstherC1150/vclm",
    },
    {
      title: "SPESATE",
      shortDescription: "반응형 기업 홈페이지",
      thumbnail: images.projects.spesate,
      fullDescription: `기업의 아이덴티티를 살린 반응형 홈페이지입니다.
Next.js와 Styled-components를 사용하여 성능과 스타일을 잡았으며,
SEO 최적화에 중점을 두어 개발했습니다.`,
      technologies: ["Next.js", "Styled-components", "Framer Motion"],
      link: "https://spesate.com/",
    },
    {
      title: "알씨케이",
      shortDescription: "글로벌 기업 공식 홈페이지",
      thumbnail: images.projects.rckhome,
      fullDescription: `다국어 지원(i18n)과 Next.js ISR을 활용한 고성능 웹사이트입니다.
Vercel 배포 파이프라인을 구축하여 유지보수 효율을 높였습니다.`,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://rckorea.vercel.app/",
    },
    {
      title: "Dr.Come",
      shortDescription: "비대면 의료 진료 플랫폼",
      thumbnail: images.projects.drcome,
      fullDescription: `실시간 화상 진료와 예약 관리가 가능한 의료 플랫폼입니다.
WebRTC 기술을 활용하여 안정적인 화상 상담 기능을 구현했습니다.`,
      technologies: ["Spring Boot", "WebRTC", "Vue.js", "Oracle"],
      link: "https://github.com/EstherC1150/Dr.ComeProject",
    },
    {
      title: "대단해",
      shortDescription: "비대면 음식점 예약 서비스",
      thumbnail: images.projects.daedanae2,
      fullDescription: `지역 상권 활성화를 위한 음식점 예약 및 홍보 플랫폼입니다.
실시간 예약 알림 시스템과 위치 기반 맛집 추천 기능을 제공합니다.`,
      technologies: ["Node.js", "Vue.js", "MySQL", "AWS RDS"],
      link: "https://github.com/EstherC1150/DaeDaNae_NodeVue",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getCardStyle = (index: number) => {
    const total = projects.length;
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;

    const absDiff = Math.abs(diff);
    if (absDiff > 2) return { display: 'none' };

    const isActive = diff === 0;
    
    // 3D Transform 값 설정
    const rotateY = diff * -25;
    const translateX = diff * 320; // 간격 조정 (원형이라 조금 좁힘)
    const translateZ = Math.abs(diff) * -350;
    const scale = 1 - Math.abs(diff) * 0.15;
    const opacity = 1 - Math.abs(diff) * 0.3;
    const zIndex = 100 - Math.abs(diff);

    return {
      transform: `perspective(1000px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      filter: isActive ? 'none' : 'brightness(0.5) grayscale(0.8)',
    };
  };

  return (
    <section
      id="project"
      className="relative min-h-screen flex flex-col justify-center bg-[var(--color-city-bg)] overflow-hidden py-20"
    >
        {/* Background Decorative Grid */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 160, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 160, 0.2) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
             maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)'
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col">
            {/* Title - Right Aligned as requested */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12 text-right relative"
            >
                <h2 className="text-6xl md:text-9xl font-black text-white/[0.03] corncorn absolute -top-12 right-0 select-none z-0">
                    PROJECTS
                </h2>
                <h2 className="relative z-10 text-4xl md:text-5xl font-bold corncorn text-[var(--color-city-accent)] tracking-wide">
                    Selected Works
                </h2>
                <div className="w-24 h-1 bg-[var(--color-city-accent)] ml-auto mt-4" />
            </motion.div>

            {/* Carousel Container */}
            <div className="relative w-full h-[400px] md:h-[500px] flex justify-center items-center perspective-1000 mb-10">
                {projects.map((project, index) => {
                    const style = getCardStyle(index);
                    if (style.display === 'none') return null;
                    const isActive = index === activeIndex;

                    return (
                        <motion.div
                            key={index}
                            className={`absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer bg-black overflow-hidden border ${isActive ? 'border-[var(--color-city-accent)]/50 animate-[spin_10s_linear_infinite]' : 'border-white/5'}`}
                            animate={style as any}
                            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                            onClick={() => {
                                let diff = (index - activeIndex + projects.length) % projects.length;
                                if (diff > projects.length / 2) diff -= projects.length;
                                if (diff !== 0) setActiveIndex(index);
                            }}
                        >
                            {/* Image */}
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            
                            {/* CD Holographic Reflection - Adjusted for visibility on light/dark images */}
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.4)_60deg,rgba(255,192,203,0.4)_70deg,rgba(135,206,235,0.4)_80deg,rgba(255,255,255,0.4)_90deg,transparent_120deg,transparent_240deg,rgba(255,255,255,0.4)_270deg,rgba(238,130,238,0.4)_280deg,rgba(135,206,235,0.4)_290deg,rgba(255,255,255,0.4)_300deg,transparent_360deg)] opacity-50 pointer-events-none mix-blend-overlay" />
                            
                            {/* Physical Shine (Surface Reflection) - Visible on bright images */}
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.3)_50%,transparent_70%)] opacity-60 pointer-events-none" />

                            {/* Edge Definition for bright images */}
                            <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
                        </motion.div>
                    );
                })}
            </div>

            {/* Project Details (Active Item) - Bottom Box */}
            <div className="relative mx-auto max-w-4xl w-full h-[240px] md:h-[220px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center overflow-hidden group hover:border-[var(--color-city-accent)]/30 transition-colors"
                    >
                        {/* Floating Glow */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--color-city-accent)] blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left h-full">
                            {/* Left: Text Content */}
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar h-full flex flex-col justify-center">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 corncorn">
                                    {projects[activeIndex].title}
                                </h3>
                                <p className="text-[var(--color-city-accent)] text-xs font-semibold tracking-wider mb-3 uppercase">
                                    {projects[activeIndex].shortDescription}
                                </p>
                                <p className="text-[var(--color-city-text)] leading-relaxed whitespace-pre-line opacity-80 text-sm">
                                    {projects[activeIndex].fullDescription}
                                </p>
                            </div>

                            {/* Right: Tech & Buttons */}
                            <div className="flex flex-col gap-3 w-[240px] shrink-0 justify-center h-full border-l border-white/5 pl-6">
                                <div className="flex flex-wrap gap-1.5 justify-start content-start">
                                    {projects[activeIndex].technologies.map((tech, i) => (
                                        <span 
                                            key={i} 
                                            className="px-2 py-0.5 text-[10px] font-medium text-[var(--color-city-secondary)] bg-white/5 rounded-full border border-white/5"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 mt-auto w-full">
                                     <button 
                                        onClick={handlePrev} 
                                        className="p-2 rounded-lg bg-white/5 text-white hover:bg-[var(--color-city-accent)] hover:text-black transition-all active:scale-95 border border-white/10"
                                    >
                                        <FaChevronLeft size={10} />
                                    </button>
                                    
                                    <a
                                        href={projects[activeIndex].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[var(--color-city-accent)] text-black font-bold rounded-lg hover:bg-[var(--color-city-accent)]/80 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,212,160,0.2)] text-xs whitespace-nowrap"
                                    >
                                        <FaExternalLinkAlt size={10} /> Visit Site
                                    </a>

                                    <button 
                                        onClick={handleNext} 
                                        className="p-2 rounded-lg bg-white/5 text-white hover:bg-[var(--color-city-accent)] hover:text-black transition-all active:scale-95 border border-white/10"
                                    >
                                        <FaChevronRight size={10} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    </section>
  );
};

export default ProjectSection;
