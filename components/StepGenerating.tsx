import React, { useEffect, useState } from "react";
import { generateLyrics } from "../services/geminiService";
import Card from "./Card";
import { Selections, AppStep } from "../types";

const loadingMessages = [
  "악기를 튜닝하고 있어요...",
  "완벽한 멜로디를 만드는 중...",
  "영감을 불어넣는 중...",
  "코러스를 작곡하고 있어요...",
  "감동적인 가사를 쓰는 중...",
  "거의 다 되었어요!",
];

interface StepGeneratingProps {
  selections: Selections;
  setLyrics: (lyrics: string) => void;
  setStep: (step: AppStep) => void;
  setError: (error: string | null) => void;
  apiKey: string;
}

const StepGenerating: React.FC<StepGeneratingProps> = ({
  selections,
  setLyrics,
  setStep,
  setError,
  apiKey,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) => (prevIndex + 1) % loadingMessages.length
      );
    }, 2000);

    const generate = async () => {
      try {
        setError(null);
        const result = await generateLyrics(
          selections.genre,
          selections.title,
          selections.theme,
          apiKey
        );
        setLyrics(result);
      } catch (err) {
        console.error("Lyrics generation failed:", err);
        setError("가사 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setStep(AppStep.RESULT);
      }
    };

    generate();

    return () => {
      clearInterval(messageInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="text-center">
      <div className="flex flex-col items-center justify-center h-64">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-pink-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-pink-500 border-l-pink-500 border-b-pink-500/30 border-r-pink-500/30 rounded-full animate-spin"></div>
          <div className="absolute inset-2 flex items-center justify-center text-3xl">
            🎶
          </div>
        </div>
        <p className="mt-6 text-xl font-semibold text-zinc-200">
          {loadingMessages[currentMessageIndex]}
        </p>
        <p className="mt-2 text-zinc-400">
          AI가 당신의 이야기를 노래로 만들고 있습니다.
        </p>
      </div>
    </Card>
  );
};

export default StepGenerating;
