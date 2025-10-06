import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { PROMPT_DATA, GENRE_ICONS } from "../constants";
import { Tag } from "../components/Tag";
import { generateImage, upscaleImage } from "../services/geminiService";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ImageCropper } from "../components/ImageCropper";
import { UploadIcon, CloseIcon } from "../components/icons";
import type { CustomizationCategory } from "../types";
import DisplayAd from "../components/DisplayAd";
import RelatedServices from "../components/RelatedServices";

interface ThumbnailPageProps {
  apiKey: string;
}

const ThumbnailPage: React.FC<ThumbnailPageProps> = ({ apiKey }) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(
    Object.keys(PROMPT_DATA)[0]
  );
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCroppingModalOpen, setIsCroppingModalOpen] =
    useState<boolean>(false);
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [selectedExpression, setSelectedExpression] = useState<string | null>(
    null
  );
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedNoise, setSelectedNoise] = useState<string | null>(null);

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
        const basePrompt = `설정과 분위기는 다음 음악 키워드에서 영감을 받았습니다: ${musicPrompt}. 이미지는 음악 플레이리스트 커버로 적합해야 합니다.`;
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
    apiKey,
  ]);

  const handleCopyToClipboard = () => {
    if (!musicPrompt) return;
    navigator.clipboard.writeText(musicPrompt);
  };

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

    // 3초 후 쿠팡 링크 열기
    setTimeout(() => {
      const coupangLinks = [
        "https://link.coupang.com/a/cUVNWY",
        "https://link.coupang.com/a/cUVNXR",
        "https://link.coupang.com/a/cUVNYk",
        "https://link.coupang.com/a/cUVNY1",
        "https://link.coupang.com/a/cUVN47",
      ];
      const randomLink =
        coupangLinks[Math.floor(Math.random() * coupangLinks.length)];
      window.open(randomLink, "_blank");
    }, 3000);
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

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-8 gap-6">
          <aside className="lg:col-span-3 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4 text-white">목차</h2>
            <ul className="space-y-2">
              {Object.keys(PROMPT_DATA).map((genre) => {
                const Icon = GENRE_ICONS[genre];
                return (
                  <li key={genre}>
                    <button
                      onClick={() => setSelectedGenre(genre)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        selectedGenre === genre
                          ? "bg-zinc-800"
                          : "bg-transparent hover:bg-zinc-800"
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

          <section className="lg:col-span-5 bg-zinc-900 rounded-xl p-4 border border-zinc-800 h-[70vh] overflow-y-auto">
            {selectedGenre && PROMPT_DATA[selectedGenre] ? (
              <div className="space-y-6">
                {PROMPT_DATA[selectedGenre].map((subGenre) => (
                  <div key={subGenre.name}>
                    <h3 className="text-lg font-semibold mb-3 text-white border-b border-zinc-700 pb-2">
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

            <DisplayAd />
          </section>
        </div>

        <section className="lg:col-span-4 bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-3 text-white">
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
              <h2 className="text-xl font-bold text-white">
                이미지 커스터마이징
              </h2>
              {Object.values(CUSTOMIZATION_OPTIONS).map((category) => (
                <div key={category.title}>
                  <h3 className="text-lg font-semibold mb-2 text-zinc-300">
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
                            ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                            : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                        }`}
                      >
                        {option.ko}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-4 text-white">
              프롬프트 및 이미지
            </h2>
            <div className="bg-black p-4 rounded-lg min-h-[100px] border border-zinc-800 mb-4">
              {uploadedImage ? (
                <div className="space-y-2">
                  <p className="text-zinc-300 font-mono text-sm">
                    {customizationPromptText}
                  </p>
                  {musicPrompt && (
                    <>
                      <hr className="border-zinc-700/50" />
                      <p className="text-zinc-300 font-mono text-sm">
                        <span className="font-bold text-orange-400">
                          음악 키워드:{" "}
                        </span>{" "}
                        {musicPrompt}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-zinc-300 font-mono">
                  {musicPrompt || "선택한 태그가 여기에 표시됩니다..."}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={handleCopyToClipboard}
                disabled={!musicPrompt}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                📋 프롬프트 복사
              </button>
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isLoading ? "⏳ 생성 중..." : "✨ 이미지 생성"}
              </button>
            </div>
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
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={handleCropTo16_9}
                disabled={
                  !generatedImage ||
                  isLoading ||
                  isUpscaling ||
                  isCroppingModalOpen
                }
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm shadow-md hover:shadow-lg"
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
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
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
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                💾 다운로드
              </button>
            </div>

            <DisplayAd />
          </div>

          {/* 가사 생성 유도 섹션 */}
          {generatedImage && (
            <div className="mt-12 p-6 bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 rounded-xl border-2 border-green-500/30">
              <div className="text-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  🎵 썸네일 완성! 이제 가사를 만들어볼까요?
                </h3>
                <p className="text-zinc-400 text-sm md:text-base">
                  멋진 썸네일에 어울리는 완벽한 가사를 AI로 자동 생성하세요!
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => (window.location.href = "/lyrics")}
                  className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  🎵 가사 생성하러 가기
                </button>
              </div>
            </div>
          )}

          {/* 다른 서비스 홍보 */}
          <div className="mt-12">
            <RelatedServices />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThumbnailPage;
