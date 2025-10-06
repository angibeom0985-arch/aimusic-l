import React from "react";
import { Link } from "react-router-dom";
import ApiKeyManager from "../components/ApiKeyManager";
import RelatedServices from "../components/RelatedServices";

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
      <div className="text-center mb-12 max-w-4xl">
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-400 to-pink-500"
          style={{
            filter:
              "drop-shadow(0 0 20px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.6))",
          }}
        >
          AI 음원 가사 및 썸네일 제작
        </h1>
        <p className="text-zinc-300 text-xl md:text-2xl font-semibold mb-4 drop-shadow-lg">
          유튜브 플레이리스트 채널을 누구나 운영할 수 있게 도와드립니다.
        </p>
      </div>

      {/* API 키 입력 섹션 */}
      <div className="w-full max-w-2xl mb-12">
        <ApiKeyManager onKeySet={handleKeySet} />
      </div>

      {/* 메인 서비스 카드 (가사 생성 & 썸네일 생성) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
        <Link to="/lyrics" className="group cursor-pointer">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-xl p-6 shadow-2xl shadow-black/50 hover:shadow-pink-500/20 transition-all duration-300 backdrop-blur-sm hover:scale-105">
            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-16 h-16 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 bg-clip-text text-transparent">
                AI 음악 가사 1초 완성
              </h3>
              <p className="text-zinc-400 text-sm md:text-base mb-4">
                AI 음악 가사 1초 완성
              </p>
              <button className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 hover:from-pink-500 hover:via-rose-400 hover:to-red-500 hover:shadow-lg hover:shadow-pink-500/50 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md border-2 border-white/20">
                바로 가기 →
              </button>
            </div>
          </div>
        </Link>

        <Link to="/thumbnail" className="group cursor-pointer">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-xl p-6 shadow-2xl shadow-black/50 hover:shadow-purple-500/20 transition-all duration-300 backdrop-blur-sm hover:scale-105">
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                🎨
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                AI 음악 썸네일 제작
              </h3>
              <p className="text-zinc-400 text-sm md:text-base mb-4">
                AI 음악 썸네일 제작
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:via-indigo-400 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md border-2 border-white/20">
                바로 가기 →
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* 다른 서비스 홍보 */}
      <div className="w-full max-w-6xl mt-8">
        <RelatedServices />
      </div>
    </div>
  );
};

export default HomePage;
