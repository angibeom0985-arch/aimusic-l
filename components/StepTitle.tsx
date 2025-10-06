import React, { useState, useEffect, useCallback } from "react";
import { generateTitles } from "../services/geminiService";
import Card from "./Card";
import StepIndicator from "./StepIndicator";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

interface StepTitleProps {
  genre: string;
  onTitleSelect: (title: string) => void;
  onBack: () => void;
  apiKey: string;
}

const StepTitle: React.FC<StepTitleProps> = ({
  genre,
  onTitleSelect,
  onBack,
  apiKey,
}) => {
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState("");

  const fetchTitles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newTitles = await generateTitles(genre, apiKey);
      setTitles(newTitles);
    } catch (err) {
      setError("제목을 생성하는 데 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [genre, apiKey]);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTitle.trim()) {
      onTitleSelect(customTitle.trim());
    }
  };

  return (
    <Card>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        마음에 드는 제목을 고르세요
      </h2>
      <p className="text-zinc-400 text-center mb-6">
        선택한 장르: <span className="text-pink-400 font-medium">{genre}</span>
      </p>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <LoadingSpinner />
          <p className="mt-4 text-zinc-400">AI가 제목을 만들고 있어요...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 min-h-[200px] flex items-center justify-center">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {titles.map((title, index) => {
              const colors = [
                "from-violet-600/20 to-purple-600/20 hover:from-violet-600/30 hover:to-purple-600/30 border-violet-600/50",
                "from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border-blue-600/50",
                "from-pink-600/20 to-rose-600/20 hover:from-pink-600/30 hover:to-rose-600/30 border-pink-600/50",
                "from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border-green-600/50",
                "from-orange-600/20 to-red-600/20 hover:from-orange-600/30 hover:to-red-600/30 border-orange-600/50",
                "from-indigo-600/20 to-blue-600/20 hover:from-indigo-600/30 hover:to-blue-600/30 border-indigo-600/50",
                "from-yellow-600/20 to-orange-600/20 hover:from-yellow-600/30 hover:to-orange-600/30 border-yellow-600/50",
                "from-teal-600/20 to-cyan-600/20 hover:from-teal-600/30 hover:to-cyan-600/30 border-teal-600/50",
              ];
              return (
                <button
                  key={index}
                  onClick={() => onTitleSelect(title)}
                  className={`w-full text-left p-4 bg-gradient-to-r ${
                    colors[index % colors.length]
                  } rounded-lg transition-all duration-200 border shadow-md hover:shadow-lg hover:scale-[1.02]`}
                >
                  {title}
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
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="직접 제목 입력..."
              className="flex-grow bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
              aria-label="직접 제목 입력"
            />
            <Button
              type="submit"
              disabled={!customTitle.trim()}
              className="whitespace-nowrap"
            >
              선택
            </Button>
          </form>
        </>
      )}
      <div className="flex justify-center mt-8">
        <Button onClick={fetchTitles} disabled={loading} variant="purple">
          🔄 새로운 제목 생성
        </Button>
      </div>
    </Card>
  );
};

export default StepTitle;
