interface NavigationProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const Navigation = ({ isMobile = false, onLinkClick }: NavigationProps) => {
  const links = [
    { href: "#about", label: "ABOUT" },
    { href: "#experience", label: "EXPERIENCE" },
    { href: "#project", label: "PROJECT" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <nav
      className={`${
        isMobile
          ? "flex flex-col gap-8 items-center w-full text-center"
          : "flex gap-8 items-center"
      }`}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById(link.href.substring(1))
              ?.scrollIntoView({ behavior: "instant" });
            if (isMobile && onLinkClick) onLinkClick();
          }}
          className={`relative font-medium transition-all duration-300 pretendard text-sm tracking-widest group ${
            isMobile
              ? "text-[var(--color-city-text)] text-xl"
              : "text-[var(--color-city-secondary)] hover:text-white"
          }`}
        >
          {link.label}
          {!isMobile && (
             <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-city-accent)] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
          )}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
