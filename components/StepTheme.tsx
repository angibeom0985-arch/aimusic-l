import React, { useState, useEffect, useCallback } from "react";
import { generateThemes } from "../services/geminiService";
import Card from "./Card";
import StepIndicator from "./StepIndicator";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

interface StepThemeProps {
  genre: string;
  title: string;
  onThemeSelect: (theme: string) => void;
  onBack: () => void;
  apiKey: string;
}

const StepTheme: React.FC<StepThemeProps> = ({
  genre,
  title,
  onThemeSelect,
  onBack,
  apiKey,
}) => {
  const [themes, setThemes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customTheme, setCustomTheme] = useState("");

  const fetchThemes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newThemes = await generateThemes(genre, title, apiKey);
      setThemes(newThemes);
    } catch (err) {
      setError("주제를 생성하는 데 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [genre, title, apiKey]);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTheme.trim()) {
      onThemeSelect(customTheme.trim());
    }
  };

  return (
    <Card>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        가사의 주제를 선택하세요
      </h2>
      <p className="text-zinc-400 text-center mb-6">
        선택한 제목:{" "}
        <span className="text-orange-400 font-medium">{title}</span>
      </p>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <LoadingSpinner />
          <p className="mt-4 text-zinc-400">AI가 주제를 구상하고 있어요...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 min-h-[200px] flex items-center justify-center">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {themes.map((theme, index) => {
              const colors = [
                "from-rose-600/20 to-pink-600/20 hover:from-rose-600/30 hover:to-pink-600/30 border-rose-600/50",
                "from-amber-600/20 to-orange-600/20 hover:from-amber-600/30 hover:to-orange-600/30 border-amber-600/50",
                "from-emerald-600/20 to-green-600/20 hover:from-emerald-600/30 hover:to-green-600/30 border-emerald-600/50",
                "from-sky-600/20 to-blue-600/20 hover:from-sky-600/30 hover:to-blue-600/30 border-sky-600/50",
                "from-purple-600/20 to-violet-600/20 hover:from-purple-600/30 hover:to-violet-600/30 border-purple-600/50",
              ];
              return (
                <button
                  key={index}
                  onClick={() => onThemeSelect(theme)}
                  className={`w-full text-left p-4 bg-gradient-to-r ${
                    colors[index % colors.length]
                  } rounded-lg transition-all duration-200 border shadow-md hover:shadow-lg hover:scale-[1.02]`}
                >
                  {theme}
                </button>
              );
            })}
          </div>
          <div className="mt-6 text-center text-zinc-400">
            <p>또는</p>
          </div>
          <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              placeholder="직접 주제 입력..."
              className="flex-grow bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
              aria-label="직접 주제 입력"
            />
            <Button
              type="submit"
              disabled={!customTheme.trim()}
              className="whitespace-nowrap"
            >
              선택
            </Button>
          </form>
        </>
      )}
    </Card>
  );
};

export default StepTheme;
