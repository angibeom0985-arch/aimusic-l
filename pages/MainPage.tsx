import React, { useState, useCallback } from "react";
import { INITIAL_GENRES } from "../constants";
import StepGenre from "../components/StepGenre";
import StepTitle from "../components/StepTitle";
import StepTheme from "../components/StepTheme";
import StepGenerating from "../components/StepGenerating";
import StepResult from "../components/StepResult";
import DisplayAd from "../components/DisplayAd";

interface MainPageProps {
  apiKey: string;
}

const MainPage: React.FC<MainPageProps> = ({ apiKey }) => {
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <DisplayAd />

      {/* 1단계: 장르 선택 */}
      <div className="scroll-mt-20" id="genre-section">
        <StepGenre onGenreSelect={handleGenreSelect} genres={INITIAL_GENRES} />
      </div>

      {/* 2단계: 제목 선택 (장르가 선택되면 표시) */}
      {selections.genre && (
        <>
          <DisplayAd />
          <div className="scroll-mt-20" id="title-section">
            <StepTitle
              genre={selections.genre}
              onTitleSelect={handleTitleSelect}
              onBack={() => setSelections((prev) => ({ ...prev, genre: "" }))}
              apiKey={apiKey}
            />
          </div>
        </>
      )}

      {/* 3단계: 주제 선택 (제목이 선택되면 표시) */}
      {selections.genre && selections.title && (
        <>
          <DisplayAd />
          <div className="scroll-mt-20" id="theme-section">
            <StepTheme
              genre={selections.genre}
              title={selections.title}
              onThemeSelect={handleThemeSelect}
              onBack={() => setSelections((prev) => ({ ...prev, title: "" }))}
              apiKey={apiKey}
            />
          </div>
        </>
      )}

      {/* 4단계: 가사 생성 중 (주제가 선택되면 표시) */}
      {isGenerating && !showResult && (
        <>
          <DisplayAd />
          <div className="scroll-mt-20" id="generating-section">
            <StepGenerating
              selections={selections}
              setLyrics={setLyrics}
              setStep={() => setShowResult(true)}
              setError={setError}
              apiKey={apiKey}
            />
          </div>
        </>
      )}

      {/* 5단계: 결과 표시 */}
      {showResult && (
        <>
          <DisplayAd />
          <div className="scroll-mt-20" id="result-section">
            <StepResult lyrics={lyrics} onReset={handleReset} error={error} />
          </div>
        </>
      )}

      <DisplayAd />
    </div>
  );
};

export default MainPage;
