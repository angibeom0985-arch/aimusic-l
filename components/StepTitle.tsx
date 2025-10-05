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
      <StepIndicator
        currentStep={2}
        totalSteps={3}
        stepTitle="마음에 드는 제목을 고르세요"
      />
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
          <div className="space-y-3">
            {titles.map((title, index) => (
              <button
                key={index}
                onClick={() => onTitleSelect(title)}
                className="w-full text-left p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
              >
                {title}
              </button>
            ))}
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
            <Button type="submit" disabled={!customTitle.trim()}>
              선택
            </Button>
          </form>
        </>
      )}
      <div className="flex justify-between items-center mt-8">
        <Button onClick={onBack} variant="secondary">
          뒤로가기
        </Button>
        <Button onClick={fetchTitles} disabled={loading} variant="ghost">
          새로운 제목 생성
        </Button>
      </div>
    </Card>
  );
};

export default StepTitle;
