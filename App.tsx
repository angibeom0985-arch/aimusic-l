import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LyricsPage from "./pages/LyricsPage";
import ApiGuidePage from "./pages/ApiGuidePage";
import HowToUsePage from "./pages/HowToUsePage";
import AdminPage from "./pages/AdminPage";
import ThumbnailPage from "./pages/ThumbnailPage";
import ThumbnailEditPage from "./pages/ThumbnailEditPage";
import HomePage from "./pages/HomePage";
import { initContentProtection } from "./utils/contentProtection";
import AdBlockDetector from "./components/AdBlockDetector";
import FloatingBanner from "./components/FloatingBanner";
import SidebarAds from "./components/SidebarAds";

const API_KEY_STORAGE = "gemini_api_key";

const AppContent: React.FC = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // API 키 불러오기
    const stored = localStorage.getItem(API_KEY_STORAGE);
    if (stored) {
      setApiKey(stored);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100 relative">
      {/* 애드블록 감지 */}
      <AdBlockDetector />

      {/* 사이드 광고 (데스크톱 전용) */}
      <SidebarAds />

      {/* 플로팅 배너 광고 */}
      <FloatingBanner />

      {/* 메인 컨텐츠 - 사이트 제목 헤더 제거됨 (2025-10-07) */}
      {/* 사이드 광고를 고려한 중앙 정렬 */}
      <div className="min-h-screen flex flex-col p-4 lg:px-[200px]">
        <main className="w-full max-w-7xl mx-auto flex-1">
          <Routes>
            <Route
              path="/"
              element={<HomePage apiKey={apiKey} setApiKey={setApiKey} />}
            />
            <Route path="/lyrics" element={<LyricsPage apiKey={apiKey} />} />
            <Route
              path="/thumbnail"
              element={<ThumbnailPage apiKey={apiKey} />}
            />
            <Route path="/thumbnail/edit" element={<ThumbnailEditPage />} />
            <Route path="/api-guide" element={<ApiGuidePage />} />
            <Route path="/how-to-use" element={<HowToUsePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="text-center mt-12 text-zinc-500 text-sm pb-28 md:pb-32">
          <p>&copy; 2025 AI 음원 가사 및 썸네일 제작. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // 콘텐츠 보호 초기화
    initContentProtection();

    return () => {
      // 클린업은 contentProtection에서 처리
    };
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
