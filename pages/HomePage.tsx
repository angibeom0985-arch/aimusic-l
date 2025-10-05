import React from "react";
import { Link } from "react-router-dom";
import ApiKeyManager from "../components/ApiKeyManager";

const API_KEY_STORAGE = "gemini_api_key";

interface HomePageProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ apiKey, setApiKey }) => {
  const handleKeySet = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem(API_KEY_STORAGE, key);
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* 타이틀 */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 mb-4">
          AI 음원 가사 및 썸네일 제작
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl">
          유튜브 플레이리스트 채널을 누구나 운영할 수 있게 도와드립니다.
        </p>
      </div>

      {/* API 키 입력 섹션 */}
      <div className="w-full max-w-2xl mb-12">
        <ApiKeyManager onKeySet={handleKeySet} />
      </div>

      {/* 메인 버튼 그리드 (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link
          to="/lyrics"
          className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h2 className="text-3xl font-bold text-white mb-2">가사 생성</h2>
            <p className="text-blue-100">AI가 창의적인 가사를 작성해드립니다</p>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>

        <Link
          to="/thumbnail"
          className="group relative overflow-hidden bg-gradient-to-br from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🖼️</div>
            <h2 className="text-3xl font-bold text-white mb-2">썸네일 생성</h2>
            <p className="text-orange-100">
              음악에 어울리는 썸네일을 만들어드립니다
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>

        <Link
          to="/api-guide"
          className="group relative overflow-hidden bg-gradient-to-br from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-white mb-2">API 가이드</h2>
            <p className="text-teal-100">
              Gemini API 키 발급 방법을 안내합니다
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>

        <Link
          to="/how-to-use"
          className="group relative overflow-hidden bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">💡</div>
            <h2 className="text-3xl font-bold text-white mb-2">사용 방법</h2>
            <p className="text-blue-100">
              본 사이트의 사용법을 상세히 설명합니다
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
