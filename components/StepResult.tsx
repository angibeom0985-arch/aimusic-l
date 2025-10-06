import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

interface StepResultProps {
  lyrics: string;
  onReset: () => void;
  error: string | null;
}

const StepResult: React.FC<StepResultProps> = ({ lyrics, onReset, error }) => {
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(lyrics);
    alert("가사가 클립보드에 복사되었습니다!");
  };

  const handleDownload = () => {
    const blob = new Blob([lyrics], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lyrics.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const goToThumbnail = () => {
    navigate("/thumbnail");
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

      {/* 썸네일 생성 유도 섹션 */}
      {!error && (
        <div className="mt-12 p-8 bg-gradient-to-br from-pink-900/40 via-purple-900/40 to-blue-900/40 rounded-2xl border-2 border-pink-500/50 shadow-2xl backdrop-blur-sm hover:border-pink-400/70 transition-all duration-300">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">🎨</div>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
              완벽한 가사가 완성되었어요! �
            </h3>
            <p className="text-lg text-zinc-300 font-semibold mb-2">
              이제 눈길을 사로잡는 <span className="text-pink-400">썸네일</span>
              만 있으면 끝!
            </p>
            <p className="text-zinc-400 text-sm md:text-base">
              ✨ AI가 당신의 가사에 딱 맞는 고퀄리티 썸네일을 1초 만에
              생성해드립니다
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={goToThumbnail}
              variant="primary"
              className="text-lg px-8 py-4 shadow-xl hover:shadow-pink-500/50 animate-pulse"
            >
              🎨 지금 바로 썸네일 만들기 →
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StepResult;
