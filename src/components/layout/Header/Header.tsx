import { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import MobileSidebarMenu from "./MobileSidebarMenu";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none`}
      >
          {/* Dynamic Header container */}
        <div className={`flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-500 ${scrolled ? "py-4" : "py-6"}`}>
          
          {/* Logo - Floating independently */}
          <a
            href="/"
            className="pointer-events-auto relative group"
          >
             <div className={`absolute -inset-2 bg-white/5 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${scrolled ? 'visible' : 'invisible' }`} />
            <span className="relative text-2xl font-bold corncorn text-[var(--color-city-text)] group-hover:text-[var(--color-city-accent)] transition-colors duration-300 tracking-wider">
              Daye<span className="text-[var(--color-city-accent)]">.</span>dev
            </span>
          </a>

          {/* Destkop Navigation - Centered Capsule */}
          <div className="hidden md:block pointer-events-auto">
            <motion.div 
                className={`
                    px-8 py-3 rounded-full border transition-all duration-500
                    ${scrolled 
                        ? "bg-[var(--color-city-bg)]/80 backdrop-blur-md border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" 
                        : "bg-transparent border-transparent"
                    }
                `}
            >
              <Navigation />
            </motion.div>
          </div>

          {/* Work/Contact CTA or Mobile Menu */}
          <div className="pointer-events-auto flex items-center gap-4">
               {/* Mobile Menu Button */}
            <button
              className="p-2 md:hidden relative group"
              onClick={toggleMenu}
              aria-label="메뉴 열기"
            >
                <div className="absolute inset-0 bg-white/5 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"/>
              <div className="relative flex flex-col justify-between w-6 h-5">
                <span
                  className={`block w-full h-0.5 bg-white transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2.5 bg-[var(--color-city-accent)]" : ""
                  }`}
                />
                <span
                  className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-full h-0.5 bg-white transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2 bg-[var(--color-city-accent)]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* 모바일 사이드바 */}
      <MobileSidebarMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
