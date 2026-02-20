import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCommentDots } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactSection = () => {
  const [githubHover, setGithubHover] = useState(false);
  const [emailHover, setEmailHover] = useState(false);
  const [kakaoHover, setKakaoHover] = useState(false);
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between items-center bg-[var(--color-city-bg)] relative overflow-hidden"
    >
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-city-accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      {/* Thank You 메시지 (배경처럼 크게) */}
      <h1 className="text-[12vw] font-extrabold text-white/5 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap continuous z-0">
        Thank You
      </h1>
      
      <div className="flex relative z-10 flex-col flex-1 justify-center items-center px-4 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-32 mb-6 text-4xl font-bold text-center md:text-5xl text-white corncorn"
        >
          봐주셔서 감사합니다 :)
        </motion.h2>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-[var(--color-city-accent)] mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 max-w-2xl text-lg text-center text-[var(--color-city-text)] opacity-80 leading-loose"
        >
          풀스택 개발자로 성장하기 위해 낯선 기술에도 적극적으로 도전하고,
          <br />
          항상 사용자의 관점에서 생각하며 <span className="text-[var(--color-city-accent)] font-semibold">사용하기 좋은 서비스</span>를 만들고
          싶습니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {/* email */}
          <a
            href="mailto:daye511@naver.com"
            className="flex relative flex-col justify-center items-center w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group transition-all duration-300 hover:border-[var(--color-city-accent)] hover:bg-[var(--color-city-accent)]/10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,212,160,0.3)]"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setEmailHover(true)}
            onMouseLeave={() => setEmailHover(false)}
          >
            <div className="absolute inset-0 rounded-full border border-[var(--color-city-accent)] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse" />
            
            <motion.div
              animate={{ y: emailHover ? -5 : 0 }}
              className="flex flex-col items-center gap-2"
            >
                <MdEmail className="w-8 h-8 text-[var(--color-city-secondary)] group-hover:text-[var(--color-city-accent)] transition-colors" />
                <span className="text-sm text-[var(--color-city-secondary)] group-hover:text-white transition-colors">Email</span>
            </motion.div>
          </a>

          {/* github */}
          <a
            href="https://github.com/EstherC1150"
            className="flex relative flex-col justify-center items-center w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group transition-all duration-300 hover:border-[var(--color-city-accent)] hover:bg-[var(--color-city-accent)]/10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,212,160,0.3)]"
            target="_blank"
            rel="noopener noreferrer"
          >
             <div className="absolute inset-0 rounded-full border border-[var(--color-city-accent)] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse" />
             
             <div className="flex flex-col items-center gap-2">
                <FaGithub className="w-8 h-8 text-[var(--color-city-secondary)] group-hover:text-[var(--color-city-accent)] transition-colors" />
                <span className="text-sm text-[var(--color-city-secondary)] group-hover:text-white transition-colors">GitHub</span>
             </div>
          </a>

          {/* kakao */}
          <a
            href="https://open.kakao.com/o/s6G2eZzh"
            className="flex relative flex-col justify-center items-center w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group transition-all duration-300 hover:border-[var(--color-city-accent)] hover:bg-[var(--color-city-accent)]/10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,212,160,0.3)]"
            target="_blank"
            rel="noopener noreferrer"
          >
             <div className="absolute inset-0 rounded-full border border-[var(--color-city-accent)] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse" />
             
             <div className="flex flex-col items-center gap-2">
                <FaCommentDots className="w-8 h-8 text-[var(--color-city-secondary)] group-hover:text-[var(--color-city-accent)] transition-colors" />
                <span className="text-sm text-[var(--color-city-secondary)] group-hover:text-white transition-colors">Kakao</span>
             </div>
          </a>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8 w-full text-xs text-center text-[var(--color-city-secondary)] opacity-50"
      >
        <p>Copyright 2026. ChoiDaye all rights reserved.</p>
        <p className="mt-1">Designed & Built with React, Tailwind CSS</p>
      </motion.footer>
    </section>
  );
};

export default ContactSection;
