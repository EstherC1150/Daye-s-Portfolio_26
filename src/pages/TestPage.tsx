import { useEffect, useState } from "react";
import bgImg from "../assets/images/fruit-basket-kk2eYi5M7JM-unsplash.jpg";
import Header from "../components/layout/Header/Header";

const TestPage = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [textAnim, setTextAnim] = useState(false);
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    // "프론트엔드 개발자"는 1.0초 후에 등장
    const titleTimer = setTimeout(() => setShowTitle(true), 1000);
    // 텍스트 애니메이션(줄어드는 효과)은 2.2초 후에 시작
    const textTimer = setTimeout(() => setTextAnim(true), 2200);
    // 배경 이미지는 2.2초 후에 페이드인 시작
    const bgTimer = setTimeout(() => setShowBg(true), 2200);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(textTimer);
      clearTimeout(bgTimer);
    };
  }, []);

  return (
    <div className="flex overflow-hidden relative flex-col min-h-screen">
      {/* 배경색 */}
      <div className="absolute inset-0 bg-[#FFF6F0] z-0" />
      {/* 배경 이미지 */}
      <img
        src={bgImg}
        alt="bg"
        className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-[1800ms] ${
          showBg ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
        style={{ pointerEvents: "none", userSelect: "none" }}
      />

      {/* 모든 컨텐츠는 z-20 이상 */}
      <div className="flex relative z-20 flex-col min-h-screen">
        {/* 헤더 */}
        {showBg && <Header />}

        {/* 메인 배너 */}
        <main className="flex relative flex-col flex-1 justify-center items-center">
          <div className="flex relative flex-col items-center w-fit">
            {/* "프론트엔드 개발자" - 밑에서 위로 슬라이드 + 페이드인 */}
            <span
              className={`
                block text-5xl md:text-6xl font-extrabold text-[#FF4D00] text-center select-none continuous
                transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  showTitle
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
                ${textAnim ? "scale-100" : "scale-125"}
              `}
              style={{ letterSpacing: "0.05em" }}
            >
              FrontEnd
            </span>
            {/* "최다예 입니다." - 항상 중앙에 고정 */}
            <span
              className={`
                block text-5xl md:text-5xl text-black text-center select-none pretendard
                transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${textAnim ? "scale-100" : "scale-125"}
              `}
              style={{ letterSpacing: "0.05em" }}
            >
              <span className="font-medium">프론트엔드 개발자 </span>
              <span className="font-extrabold">최다예</span>
              <span className="font-medium"> 입니다.</span>
            </span>
          </div>
          {/* 더보기/화살표도 showBg일 때만 보임 */}
          {showBg && (
            <div className="flex absolute bottom-12 left-1/2 flex-col items-center opacity-100 transition-opacity duration-700 -translate-x-1/2">
              <span className="text-sm md:text-lg text-[#1A1A1A] font-semibold pretendard">
                더보기
              </span>
              {/* 뿅뿅 화살표 SVG */}
              <svg
                className="w-10 h-10 text-[#1A1A1A] animate-pop-arrow"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 32 32"
              >
                <path d="M8 12l8 8 8-8" />
              </svg>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TestPage;
