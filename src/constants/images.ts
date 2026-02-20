export const images = {
  profile: {
    main: "/images/KakaoTalk_20250529_104401788.jpg",
  },
  icons: {
    development: {
      javascript: "/icons/JavaScript.svg",
      typescript: "/icons/TypeScript.svg",
      react: "/icons/React.svg",
      vite: "/icons/Vite-Dark.svg",
      nextjs: "/icons/NextJS-Dark.svg",
      vue: "/icons/Vue.svg",
      nodejs: "/icons/NodeJS-Dark.svg",
      oracle: "/icons/oracle.png",
      mysql: "/icons/MySQL-Dark.svg",
      mssql: "/icons/mssql.png",
      linux: "/icons/Linux-Dark.svg",
      docker: "/icons/Docker.svg",
      aws: "/icons/AWS-Dark.svg",
      github: "/icons/github.png",
      vercel: "/icons/Vercel-Dark.svg",
      discord: "/icons/Discord.svg",
      postman: "/icons/Postman.svg",
    },
    design: {
      figma: "/icons/Figma-Dark.svg",
      photoshop: "/icons/Photoshop.svg",
      illustrator: "/icons/Illustrator.svg",
      inDesign: "/icons/indesign.png",
      xd: "/icons/xd.png",
    },
  },
  backgrounds: {
    // 배경 이미지들이 추가될 때 여기에 추가
  },
  projects: {
    portfolio: "/images/project/20250527_134534_4.jpg",
    spesate: "/images/project/20250527_134534_1.jpg",
    libraryManager: "/images/project/20250527_134534_3.jpg",
    rckhome: "/images/project/20250527_134711.jpg",
    drcome: "/images/project/drcome.png",
    daedanae: "/images/project/daedanae.png",
    daedanae2: "/images/project/daedanae_r.png",
  },
  // 필요한 카테고리 추가 가능
} as const;

// 타입 안전성을 위한 타입 정의
export type ImagePaths = typeof images;
