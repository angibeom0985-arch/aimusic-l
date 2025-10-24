import React, { useState, useEffect } from "react";

const API_KEY_STORAGE = "gemini_api_key";

interface ApiKeyManagerProps {
  onKeySet: (key: string) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeySet }) => {
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(true);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(API_KEY_STORAGE);
    if (stored) {
      setSavedKey(stored);
      onKeySet(stored);
    }
  }, [onKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      if (remember) {
        localStorage.setItem(API_KEY_STORAGE, apiKey);
      } else {
        localStorage.removeItem(API_KEY_STORAGE);
      }
      setSavedKey(apiKey);
      onKeySet(apiKey);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setSavedKey(null);
    setApiKey("");
    onKeySet("");
  };

  return (
    <div>
      {savedKey ? (
        <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-teal-900/30 border border-green-500/30 rounded-lg p-4 mb-4 shadow-lg shadow-green-500/20">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400 drop-shadow-lg flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-zinc-200 font-medium">
              ✅ API 키가 정상적으로 입력되어 있습니다
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-orange-900/30 via-amber-900/30 to-yellow-900/30 border border-orange-500/30 rounded-lg p-4 mb-4 shadow-lg shadow-orange-500/20">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-orange-400 drop-shadow-lg flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-zinc-200 font-medium">
              ⚠️ API 키를 입력해주세요
            </span>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-lg p-4 mb-4 shadow-xl shadow-black/50"
      >
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Gemini API 키
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={savedKey || apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setSavedKey(null); // 수정 시 savedKey 초기화
            }}
            placeholder="API 키를 입력하세요"
            className="w-full px-4 py-2 pr-12 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-3"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={showPassword ? "숨기기" : "보이기"}
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-zinc-600 text-pink-500 focus:ring-pink-500"
            />
            기억하기
          </label>
          <div className="flex gap-2">
            {savedKey && (
              <button
                type="button"
                onClick={handleRemoveKey}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                삭제
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              저장
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-3">
          API 키가 없으신가요?{" "}
          <a
            href="/api-guide"
            target="_blank"
            className="text-pink-400 hover:text-pink-300"
          >
            발급 방법 보기
          </a>
        </p>
      </form>
    </div>
  );
};

export default ApiKeyManager;
