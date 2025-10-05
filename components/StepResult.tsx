import React from "react";
import Card from "./Card";
import Button from "./Button";
import { handleCopyDownload } from "../utils/coupang";

interface StepResultProps {
  lyrics: string;
  onReset: () => void;
  error: string | null;
}

const StepResult: React.FC<StepResultProps> = ({ lyrics, onReset, error }) => {
  const handleCopy = () => {
    handleCopyDownload(lyrics, "copy");
  };

  const handleDownload = () => {
    handleCopyDownload(lyrics, "download");
  };

  return (
    <Card>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          {error ? "오류가 발생했습니다" : "가사가 완성되었어요!"}
        </h2>
      </div>
      {error ? (
        <div className="text-center text-red-400 my-8">{error}</div>
      ) : (
        <div className="bg-black/20 p-4 rounded-lg max-h-96 overflow-y-auto border border-zinc-700">
          <pre className="whitespace-pre-wrap text-zinc-300 font-sans">
            {lyrics}
          </pre>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <Button onClick={onReset} variant="info">
          🔄 처음부터 다시하기
        </Button>
        {!error && (
          <>
            <Button onClick={handleCopy} variant="success">
              📋 가사 복사하기
            </Button>
            <Button onClick={handleDownload} variant="purple">
              💾 가사 다운로드
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default StepResult;
