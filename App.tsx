import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ApiGuidePage from "./pages/ApiGuidePage";
import HowToUsePage from "./pages/HowToUsePage";
import AdminPage from "./pages/AdminPage";
import ThumbnailPage from "./pages/ThumbnailPage";
import SidebarAd from "./components/SidebarAd";
import FloatingBanner from "./components/FloatingBanner";
import { initContentProtection } from "./utils/contentProtection";
import { initAdBlockerDetection } from "./utils/adBlockDetector";

const App: React.FC = () => {
  useEffect(() => {
    // AdBlocker 감지
    initAdBlockerDetection();

    // 콘텐츠 보호 초기화
    initContentProtection();

    return () => {
      // 클린업은 contentProtection에서 처리
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 relative">
        {/* 사이드바 광고 */}
        <SidebarAd position="left" />
        <SidebarAd position="right" />

        {/* 메인 컨텐츠 */}
        <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:px-[180px]">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
              <Link to="/">AI 음원 가사 및 썸네일 제작</Link>
            </h1>
            <p className="text-zinc-400 mt-2">
              AI로 당신의 음악에 생명을 불어넣으세요
            </p>

            {/* 네비게이션 메뉴 */}
            <nav className="mt-4 flex justify-center gap-4">
              <Link
                to="/"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                가사 생성
              </Link>
              <Link
                to="/thumbnail"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                썸네일 생성
              </Link>
              <Link
                to="/api-guide"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                API 가이드
              </Link>
              <Link
                to="/how-to-use"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                사용 방법
              </Link>
            </nav>
          </header>

          <main className="w-full max-w-7xl">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/thumbnail" element={<ThumbnailPage />} />
              <Route path="/api-guide" element={<ApiGuidePage />} />
              <Route path="/how-to-use" element={<HowToUsePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          <footer className="text-center mt-12 text-zinc-500 text-sm pb-24">
            <p className="mb-2">
              쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
              제공받습니다.
            </p>
            <p>&copy; 2025 AI 음원 가사 및 썸네일 제작. All rights reserved.</p>
          </footer>
        </div>

        {/* 플로팅 배너 */}
        <FloatingBanner />
      </div>
    </Router>
  );
};

export default App;
