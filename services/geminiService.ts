import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Configuration
const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
};

const getAI = (apiKey: string) => {
  if (!apiKey) {
    throw new Error("API 키가 필요합니다.");
  }
  return new GoogleGenerativeAI(apiKey);
};

// ==================== Lyrics Generator Functions ====================

export const generateTitles = async (
  genre: string,
  apiKey: string
): Promise<string[]> => {
  try {
    const genAI = getAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        ...generationConfig,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            titles: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.STRING,
              },
            },
          },
          required: ["titles"],
        },
      },
    });

    const result = await model.generateContent(
      `${genre} 장르에 어울리는 창의적이고 감성적인 노래 제목을 8개 생성해주세요. 한국어로 작성해주세요.`
    );

    const response = result.response;
    const text = response.text();
    const parsed = JSON.parse(text);
    return parsed.titles || [];
  } catch (error) {
    console.error("제목 생성 오류:", error);
    throw new Error("AI로부터 제목을 생성하는데 실패했습니다.");
  }
};

export const generateThemes = async (
  genre: string,
  title: string,
  apiKey: string
): Promise<string[]> => {
  try {
    const genAI = getAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        ...generationConfig,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            themes: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.STRING,
              },
            },
          },
          required: ["themes"],
        },
      },
    });

    const result = await model.generateContent(
      `${genre} 장르의 '${title}'라는 제목의 한국 노래에 대한 5가지 가사 테마를 생성해주세요. 간결한 한국어 문구로 작성해주세요.`
    );

    const response = result.response;
    const text = response.text();
    const parsed = JSON.parse(text);
    return parsed.themes || [];
  } catch (error) {
    console.error("테마 생성 오류:", error);
    throw new Error("AI로부터 테마를 생성하는데 실패했습니다.");
  }
};

export const generateLyrics = async (
  genre: string,
  title: string,
  theme: string,
  apiKey: string
): Promise<string> => {
  try {
    console.log("=== 가사 생성 시작 ===");
    console.log("장르:", genre);
    console.log("제목:", title);
    console.log("테마:", theme);
    console.log("API 키 존재 여부:", !!apiKey);
    console.log("API 키 길이:", apiKey?.length);

    if (!apiKey) {
      throw new Error(
        "API 키가 입력되지 않았습니다. 메인 페이지에서 API 키를 입력해주세요."
      );
    }

    const genAI = getAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        ...generationConfig,
      },
    });
    console.log("AI 모델 생성 완료");

    const result = await model.generateContent(
      `당신은 전문 작사가입니다. ${genre} 장르의 한국 노래 가사를 작성해주세요. 노래 제목은 '${title}'이고 주요 테마는 '${theme}'입니다. 가사는 반드시 한국어로 작성해야 합니다. [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Chorus], [Outro]와 같은 마커를 사용하여 노래 구조를 명확하게 표시해주세요. 가사는 감성적이고 창의적이며 지정된 장르와 테마에 잘 맞아야 합니다.`
    );

    console.log("가사 생성 완료");
    const response = result.response;
    const lyrics = response.text();
    console.log("가사 길이:", lyrics.length);
    return lyrics;
  } catch (error: any) {
    console.error("가사 생성 오류:", error);
    console.error("오류 메시지:", error?.message);
    console.error("오류 상세:", error?.stack);

    if (
      error?.message?.includes("API_KEY_INVALID") ||
      error?.message?.includes("API key")
    ) {
      throw new Error(
        "API 키가 유효하지 않습니다. API 키를 다시 확인해주세요."
      );
    }

    throw new Error(
      `가사 생성에 실패했습니다: ${error?.message || "알 수 없는 오류"}`
    );
  }
};

// ==================== Translation Functions ====================

export const translateLyricsToEnglish = async (
  lyrics: string,
  apiKey: string
): Promise<string> => {
  try {
    console.log("=== 가사 영어 번역 시작 ===");

    if (!lyrics.trim()) {
      return "";
    }

    const genAI = getAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
    });

    const result = await model.generateContent(
      `Translate the following Korean song lyrics to English. Keep the emotional meaning and mood of the lyrics. Provide only the translation, without any additional explanation or notes:\n\n${lyrics}`
    );

    const response = result.response;
    const translatedText = response.text();
    console.log("가사 번역 완료");
    return translatedText;
  } catch (error) {
    console.error("가사 번역 오류:", error);
    // 번역 실패 시 원본 가사 반환
    return lyrics;
  }
};

// ==================== Thumbnail Generator Functions ====================

export async function generateImage(
  prompt: string,
  referenceImage: string | null = null,
  apiKey: string,
  retryCount: number = 0
): Promise<string> {
  const MAX_RETRIES = 3;

  try {
    console.log("=== Gemini 2.5 Flash Image 모델 호출 ===");
    console.log("프롬프트:", prompt.substring(0, 200));

    const genAI = getAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image",
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
      },
    });

    const parts: any[] = [];

    // 참조 이미지 추가 (있는 경우)
    if (referenceImage) {
      try {
        const imageParts = referenceImage.split(",");
        if (imageParts.length === 2) {
          const mimeType = imageParts[0].split(":")[1].split(";")[0];
          const data = imageParts[1];
          parts.push({
            inlineData: {
              mimeType,
              data,
            },
          });
          console.log("참조 이미지 추가됨");
        }
      } catch (imgError) {
        console.error("참조 이미지 처리 오류:", imgError);
      }
    }

    // 프롬프트 정제
    const sanitizedPrompt = prompt
      .replace(/노출|선정적|섹시|글래머/gi, "natural")
      .replace(/revealing|sexy|glamorous/gi, "natural");

    // 프롬프트 최적화 - 유튜브 썸네일 비율(16:9)과 텍스트 없는 순수 이미지로 생성
    const optimizedPrompt = `Generate a WIDESCREEN image with 16:9 aspect ratio (width:height = 16:9). DO NOT create square images. The image MUST be horizontal rectangle, much wider than tall. ${sanitizedPrompt}. Create a landscape orientation image that fills the entire 16:9 frame with no empty space, no white borders, no letterboxing. The composition should utilize the full horizontal width. Professional photography, cinematic widescreen framing, shot in landscape mode. CRITICAL: Image must be 16:9 widescreen format, NOT 1:1 square. Pure visual content with absolutely NO TEXT, no words, no titles anywhere in the image.`;

    parts.push({
      text: optimizedPrompt,
    });

    console.log(`이미지 생성 시도 ${retryCount + 1}/${MAX_RETRIES + 1}`);

    const result = await model.generateContent(parts);
    const response = result.response;

    console.log("API 응답 받음");

    // 안전 필터 체크
    if (response.promptFeedback?.blockReason) {
      console.error("안전 필터 차단:", response.promptFeedback.blockReason);
      throw new Error(
        `콘텐츠가 안전 필터에 의해 차단되었습니다. 다른 스타일을 선택해주세요.`
      );
    }

    const candidates = response.candidates;

    if (!candidates || candidates.length === 0) {
      console.error("후보가 없음");

      if (retryCount < MAX_RETRIES) {
        console.log(`재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (retryCount + 1))
        );
        return generateImage(prompt, referenceImage, apiKey, retryCount + 1);
      }

      throw new Error(
        "이미지 생성에 실패했습니다. 다른 스타일을 시도해주세요."
      );
    }

    const candidate = candidates[0];
    console.log("finishReason:", candidate.finishReason);

    // 완료 이유 확인
    if (candidate.finishReason && candidate.finishReason !== "STOP") {
      console.warn(`비정상 종료: ${candidate.finishReason}`);

      if (candidate.finishReason === "SAFETY") {
        throw new Error("안전 설정으로 인해 이미지 생성이 차단되었습니다.");
      }

      if (candidate.finishReason === "RECITATION") {
        throw new Error("저작권 문제로 이미지 생성이 차단되었습니다.");
      }

      if (retryCount < MAX_RETRIES) {
        console.log(`재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (retryCount + 1))
        );
        return generateImage(prompt, referenceImage, apiKey, retryCount + 1);
      }
    }

    const content = candidate.content;
    const contentParts = content?.parts;

    console.log("콘텐츠 파트 개수:", contentParts?.length || 0);

    if (!contentParts || contentParts.length === 0) {
      console.error("콘텐츠 파트가 없음");

      if (retryCount < MAX_RETRIES) {
        console.log(`재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (retryCount + 1))
        );
        return generateImage(prompt, referenceImage, apiKey, retryCount + 1);
      }

      throw new Error("이미지 데이터가 생성되지 않았습니다.");
    }

    // 이미지 데이터 추출
    for (let i = 0; i < contentParts.length; i++) {
      const part = contentParts[i];
      console.log(
        `파트 ${i}:`,
        part.inlineData ? "이미지 데이터 존재" : "텍스트"
      );

      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;

        if (!base64ImageBytes) {
          console.error("이미지 데이터가 비어있음");
          continue;
        }

        console.log("✅ 이미지 생성 성공!");
        console.log("이미지 타입:", mimeType);
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }

    // 이미지가 없을 경우 재시도
    if (retryCount < MAX_RETRIES) {
      console.log(
        `이미지 없음, 재시도 중... (${retryCount + 1}/${MAX_RETRIES})`
      );
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 * (retryCount + 1))
      );
      return generateImage(prompt, referenceImage, apiKey, retryCount + 1);
    }

    throw new Error("응답에 이미지가 포함되지 않았습니다.");
  } catch (error: any) {
    console.error("=== 이미지 생성 오류 ===");
    console.error(error);

    // 재시도 가능한 오류
    if (retryCount < MAX_RETRIES) {
      const isRetryable =
        error.message?.includes("network") ||
        error.message?.includes("timeout") ||
        error.message?.includes("ECONNREFUSED") ||
        error.message?.includes("ETIMEDOUT");

      if (isRetryable) {
        console.log(
          `네트워크 오류, 재시도 중... (${retryCount + 1}/${MAX_RETRIES})`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, 3000 * (retryCount + 1))
        );
        return generateImage(prompt, referenceImage, apiKey, retryCount + 1);
      }
    }

    throw error;
  }
}

export async function upscaleImage(
  base64ImageData: string,
  apiKey: string,
  direction: string = "",
  retryCount: number = 0
): Promise<string> {
  const MAX_RETRIES = 2;

  try {
    console.log("=== Gemini 2.5 Flash Image - 이미지 업스케일 ===");
    console.log("방향:", direction || "기본");

    const genAI = getAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image",
      generationConfig: {
        temperature: 0.4, // 낮은 온도로 일관성 유지
        topP: 0.9,
        topK: 30,
      },
    });

    const parts = base64ImageData.split(",");
    if (parts.length !== 2) {
      throw new Error("잘못된 이미지 형식입니다.");
    }
    const mimeType = parts[0].split(":")[1].split(";")[0];
    const data = parts[1];

    console.log(`업스케일 시도 ${retryCount + 1}/${MAX_RETRIES + 1}`);

    // 방향 지시사항 추가
    let directionText = "";
    if (direction.trim()) {
      directionText = ` Focus on the ${direction} area and enhance it.`;
    }

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType,
          data: data,
        },
      },
      {
        text: `Upscale this image to higher resolution (1280x720, 16:9 aspect ratio). Enhance details and sharpness while maintaining the original composition and colors.${directionText} Create a professional quality image suitable for YouTube thumbnail. NO TEXT OR WATERMARKS. The image must be generated.`,
      },
    ]);

    const response = result.response;

    // 안전 필터 체크
    if (response.promptFeedback?.blockReason) {
      throw new Error(
        `업스케일이 차단되었습니다: ${response.promptFeedback.blockReason}`
      );
    }

    const candidates = response.candidates;

    if (!candidates || candidates.length === 0) {
      console.error("업스케일 응답에 후보가 없음:", response);

      // 재시도
      if (retryCount < MAX_RETRIES) {
        console.log(`재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1500 * (retryCount + 1))
        );
        return upscaleImage(base64ImageData, apiKey, direction, retryCount + 1);
      }

      throw new Error("업스케일에 실패했습니다. 다시 시도해주세요.");
    }

    const candidate = candidates[0];

    // 완료 이유 확인
    if (candidate.finishReason && candidate.finishReason !== "STOP") {
      console.warn(`비정상 종료: ${candidate.finishReason}`);

      if (retryCount < MAX_RETRIES) {
        console.log(`재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1500 * (retryCount + 1))
        );
        return upscaleImage(base64ImageData, apiKey, direction, retryCount + 1);
      }
    }

    const content = candidate.content;
    const responseParts = content?.parts;

    if (!responseParts || responseParts.length === 0) {
      console.error("업스케일 콘텐츠 파트가 없음:", content);

      // 재시도
      if (retryCount < MAX_RETRIES) {
        console.log(`재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1500 * (retryCount + 1))
        );
        return upscaleImage(base64ImageData, apiKey, direction, retryCount + 1);
      }

      throw new Error("업스케일된 이미지 데이터가 없습니다.");
    }

    // 이미지 데이터 추출
    for (const part of responseParts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const responseMimeType = part.inlineData.mimeType;

        if (!base64ImageBytes) {
          console.error("업스케일 이미지 데이터가 비어있음");
          continue;
        }

        console.log("✅ 업스케일 성공!");
        return `data:${responseMimeType};base64,${base64ImageBytes}`;
      }
    }

    // 이미지가 없을 경우 재시도
    if (retryCount < MAX_RETRIES) {
      console.log(
        `이미지 없음, 재시도 중... (${retryCount + 1}/${MAX_RETRIES})`
      );
      await new Promise((resolve) =>
        setTimeout(resolve, 1500 * (retryCount + 1))
      );
      return upscaleImage(base64ImageData, apiKey, direction, retryCount + 1);
    }

    throw new Error(
      "업스케일된 이미지를 생성하지 못했습니다. 다시 시도해주세요."
    );
  } catch (error) {
    console.error("업스케일 오류:", error);

    // 재시도 가능한 오류인 경우
    if (error instanceof Error) {
      const isRetryable =
        error.message.includes("network") ||
        error.message.includes("timeout") ||
        error.message.includes("ECONNREFUSED");

      if (isRetryable && retryCount < MAX_RETRIES) {
        console.log(
          `네트워크 오류, 재시도 중... (${retryCount + 1}/${MAX_RETRIES})`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (retryCount + 1))
        );
        return upscaleImage(base64ImageData, apiKey, direction, retryCount + 1);
      }

      throw error;
    }

    throw new Error("업스케일 중 예상치 못한 오류가 발생했습니다.");
  }
}
