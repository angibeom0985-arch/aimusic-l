import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { PROMPT_DATA, GENRE_ICONS } from "../constants";
import { Tag } from "../components/Tag";
import { generateImage, upscaleImage } from "../services/geminiService";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ImageCropper } from "../components/ImageCropper";
import { UploadIcon, CloseIcon } from "../components/icons";
import type { CustomizationCategory } from "../types";
import RelatedServices from "../components/RelatedServices";

interface ThumbnailPageProps {
  apiKey: string;
}

const STORAGE_KEY = "thumbnail_page_state";

const ThumbnailPage: React.FC<ThumbnailPageProps> = ({ apiKey }) => {
  const navigate = useNavigate();

  // localStorage에서 저장된 상태 복원
  const [selectedGenre, setSelectedGenre] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.selectedGenre || Object.keys(PROMPT_DATA)[0];
      } catch (e) {
        return Object.keys(PROMPT_DATA)[0];
      }
    }
    return Object.keys(PROMPT_DATA)[0];
  });

  const [selectedTags, setSelectedTags] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return new Set(parsed.selectedTags || []);
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });

  const [generatedImage, setGeneratedImage] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.generatedImage || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCroppingModalOpen, setIsCroppingModalOpen] =
    useState<boolean>(false);
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedPose, setSelectedPose] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.selectedPose || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [selectedExpression, setSelectedExpression] = useState<string | null>(
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.selectedExpression || null;
        } catch (e) {
          return null;
        }
      }
      return null;
    }
  );

  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.selectedBackground || null;
        } catch (e) {
          return null;
        }
      }
      return null;
    }
  );

  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.selectedOutfit || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.selectedBodyType || null;
        } catch (e) {
          return null;
        }
      }
      return null;
    }
  );

  const [selectedMood, setSelectedMood] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.selectedMood || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [selectedNoise, setSelectedNoise] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.selectedNoise || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [lyricsText, setLyricsText] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.lyricsText || "";
      } catch (e) {
        return "";
      }
    }
    return "";
  });

  const lyricsFileInputRef = useRef<HTMLInputElement>(null);

  // 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    const state = {
      selectedGenre,
      selectedTags: Array.from(selectedTags),
      generatedImage,
      selectedPose,
      selectedExpression,
      selectedBackground,
      selectedOutfit,
      selectedBodyType,
      selectedMood,
      selectedNoise,
      lyricsText,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [
    selectedGenre,
    selectedTags,
    generatedImage,
    selectedPose,
    selectedExpression,
    selectedBackground,
    selectedOutfit,
    selectedBodyType,
    selectedMood,
    selectedNoise,
    lyricsText,
  ]);

  const allTagsInOrder = useMemo(() => {
    return Object.values(PROMPT_DATA)
      .flat()
      .flatMap((subGenre) => subGenre.tags.map((tag) => tag.value));
  }, []);

  const musicPrompt = useMemo(() => {
    return allTagsInOrder
      .filter((tagValue) => selectedTags.has(tagValue))
      .join(", ");
  }, [selectedTags, allTagsInOrder]);

  const CUSTOMIZATION_OPTIONS: Record<string, CustomizationCategory> = useMemo(
    () => ({
      pose: {
        title: "포즈",
        options: [
          { en: "standing", ko: "서서" },
          { en: "sitting", ko: "앉아서" },
          { en: "lying down", ko: "누워서" },
          { en: "walking", ko: "걷는 중" },
          { en: "a close-up shot", ko: "클로즈업" },
        ],
        state: selectedPose,
        setter: setSelectedPose,
      },
      expression: {
        title: "표정",
        options: [
          { en: "smiling", ko: "웃는 표정" },
          { en: "a neutral expression", ko: "무표정" },
          { en: "a sad expression", ko: "슬픈 표정" },
          { en: "a surprised expression", ko: "놀란 표정" },
          { en: "winking", ko: "윙크" },
        ],
        state: selectedExpression,
        setter: setSelectedExpression,
      },
      background: {
        title: "배경",
        options: [
          { en: "in a cozy cafe", ko: "카페" },
          { en: "on a sunny beach", ko: "해변" },
          { en: "on a busy city street at night", ko: "도시 거리" },
          { en: "in a lush green forest", ko: "숲" },
          { en: "in a cozy, dimly lit room", ko: "아늑한 방" },
          { en: "inside a car", ko: "차 안" },
        ],
        state: selectedBackground,
        setter: setSelectedBackground,
      },
      outfit: {
        title: "의상",
        options: [
          { en: "a revealing outfit", ko: "노출 있는 의상" },
          { en: "a one-piece dress", ko: "원피스" },
          { en: "an off-the-shoulder top", ko: "오프숄더" },
          { en: "a casual t-shirt and jeans", ko: "캐주얼" },
          { en: "a formal suit", ko: "정장" },
        ],
        state: selectedOutfit,
        setter: setSelectedOutfit,
      },
      bodyType: {
        title: "몸매",
        options: [
          { en: "a glamorous figure", ko: "글래머" },
          { en: "a slender figure", ko: "슬랜더" },
          { en: "an athletic build", ko: "운동형" },
        ],
        state: selectedBodyType,
        setter: setSelectedBodyType,
      },
      mood: {
        title: "분위기",
        options: [{ en: "a lofi mood", ko: "로파이 무드" }],
        state: selectedMood,
        setter: setSelectedMood,
      },
      noise: {
        title: "노이즈",
        options: [
          { en: "low noise", ko: "Low Noise" },
          { en: "heavy noise", ko: "Heavy Noise" },
        ],
        state: selectedNoise,
        setter: setSelectedNoise,
      },
    }),
    [
      selectedPose,
      selectedExpression,
      selectedBackground,
      selectedOutfit,
      selectedBodyType,
      selectedMood,
      selectedNoise,
    ]
  );

  const customizationPromptText = useMemo(() => {
    const parts = [
      selectedPose && `포즈: ${selectedPose}`,
      selectedExpression && `표정: ${selectedExpression}`,
      selectedBackground && `배경: ${selectedBackground}`,
      selectedOutfit && `의상: ${selectedOutfit}`,
      selectedBodyType && `몸매: ${selectedBodyType}`,
      selectedMood && `분위기: ${selectedMood}`,
      selectedNoise && `노이즈: ${selectedNoise}`,
    ]
      .filter(Boolean)
      .join(", ");
    return parts || "변경할 옵션을 선택해주세요...";
  }, [
    selectedPose,
    selectedExpression,
    selectedBackground,
    selectedOutfit,
    selectedBodyType,
    selectedMood,
    selectedNoise,
  ]);

  useEffect(() => {
    const handleWindowPaste = (event: ClipboardEvent) => {
      if (uploadedImage || isCroppingModalOpen) {
        return;
      }

      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setUploadedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            event.preventDefault();
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handleWindowPaste);

    return () => {
      window.removeEventListener("paste", handleWindowPaste);
    };
  }, [uploadedImage, isCroppingModalOpen]);

  const handleToggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const newSelectedTags = new Set(prev);
      if (newSelectedTags.has(tag)) {
        newSelectedTags.delete(tag);
      } else {
        newSelectedTags.add(tag);
      }
      return newSelectedTags;
    });
  }, []);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null);
    setSelectedPose(null);
    setSelectedExpression(null);
    setSelectedBackground(null);
    setSelectedOutfit(null);
    setSelectedBodyType(null);
    setSelectedMood(null);
    setSelectedNoise(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleLyricsFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setLyricsText(text);
        };
        reader.readAsText(file);
      }
    },
    []
  );

  const handleRemoveLyrics = useCallback(() => {
    setLyricsText("");
    if (lyricsFileInputRef.current) {
      lyricsFileInputRef.current.value = "";
    }
  }, []);

  const handleReset = useCallback(() => {
    if (confirm("모든 작업 내용이 초기화됩니다. 계속하시겠습니까?")) {
      setSelectedGenre(Object.keys(PROMPT_DATA)[0]);
      setSelectedTags(new Set());
      setGeneratedImage(null);
      setUploadedImage(null);
      setSelectedPose(null);
      setSelectedExpression(null);
      setSelectedBackground(null);
      setSelectedOutfit(null);
      setSelectedBodyType(null);
      setSelectedMood(null);
      setSelectedNoise(null);
      setLyricsText("");
      setError(null);
      localStorage.removeItem(STORAGE_KEY);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (lyricsFileInputRef.current) {
        lyricsFileInputRef.current.value = "";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleCustomizationSelect = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<string | null>>,
      value: string,
      currentState: string | null
    ) => {
      setter(currentState === value ? null : value);
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      let imagePrompt = "";

      if (uploadedImage) {
        if (
          !selectedPose &&
          !selectedExpression &&
          !selectedBackground &&
          !selectedOutfit &&
          !selectedBodyType &&
          !selectedMood &&
          !selectedNoise
        ) {
          setError(
            "하나 이상의 사용자 지정 옵션(포즈, 표정, 배경 등)을 선택하십시오."
          );
          setIsLoading(false);
          return;
        }

        let customPrompt = `제공된 이미지를 참조하여 **정확히 동일한 인물**의 새로운 사진을 생성하고, 얼굴 특징과 정체성을 완벽하게 보존하세요. `;

        const descriptions = [];
        if (selectedPose)
          descriptions.push(`인물은 ${selectedPose} 자세를 취하고 있습니다.`);
        if (selectedExpression)
          descriptions.push(`표정은 ${selectedExpression}입니다.`);
        if (selectedBackground)
          descriptions.push(`배경은 ${selectedBackground}입니다.`);
        if (selectedOutfit)
          descriptions.push(`의상은 ${selectedOutfit}입니다.`);
        if (selectedBodyType)
          descriptions.push(`몸매는 ${selectedBodyType}입니다.`);
        if (selectedMood)
          descriptions.push(`이미지는 ${selectedMood} 분위기입니다.`);

        customPrompt += descriptions.join(" ");

        const cameraStyles = [
          "DSLR 카메라 사진",
          "iPhone 카메라로 촬영",
          "부드러운 그레인이 있는 35mm 필름 사진",
          "폴라로이드 사진 스타일",
          "단렌즈가 장착된 미러리스 카메라로 촬영",
        ];
        const randomCameraStyle =
          cameraStyles[Math.floor(Math.random() * cameraStyles.length)];

        const noiseValue = selectedNoise || "low noise";
        let finalStylePrompt = `스타일은 ${
          noiseValue === "low noise" ? "깨끗하고 " : ""
        }${noiseValue} 사진처럼, ${randomCameraStyle}처럼 연출하세요.`;

        if (!selectedMood) {
          finalStylePrompt =
            `이미지는 차분하고 향수를 자극하는 로파이 분위기를 가져야 합니다. ` +
            finalStylePrompt;
        }

        customPrompt += ` ${finalStylePrompt}`;

        imagePrompt = customPrompt;
      } else {
        if (selectedTags.size === 0) {
          setError("생성할 태그를 하나 이상 선택하세요.");
          setIsLoading(false);
          return;
        }
        const cameraStyles = [
          "DSLR 카메라 사진",
          "iPhone 카메라로 촬영",
          "부드러운 그레인이 있는 35mm 필름 사진",
          "폴라로이드 사진 스타일",
          "단렌즈가 장착된 미러리스 카메라로 촬영",
        ];
        const randomCameraStyle =
          cameraStyles[Math.floor(Math.random() * cameraStyles.length)];

        let basePrompt = `설정과 분위기는 다음 음악 키워드에서 영감을 받았습니다: ${musicPrompt}. 이미지는 음악 플레이리스트 커버로 적합해야 합니다.`;

        // 가사가 있으면 가사의 분위기와 내용을 반영
        if (lyricsText.trim()) {
          basePrompt += ` 다음 가사의 감정과 분위기를 시각적으로 표현하세요:\n"${lyricsText.slice(
            0,
            500
          )}"`;
        }

        imagePrompt = `20대 한국 여성의 깨끗하고 노이즈가 적은 사진, ${randomCameraStyle}. 이미지는 차분하고 향수를 자극하는 로파이 분위기로, 조용하고 사색적인 순간을 포착합니다. ${basePrompt}`;
      }

      const imageUrl = await generateImage(imagePrompt, uploadedImage, apiKey);
      setGeneratedImage(imageUrl);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(`이미지 생성에 실패했습니다. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedTags,
    musicPrompt,
    uploadedImage,
    selectedPose,
    selectedExpression,
    selectedBackground,
    selectedOutfit,
    selectedBodyType,
    selectedMood,
    selectedNoise,
    lyricsText,
    apiKey,
  ]);

  const handleDownloadImage = useCallback(() => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "playlist-thumbnail.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 다운로드 성공 메시지 표시
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 2rem;
      border-radius: 1rem;
      z-index: 10000;
      text-align: center;
      font-size: 1.2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `;
    modal.textContent = "다운로드되었습니다.";
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.remove();
    }, 2000);
  }, [generatedImage]);

  const handleCropTo16_9 = useCallback(() => {
    if (!generatedImage) return;
    setIsCroppingModalOpen(true);
  }, [generatedImage]);

  const handleConfirmCrop = (croppedImage: string) => {
    setGeneratedImage(croppedImage);
    setIsCroppingModalOpen(false);
  };

  const handleCancelCrop = () => {
    setIsCroppingModalOpen(false);
  };

  const handleUpscaleImage = useCallback(async () => {
    if (!generatedImage) return;
    setIsUpscaling(true);
    setError(null);
    try {
      const upscaledImageUrl = await upscaleImage(generatedImage, apiKey);
      setGeneratedImage(upscaledImageUrl);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(`이미지 업스케일링 실패: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsUpscaling(false);
    }
  }, [generatedImage, apiKey]);

  const canGenerate =
    !isLoading &&
    !isUpscaling &&
    !isCroppingModalOpen &&
    ((selectedTags.size > 0 && !uploadedImage) ||
      (!!uploadedImage &&
        (!!selectedPose ||
          !!selectedExpression ||
          !!selectedBackground ||
          !!selectedOutfit ||
          !!selectedBodyType ||
          !!selectedMood ||
          !!selectedNoise)));

  if (!apiKey) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">API 키가 필요합니다</h2>
          <p className="text-zinc-400 mb-4">
            홈 화면에서 API 키를 입력해주세요.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isCroppingModalOpen && generatedImage && (
        <ImageCropper
          imageUrl={generatedImage}
          onCrop={handleConfirmCrop}
          onCancel={handleCancelCrop}
        />
      )}

      {/* 페이지 헤더 */}
      <div className="text-center pt-8 pb-4 mb-6">
        <h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4"
          style={{
            textShadow:
              "0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.2)",
          }}
        >
          🎨 AI 음악 썸네일 제작
        </h1>
        <p className="text-zinc-400 text-lg mb-6">
          태그를 선택하고 AI가 생성한 고퀄리티 썸네일을 다운로드하세요
        </p>
      </div>

      {/* 가사 생성 유도 섹션 */}
      <div className="max-w-4xl mx-auto mb-8 p-6 bg-gradient-to-br from-yellow-900/30 via-orange-900/30 to-amber-900/30 rounded-2xl border-2 border-yellow-500/50 shadow-xl backdrop-blur-sm hover:border-yellow-400/70 transition-all duration-300">
        <div className="text-center">
          <div className="text-5xl mb-3">🎵</div>
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">
            아직 가사 생성을 안 했다면?
          </h3>
          <p className="text-zinc-300 mb-4">
            먼저{" "}
            <span className="text-yellow-400 font-semibold">가사를 생성</span>
            하고 오면 가사에 딱 맞는 썸네일을 만들 수 있어요!
          </p>
          <button
            onClick={() => navigate("/lyrics")}
            className="bg-gradient-to-r from-yellow-600 via-orange-500 to-amber-600 hover:from-yellow-500 hover:via-orange-400 hover:to-amber-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 hover:scale-105"
          >
            🎵 가사 먼저 만들러 가기 →
          </button>
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-4">
        <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-8 gap-6">
          <aside className="lg:col-span-3 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-rose-900/40 rounded-xl p-4 border border-purple-500/30 shadow-lg">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              목차
            </h2>
            <ul className="space-y-2">
              {Object.keys(PROMPT_DATA).map((genre, index) => {
                const Icon = GENRE_ICONS[genre];
                const colors = [
                  "from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500",
                  "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
                  "from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500",
                  "from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500",
                  "from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500",
                  "from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500",
                  "from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500",
                  "from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500",
                ];
                const colorClass = colors[index % colors.length];
                return (
                  <li key={genre}>
                    <button
                      onClick={() => setSelectedGenre(genre)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        selectedGenre === genre
                          ? `bg-gradient-to-r ${colorClass} text-white shadow-lg scale-105`
                          : "bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300"
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {genre}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <section className="lg:col-span-5 bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-purple-900/40 rounded-xl p-4 border border-blue-500/30 shadow-lg h-[70vh] overflow-y-auto">
            {selectedGenre && PROMPT_DATA[selectedGenre] ? (
              <div className="space-y-6">
                {PROMPT_DATA[selectedGenre].map((subGenre, idx) => (
                  <div key={subGenre.name}>
                    <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent border-b border-blue-500/50 pb-2">
                      {subGenre.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {subGenre.tags.map((tag) => (
                        <Tag
                          key={tag.value}
                          label={tag.label}
                          isSelected={selectedTags.has(tag.value)}
                          onClick={() => handleToggleTag(tag.value)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                <p>메뉴에서 장르를 선택하여 프롬프트를 확인하세요.</p>
              </div>
            )}
          </section>
        </div>

        <section className="lg:col-span-4 bg-gradient-to-br from-emerald-900/40 via-teal-900/40 to-cyan-900/40 rounded-xl p-4 border border-emerald-500/30 shadow-lg flex flex-col">
          {/* 가사 입력 섹션 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              🎵 가사 첨부 (선택 사항)
            </h2>
            {lyricsText ? (
              <div className="relative">
                <div className="bg-zinc-800 rounded-lg p-3 max-h-32 overflow-y-auto text-sm text-zinc-300 whitespace-pre-wrap border border-zinc-700">
                  {lyricsText}
                </div>
                <button
                  onClick={handleRemoveLyrics}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove lyrics"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <textarea
                  value={lyricsText}
                  onChange={(e) => setLyricsText(e.target.value)}
                  placeholder="가사를 직접 입력하거나 아래 버튼으로 파일을 업로드하세요..."
                  className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={() => lyricsFileInputRef.current?.click()}
                  className="mt-2 w-full py-2 border-2 border-dashed border-emerald-500/50 rounded-lg bg-gradient-to-r from-emerald-900/30 to-teal-900/30 text-emerald-300 hover:from-emerald-800/50 hover:to-teal-800/50 hover:border-emerald-400/70 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-emerald-500/30"
                >
                  📄 가사 파일 업로드 (.txt)
                </button>
                <input
                  type="file"
                  ref={lyricsFileInputRef}
                  onChange={handleLyricsFileUpload}
                  accept=".txt"
                  className="hidden"
                />
              </>
            )}
            <p className="text-xs text-zinc-500 mt-2">
              💡 가사를 첨부하면 가사의 감정과 분위기에 맞는 썸네일을 생성합니다
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              스타일 참조 (선택 사항)
            </h2>
            {uploadedImage ? (
              <div className="relative group rounded-lg overflow-hidden">
                <img
                  src={uploadedImage}
                  alt="Uploaded reference"
                  className="w-full object-cover max-h-40"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={handleRemoveImage}
                    className="bg-red-600 hover:bg-red-500 text-white rounded-full p-2"
                    aria-label="Remove image"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
                >
                  <UploadIcon className="w-8 h-8 mb-1" />
                  <span className="text-sm">
                    비슷한 스타일을 만들려면 이미지를 첨부하세요
                  </span>
                  <span className="text-xs text-zinc-500 mt-1">
                    (또는 클립보드에서 붙여넣기)
                  </span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                />
              </>
            )}
          </div>

          {uploadedImage && (
            <div className="mb-4 space-y-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                이미지 커스터마이징
              </h2>
              {Object.values(CUSTOMIZATION_OPTIONS).map((category, catIdx) => {
                const categoryColors = [
                  "from-pink-500 to-rose-500",
                  "from-purple-500 to-indigo-500",
                  "from-blue-500 to-cyan-500",
                  "from-green-500 to-emerald-500",
                  "from-yellow-500 to-orange-500",
                  "from-red-500 to-pink-500",
                  "from-indigo-500 to-purple-500",
                ];
                const colorClass =
                  categoryColors[catIdx % categoryColors.length];
                return (
                  <div key={category.title}>
                    <h3
                      className={`text-lg font-semibold mb-2 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
                    >
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.options.map((option) => (
                        <button
                          key={option.en}
                          onClick={() =>
                            handleCustomizationSelect(
                              category.setter,
                              option.en,
                              category.state
                            )
                          }
                          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 shadow-md ${
                            category.state === option.en
                              ? `bg-gradient-to-r ${colorClass} text-white shadow-lg scale-105`
                              : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                          }`}
                        >
                          {option.ko}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              이미지 생성
            </h2>
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-rose-600 hover:to-orange-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 mb-4"
            >
              {isLoading ? "⏳ 생성 중..." : "✨ 이미지 생성"}
            </button>
          </div>

          <div className="flex-grow flex flex-col justify-end">
            <div className="flex items-center justify-center bg-black rounded-lg border border-zinc-800 aspect-video">
              {isLoading || isUpscaling ? (
                <LoadingSpinner />
              ) : error ? (
                <p className="text-red-400 text-center p-4">{error}</p>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-zinc-400">
                  <p>이미지가 여기에 표시됩니다</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={handleCropTo16_9}
                disabled={
                  !generatedImage ||
                  isLoading ||
                  isUpscaling ||
                  isCroppingModalOpen
                }
                className="w-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                ✂️ 16:9로 자르기
              </button>
              <button
                onClick={handleUpscaleImage}
                disabled={
                  !generatedImage ||
                  isLoading ||
                  isUpscaling ||
                  isCroppingModalOpen
                }
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105"
              >
                {isUpscaling ? "⏳ 업스케일링..." : "⬆️ 업스케일"}
              </button>
              <button
                onClick={handleDownloadImage}
                disabled={
                  !generatedImage ||
                  isLoading ||
                  isUpscaling ||
                  isCroppingModalOpen
                }
                className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              >
                💾 다운로드
              </button>
            </div>
          </div>

          {/* 가사 생성 유도 섹션 */}
          {generatedImage && (
            <div className="mt-12 p-8 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40 rounded-2xl border-2 border-green-500/50 shadow-2xl backdrop-blur-sm hover:border-green-400/70 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 animate-bounce">🎵</div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  완벽한 썸네일이 완성되었어요! 🎉
                </h3>
                <p className="text-lg text-zinc-300 font-semibold mb-2">
                  이제 감동적인 <span className="text-green-400">가사</span>만
                  있으면 끝!
                </p>
                <p className="text-zinc-400 text-sm md:text-base">
                  ✨ AI가 당신의 썸네일에 어울리는 완벽한 가사를 1초 만에
                  생성해드립니다
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => (window.location.href = "/lyrics")}
                  className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-green-500/50 hover:scale-105 animate-pulse"
                >
                  🎵 지금 바로 가사 만들기 →
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 구분선 */}
      <div className="my-16 border-t-2 border-zinc-800 max-w-7xl mx-auto"></div>

      {/* 다른 서비스 홍보 섹션 - 전체 너비 활용 */}
      <section className="w-full px-4">
        <RelatedServices />
      </section>

      {/* 플로팅 초기화 버튼 */}
      {(selectedTags.size > 0 || generatedImage || lyricsText) && (
        <button
          onClick={handleReset}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-700 hover:via-rose-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 z-50 flex items-center gap-2"
          title="모든 작업 내용 초기화"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          초기화
        </button>
      )}
    </div>
  );
};

export default ThumbnailPage;
