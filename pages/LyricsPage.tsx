import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_GENRES } from "../constants";
import StepGenre from "../components/StepGenre";
import StepTitle from "../components/StepTitle";
import StepTheme from "../components/StepTheme";
import StepGenerating from "../components/StepGenerating";
import StepResult from "../components/StepResult";
import DisplayAd from "../components/DisplayAd";
import RelatedServices from "../components/RelatedServices";

interface MainPageProps {
  apiKey: string;
}

const MainPage: React.FC<MainPageProps> = ({ apiKey }) => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({
    genre: "",
    title: "",
    theme: "",
  });
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleReset = useCallback(() => {
    setSelections({ genre: "", title: "", theme: "" });
    setLyrics("");
    setError(null);
    setIsGenerating(false);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleGenreSelect = (genre: string) => {
    setSelections((prev) => ({ ...prev, genre }));
  };

  const handleTitleSelect = (title: string) => {
    setSelections((prev) => ({ ...prev, title }));
  };

  const handleThemeSelect = (theme: string) => {
    setSelections((prev) => ({ ...prev, theme }));
    setIsGenerating(true);
    setShowResult(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-8">
      {/* 페이지 헤더 */}
      <div className="text-center pt-8 pb-4">
        <h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent mb-4"
          style={{
            textShadow:
              "0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)",
          }}
        >
          🎵 AI 음악 가사 1초 완성
        </h1>
        <p className="text-zinc-400 text-lg mb-6">
          장르, 제목, 테마를 선택하면 AI가 완벽한 가사를 생성해드립니다
        </p>
      </div>

      {/* 1단계: 장르 선택 */}
      <div className="scroll-mt-20" id="genre-section">
        <StepGenre onGenreSelect={handleGenreSelect} genres={INITIAL_GENRES} />
      </div>

      {/* 광고 1: 장르와 제목 사이 */}
      <DisplayAd />

      {/* 2단계: 제목 선택 */}
      <div className="scroll-mt-20" id="title-section">
        {selections.genre ? (
          <StepTitle
            genre={selections.genre}
            onTitleSelect={handleTitleSelect}
            onBack={() => setSelections((prev) => ({ ...prev, genre: "" }))}
            apiKey={apiKey}
          />
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-zinc-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              제목 선택
            </h3>
            <p className="text-zinc-500">위에서 장르를 먼저 선택해주세요</p>
          </div>
        )}
      </div>

      {/* 광고 2: 제목과 주제 사이 */}
      <DisplayAd />

      {/* 3단계: 주제 선택 */}
      <div className="scroll-mt-20" id="theme-section">
        {selections.genre && selections.title ? (
          <StepTheme
            genre={selections.genre}
            title={selections.title}
            onThemeSelect={handleThemeSelect}
            onBack={() => setSelections((prev) => ({ ...prev, title: "" }))}
            apiKey={apiKey}
          />
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-zinc-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              주제 선택
            </h3>
            <p className="text-zinc-500">
              {selections.genre
                ? "제목을 먼저 선택해주세요"
                : "장르와 제목을 먼저 선택해주세요"}
            </p>
          </div>
        )}
      </div>

      {/* 광고 3: 주제와 가사 완성 사이 */}
      <DisplayAd />

      {/* 4단계: 가사 생성 */}
      <div className="scroll-mt-20" id="generating-section">
        {isGenerating && !showResult ? (
          <StepGenerating
            selections={selections}
            setLyrics={setLyrics}
            setStep={() => setShowResult(true)}
            setError={setError}
            apiKey={apiKey}
          />
        ) : showResult ? null : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-zinc-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              가사 생성
            </h3>
            <p className="text-zinc-500">
              장르, 제목, 주제를 모두 선택하면 가사가 생성됩니다
            </p>
          </div>
        )}
      </div>

      {/* 5단계: 결과 */}
      <div className="scroll-mt-20" id="result-section">
        {showResult ? (
          <StepResult lyrics={lyrics} onReset={handleReset} error={error} />
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-zinc-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              완성된 가사
            </h3>
            <p className="text-zinc-500">
              생성이 완료되면 여기에 가사가 표시됩니다
            </p>
          </div>
        )}
      </div>

      {/* 다른 서비스 홍보 */}
      <RelatedServices />
    </div>
  );
};

export default MainPage;
