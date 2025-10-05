import React, { useState, useEffect } from "react";

const API_KEY_STORAGE = "gemini_api_key";

interface ApiKeyManagerProps {
  onKeySet: (key: string) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeySet }) => {
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);

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

  if (savedKey) {
    return (
      <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-teal-900/30 border border-green-500/30 rounded-lg p-4 mb-4 shadow-lg shadow-green-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400 drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-zinc-200 font-medium">API 키가 저장되었습니다</span>
          </div>
          <button
            onClick={handleRemoveKey}
            className="text-sm text-red-400 hover:text-red-300 transition-all hover:scale-105 font-medium"
          >
            삭제
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-lg p-4 mb-4 shadow-xl shadow-black/50"
    >
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        Gemini API 키
      </label>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="API 키를 입력하세요"
        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-3"
        required
      />
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
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          저장
        </button>
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
  );
};

export default ApiKeyManager;
