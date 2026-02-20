// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/layout/Header/Header";
// import Home from "./pages/Home";
// import About from "./pages/About";
import MainBanner from "./components/sections/MainBanner";
import AboutSection from "./components/sections/AboutSection";
import WorkSection from "./components/sections/WorkSection";
import ProjectSection from "./components/sections/ProjectSection";
import ContactSection from "./components/sections/ContactSection";
import TopButton from "./components/common/TopButton";
import Header from "./components/layout/Header/Header";
import MouseSpotlight from "./components/common/MouseSpotlight";

function App() {
  return (
    <>
      <MouseSpotlight />
      <Header />
      <main>
        <MainBanner />
        <AboutSection />
        <WorkSection />
        <ProjectSection />
        <ContactSection />
      </main>
      <TopButton />
    </>
    // <BrowserRouter>
    //   <Header />
    //   <main>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/about" element={<About />} />
    //     </Routes>
    //     <div className="h-[2000px] bg-gradient-to-b from-white to-gray-100"></div>
    //   </main>
    // </BrowserRouter>
  );
}

export default App;
