import React from "react";
import ApiKeyManager from "../components/ApiKeyManager";
import Card from "../components/Card";

const API_KEY_STORAGE = "gemini_api_key";

interface ApiKeyPageProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyPage: React.FC<ApiKeyPageProps> = ({ apiKey, setApiKey }) => {
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
      <div className="w-full max-w-3xl">
        {/* 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4"
            style={{
              filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 40px rgba(34, 211, 238, 0.4))"
            }}
          >
            ⚙️ API 키 입력
          </h1>
          <p className="text-zinc-400 text-lg">
            Google Gemini API 키를 입력하여 모든 기능을 사용하세요
          </p>
        </div>

        {/* API 키 입력 카드 */}
        <Card>
          <div className="p-6">
            <ApiKeyManager onKeySet={handleKeySet} />
          </div>
        </Card>

        {/* 안내 정보 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🔑</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                API 키가 없으신가요?
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Google AI Studio에서 무료로 발급받으세요
              </p>
              <a
                href="/api-guide"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                발급 방법 보기 →
              </a>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                사용 방법이 궁금하신가요?
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                사이트 이용 방법을 상세히 안내해드립니다
              </p>
              <a
                href="/how-to-use"
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                사용법 보기 →
              </a>
            </div>
          </Card>
        </div>

        {/* 주요 기능 바로가기 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            🎵 주요 기능 바로가기
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/lyrics"
              className="group relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 rounded-xl p-6 transition-all duration-300 shadow-xl hover:shadow-purple-500/50 hover:scale-105"
            >
              <div className="text-center relative z-10">
                <div className="text-5xl mb-3">🎵</div>
                <h3 className="text-2xl font-bold text-white mb-2">가사 생성</h3>
                <p className="text-blue-100 text-sm">
                  AI가 창의적인 가사를 작성해드립니다
                </p>
              </div>
            </a>

            <a
              href="/thumbnail"
              className="group relative overflow-hidden bg-gradient-to-br from-pink-600 via-rose-500 to-orange-600 hover:from-pink-700 hover:via-rose-600 hover:to-orange-700 rounded-xl p-6 transition-all duration-300 shadow-xl hover:shadow-pink-500/50 hover:scale-105"
            >
              <div className="text-center relative z-10">
                <div className="text-5xl mb-3">🖼️</div>
                <h3 className="text-2xl font-bold text-white mb-2">썸네일 생성</h3>
                <p className="text-orange-100 text-sm">
                  음악에 어울리는 썸네일을 만들어드립니다
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyPage;
