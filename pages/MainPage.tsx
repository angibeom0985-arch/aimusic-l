import React, { useState, useCallback, useEffect } from "react";
import { AppStep } from "../types";
import { INITIAL_GENRES } from "../constants";
import StepGenre from "../components/StepGenre";
import StepTitle from "../components/StepTitle";
import StepTheme from "../components/StepTheme";
import StepGenerating from "../components/StepGenerating";
import StepResult from "../components/StepResult";
import ApiKeyManager from "../components/ApiKeyManager";
import DisplayAd from "../components/DisplayAd";

const MainPage: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.GENRE);
  const [apiKey, setApiKey] = useState("");
  const [selections, setSelections] = useState({
    genre: "",
    title: "",
    theme: "",
  });
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleReset = useCallback(() => {
    setStep(AppStep.GENRE);
    setSelections({ genre: "", title: "", theme: "" });
    setLyrics("");
    setError(null);
  }, []);

  const handleGenreSelect = (genre: string) => {
    setSelections((prev) => ({ ...prev, genre }));
    setStep(AppStep.TITLE);
  };

  const handleTitleSelect = (title: string) => {
    setSelections((prev) => ({ ...prev, title }));
    setStep(AppStep.THEME);
  };

  const handleThemeSelect = (theme: string) => {
    setSelections((prev) => ({ ...prev, theme }));
    setStep(AppStep.GENERATING);
  };

  const handleBack = () => {
    if (step === AppStep.TITLE) setStep(AppStep.GENRE);
    if (step === AppStep.THEME) setStep(AppStep.TITLE);
  };

  const renderStep = () => {
    if (!apiKey) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">시작하기</h2>
          <ApiKeyManager onKeySet={setApiKey} />
          <DisplayAd />
          <div className="mt-6 text-zinc-400 text-sm">
            <h3 className="font-semibold mb-2">작사의 신이란?</h3>
            <p>
              AI가 당신만의 노래 가사를 만들어드립니다. 장르, 제목, 테마를
              선택하면 감성적이고 창의적인 가사가 완성됩니다.
            </p>
          </div>
        </div>
      );
    }

    switch (step) {
      case AppStep.GENRE:
        return (
          <StepGenre
            onGenreSelect={handleGenreSelect}
            genres={INITIAL_GENRES}
          />
        );
      case AppStep.TITLE:
        return (
          <StepTitle
            genre={selections.genre}
            onTitleSelect={handleTitleSelect}
            onBack={handleBack}
            apiKey={apiKey}
          />
        );
      case AppStep.THEME:
        return (
          <StepTheme
            genre={selections.genre}
            title={selections.title}
            onThemeSelect={handleThemeSelect}
            onBack={handleBack}
            apiKey={apiKey}
          />
        );
      case AppStep.GENERATING:
        return (
          <StepGenerating
            selections={selections}
            setLyrics={setLyrics}
            setStep={setStep}
            setError={setError}
            apiKey={apiKey}
          />
        );
      case AppStep.RESULT:
        return (
          <StepResult lyrics={lyrics} onReset={handleReset} error={error} />
        );
      default:
        return (
          <StepGenre
            onGenreSelect={handleGenreSelect}
            genres={INITIAL_GENRES}
          />
        );
    }
  };

  return (
    <>
      <DisplayAd />
      <div className="w-full max-w-2xl mx-auto">{renderStep()}</div>
      <DisplayAd />
    </>
  );
};

export default MainPage;
