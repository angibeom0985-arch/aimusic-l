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
import {
  generateImage,
  upscaleImage,
  translateLyricsToEnglish,
} from "../services/geminiService";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { UploadIcon, CloseIcon } from "../components/icons";
import type { CustomizationCategory } from "../types";
import RelatedServices from "../components/RelatedServices";
import ContentAd from "../components/ContentAd";

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
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [showUpscaleInput, setShowUpscaleInput] = useState<boolean>(false);
  const [upscaleDirection, setUpscaleDirection] = useState<string>("");
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

  const [customPrompt, setCustomPrompt] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.customPrompt || "";
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
      customPrompt,
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
    customPrompt,
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
          { en: "standing confidently", ko: "당당하게 서서" },
          { en: "sitting comfortably", ko: "편안하게 앉아서" },
          { en: "leaning against a wall", ko: "벽에 기대어" },
          { en: "walking naturally", ko: "자연스럽게 걷는" },
          { en: "a close-up portrait", ko: "클로즈업 초상" },
          { en: "looking over shoulder", ko: "뒤돌아보는" },
          { en: "arms crossed", ko: "팔짱끼고" },
          { en: "hands in pockets", ko: "주머니에 손 넣고" },
        ],
        state: selectedPose,
        setter: setSelectedPose,
      },
      expression: {
        title: "표정",
        options: [
          { en: "smiling warmly", ko: "따뜻한 미소" },
          { en: "a confident expression", ko: "자신감 있는 표정" },
          { en: "a peaceful expression", ko: "평온한 표정" },
          { en: "a thoughtful look", ko: "생각에 잠긴 표정" },
          { en: "a gentle smile", ko: "부드러운 미소" },
          { en: "looking curious", ko: "호기심 어린 표정" },
          { en: "a dreamy expression", ko: "몽환적인 표정" },
          { en: "a focused look", ko: "집중하는 표정" },
        ],
        state: selectedExpression,
        setter: setSelectedExpression,
      },
      background: {
        title: "배경",
        options: [
          { en: "in a modern cafe with plants", ko: "식물이 있는 모던 카페" },
          { en: "on a beautiful mountain peak", ko: "아름다운 산 정상" },
          { en: "in a vibrant city at golden hour", ko: "골든아워 도시" },
          { en: "in a magical forest with sunlight", ko: "햇살 비치는 숲" },
          { en: "in a cozy library with books", ko: "책으로 가득한 도서관" },
          { en: "in a modern minimalist room", ko: "미니멀한 현대적 방" },
          { en: "on a rooftop with city view", ko: "도시 전망 옥상" },
          { en: "in an art gallery", ko: "아트 갤러리" },
          { en: "beside a peaceful lake", ko: "평온한 호수" },
          { en: "in a flower field", ko: "꽃밭" },
        ],
        state: selectedBackground,
        setter: setSelectedBackground,
      },
      outfit: {
        title: "의상",
        options: [
          { en: "a stylish casual outfit", ko: "세련된 캐주얼" },
          { en: "a elegant dress", ko: "우아한 드레스" },
          { en: "a professional blazer", ko: "전문적인 블레이저" },
          { en: "a cozy sweater", ko: "아늑한 스웨터" },
          { en: "a modern business attire", ko: "현대적 비즈니스 룩" },
          { en: "a vintage style outfit", ko: "빈티지 스타일" },
          { en: "a sporty athletic wear", ko: "스포티한 운동복" },
          { en: "a bohemian style dress", ko: "보헤미안 드레스" },
          { en: "a minimalist outfit", ko: "미니멀 의상" },
        ],
        state: selectedOutfit,
        setter: setSelectedOutfit,
      },
      style: {
        title: "스타일",
        options: [
          { en: "natural and authentic", ko: "자연스럽고 진실된" },
          { en: "artistic and creative", ko: "예술적이고 창의적인" },
          { en: "professional and polished", ko: "전문적이고 세련된" },
          { en: "warm and friendly", ko: "따뜻하고 친근한" },
          { en: "elegant and sophisticated", ko: "우아하고 세련된" },
        ],
        state: selectedBodyType,
        setter: setSelectedBodyType,
      },
      lighting: {
        title: "조명",
        options: [
          { en: "soft natural lighting", ko: "부드러운 자연광" },
          { en: "golden hour lighting", ko: "골든아워 조명" },
          { en: "dramatic cinematic lighting", ko: "드라마틱한 영화적 조명" },
          { en: "warm indoor lighting", ko: "따뜻한 실내 조명" },
          { en: "bright daylight", ko: "밝은 낮빛" },
          { en: "moody atmospheric lighting", ko: "무드있는 분위기 조명" },
        ],
        state: selectedMood,
        setter: setSelectedMood,
      },
      quality: {
        title: "품질",
        options: [
          { en: "ultra high definition", ko: "초고해상도" },
          { en: "professional photography quality", ko: "전문 사진 품질" },
          { en: "cinematic quality", ko: "영화적 품질" },
          { en: "magazine cover quality", ko: "잡지 표지 품질" },
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
      selectedBodyType && `스타일: ${selectedBodyType}`,
      selectedMood && `조명: ${selectedMood}`,
      selectedNoise && `품질: ${selectedNoise}`,
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
      if (uploadedImage) {
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
  }, [uploadedImage]);

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
        let generatedPrompt = `Create a new photo inspired by the reference image style. `;

        const descriptions = [];
        if (selectedPose) descriptions.push(`Pose: ${selectedPose}`);
        if (selectedExpression)
          descriptions.push(`Expression: ${selectedExpression}`);
        if (selectedBackground)
          descriptions.push(`Background: ${selectedBackground}`);
        if (selectedOutfit) descriptions.push(`Outfit: ${selectedOutfit}`);
        if (selectedBodyType) descriptions.push(`Style: ${selectedBodyType}`);
        if (selectedMood) descriptions.push(`Lighting: ${selectedMood}`);
        if (selectedNoise) descriptions.push(`Quality: ${selectedNoise}`);

        // 커스터마이징 옵션이 있으면 추가
        if (descriptions.length > 0) {
          generatedPrompt += descriptions.join(", ") + ". ";
        }

        // 사용자 직접 입력 텍스트가 있으면 추가
        if (customPrompt.trim()) {
          generatedPrompt += `${customPrompt.trim()}. `;
        }

        const cameraStyles = [
          "professional photography",
          "natural lighting",
          "cinematic style",
          "clean composition",
          "artistic framing",
        ];
        const randomCameraStyle =
          cameraStyles[Math.floor(Math.random() * cameraStyles.length)];

        let finalStylePrompt = `Shot with ${randomCameraStyle}`;

        if (!selectedMood) {
          finalStylePrompt += `, calm and emotional atmosphere`;
        }

        generatedPrompt += `${finalStylePrompt}. Create a high-quality image suitable for music playlist cover art.`;

        imagePrompt = generatedPrompt;
      } else {
        if (selectedTags.size === 0) {
          setError("생성할 태그를 하나 이상 선택하세요.");
          setIsLoading(false);
          return;
        }

        const cameraStyles = [
          "professional camera",
          "natural lighting",
          "cinematic style",
          "clean composition",
          "artistic framing",
        ];
        const randomCameraStyle =
          cameraStyles[Math.floor(Math.random() * cameraStyles.length)];

        let basePrompt = `Music playlist cover art. Style keywords: ${musicPrompt}`;

        // 가사가 있으면 가사를 영어로 번역해서 분위기와 내용을 반영
        if (lyricsText.trim()) {
          try {
            const translatedLyrics = await translateLyricsToEnglish(
              lyricsText,
              apiKey
            );
            const lyricsPreview = translatedLyrics
              .slice(0, 300)
              .replace(/\n/g, " ");
            basePrompt += `. Mood and atmosphere from lyrics: "${lyricsPreview}"`;
          } catch (translateError) {
            // 번역 실패 시 원본 가사 사용
            const lyricsPreview = lyricsText.slice(0, 300).replace(/\n/g, " ");
            basePrompt += `. Mood from lyrics: "${lyricsPreview}"`;
          }
        }

        imagePrompt = `Portrait photo of a young Korean woman, ${randomCameraStyle}, calm and emotional atmosphere. ${basePrompt}. Create a high-quality, professional image.`;
      }

      console.log("이미지 생성 프롬프트:", imagePrompt);
      const imageUrl = await generateImage(imagePrompt, uploadedImage, apiKey);
      setGeneratedImage(imageUrl);
      setError(null); // 성공 시 에러 초기화
    } catch (err) {
      console.error("이미지 생성 실패:", err);

      let errorMessage = "알 수 없는 오류가 발생했습니다.";

      if (err instanceof Error) {
        errorMessage = err.message;

        // 사용자 친화적인 에러 메시지로 변환
        if (errorMessage.includes("API key")) {
          errorMessage = "API 키가 유효하지 않습니다. 설정을 확인해주세요.";
        } else if (
          errorMessage.includes("안전 필터") ||
          errorMessage.includes("SAFETY")
        ) {
          errorMessage =
            "선택한 스타일 조합이 제한되었습니다. 다른 태그를 선택해주세요.";
        } else if (errorMessage.includes("차단")) {
          errorMessage =
            "콘텐츠가 차단되었습니다. 더 일반적인 스타일을 선택해주세요.";
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("timeout")
        ) {
          errorMessage =
            "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.";
        } else if (
          errorMessage.includes("quota") ||
          errorMessage.includes("limit")
        ) {
          errorMessage =
            "API 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.";
        }
      }

      setError(
        `❌ ${errorMessage}\n\n💡 다른 태그 조합을 시도하거나, 참조 이미지 없이 생성해보세요.`
      );
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

  const showMessageAndOpenCoupang = useCallback((message: string) => {
    // 안내 메시지 표시
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.95);
      color: white;
      padding: 2rem 3rem;
      border-radius: 1rem;
      z-index: 10000;
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.1);
    `;
    modal.textContent = message;
    document.body.appendChild(modal);

    // 1.5초 후 쿠팡 링크 열기 및 메시지 제거 (기존 3초에서 2배 단축)
    setTimeout(() => {
      modal.remove();
      window.open("https://link.coupang.com/a/bZYkzU", "_blank");
    }, 1500);
  }, []);

  const handleDownloadImage = useCallback(() => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "playlist-thumbnail.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showMessageAndOpenCoupang("✅ 다운로드가 완료되었습니다!");
  }, [generatedImage, showMessageAndOpenCoupang]);

  const handleUpscaleImage = useCallback(() => {
    if (!generatedImage) return;
    setShowUpscaleInput(true);
  }, [generatedImage]);

  const handleUpscaleWithDirection = useCallback(async () => {
    if (!generatedImage) return;

    setIsUpscaling(true);
    setError(null);
    setShowUpscaleInput(false);

    // 쿠팡 링크를 새창으로 열기
    window.open("https://link.coupang.com/a/bZYkzU", "_blank");

    try {
      const upscaledImageUrl = await upscaleImage(
        generatedImage,
        apiKey,
        upscaleDirection
      );
      setGeneratedImage(upscaledImageUrl);
      setUpscaleDirection("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(`이미지 업스케일링 실패: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsUpscaling(false);
    }
  }, [generatedImage, apiKey, upscaleDirection]);

  const canGenerate =
    !isLoading && !isUpscaling && (selectedTags.size > 0 || !!uploadedImage);

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
      <div className="w-full mx-auto mb-8 px-4 lg:px-8">
        <div className="p-6 bg-gradient-to-br from-yellow-900/30 via-orange-900/30 to-amber-900/30 rounded-2xl border-2 border-yellow-500/50 shadow-xl backdrop-blur-sm hover:border-yellow-400/70 transition-all duration-300">
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
      </div>

      <main className="w-full max-w-6xl mx-auto px-4 lg:px-6 space-y-6">
        {/* 섹션 1: 목차 */}
        <section className="bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-rose-900/40 rounded-xl p-6 border border-purple-500/30 shadow-lg">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            📚 장르 선택
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            원하는 음악 장르를 클릭하세요. 선택한 장르에 맞는 다양한 스타일
            태그가 아래에 나타납니다.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`p-4 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 ${
                    selectedGenre === genre
                      ? `bg-gradient-to-r ${colorClass} text-white shadow-lg scale-105`
                      : "bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300"
                  }`}
                >
                  {Icon && <Icon className="w-6 h-6" />}
                  <span className="text-sm font-medium">{genre}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 광고 1: 목차 다음 */}
        <ContentAd />

        {/* 섹션 2: 세부주제 */}
        <section className="bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30 shadow-lg">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎨 세부 스타일 선택
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            원하는 스타일 태그를 여러 개 선택하세요. 선택한 태그들을 조합하여
            AI가 썸네일을 생성합니다. (3-5개 추천)
          </p>
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
            <div className="flex items-center justify-center py-12 text-zinc-400">
              <p>위에서 장르를 먼저 선택해주세요.</p>
            </div>
          )}
        </section>

        {/* 광고 2: 세부주제 다음 */}
        <ContentAd />

        {/* 섹션 3: 가사 입력 */}
        <section className="bg-gradient-to-br from-emerald-900/40 via-teal-900/40 to-cyan-900/40 rounded-xl p-6 border border-emerald-500/30 shadow-lg">
          {/* 가사 입력 섹션 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              🎵 가사 첨부 (선택 사항)
            </h2>
            <div className="relative">
              <textarea
                value={lyricsText}
                onChange={(e) => setLyricsText(e.target.value)}
                placeholder="가사를 직접 입력하거나 아래 버튼으로 파일을 업로드하세요...&#10;&#10;💡 Ctrl+A로 전체 선택, Ctrl+C로 복사, Ctrl+V로 붙여넣기, Ctrl+X로 잘라내기가 가능합니다."
                className="w-full h-40 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 text-sm resize-none focus:outline-none focus:border-emerald-500 transition-colors"
                spellCheck={false}
                onCopy={(e) => e.stopPropagation()}
                onCut={(e) => e.stopPropagation()}
                onPaste={(e) => e.stopPropagation()}
                onSelect={(e) => e.stopPropagation()}
              />
              {lyricsText && (
                <button
                  onClick={handleRemoveLyrics}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white rounded-full p-1.5 shadow-lg transition-all hover:scale-110"
                  aria-label="Remove lyrics"
                  title="가사 전체 삭제"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>
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
                  className="w-full object-contain max-h-80 bg-zinc-900"
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

              {/* 사용자 직접 입력 칸 */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  직접 입력
                </h3>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="원하는 스타일이나 특징을 직접 입력하세요 (예: holding a guitar, sunset background, vintage filter)"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-y min-h-[80px]"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  💡 영어로 입력하면 더 정확한 결과를 얻을 수 있습니다
                </p>
              </div>
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
            <div className="flex items-center justify-center bg-black rounded-lg border border-zinc-800 aspect-video min-h-[300px]">
              {isLoading || isUpscaling ? (
                <LoadingSpinner />
              ) : error ? (
                <p className="text-red-400 text-center p-4">{error}</p>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center text-zinc-400">
                  <p>이미지가 여기에 표시됩니다</p>
                  <p className="text-sm text-zinc-500 mt-2">
                    16:9 유튜브 썸네일 비율
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={handleUpscaleImage}
                disabled={!generatedImage || isLoading || isUpscaling}
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105"
              >
                {isUpscaling ? "⏳ 업스케일링..." : "⬆️ 업스케일"}
              </button>

              {/* 업스케일 방향 입력 UI */}
              {showUpscaleInput && (
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mt-2">
                  <label
                    htmlFor="upscaleDirection"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    원하는 방향을 입력하세요 (선택사항):
                  </label>
                  <textarea
                    id="upscaleDirection"
                    value={upscaleDirection}
                    onChange={(e) => setUpscaleDirection(e.target.value)}
                    placeholder="선택사항: 더 밝고 화려하게, 색상을 더 진하게, 배경을 더 선명하게... (입력하지 않아도 업스케일 가능)"
                    className="w-full h-20 px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleUpscaleWithDirection}
                      disabled={isUpscaling}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-400 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    >
                      ✨ 진행
                    </button>
                    <button
                      onClick={() => setShowUpscaleInput(false)}
                      className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleDownloadImage}
                disabled={!generatedImage || isLoading || isUpscaling}
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

        {/* 광고 3: 이미지 생성 섹션 다음 */}
        <ContentAd />
      </main>

      {/* 구분선 */}
      <div className="my-16 border-t-2 border-zinc-800 w-full max-w-6xl mx-auto"></div>

      {/* 다른 서비스 홍보 섹션 */}
      <section className="w-full max-w-6xl mx-auto px-4 lg:px-6">
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
