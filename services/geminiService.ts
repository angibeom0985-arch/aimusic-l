import { GoogleGenAI, Type, Modality } from "@google/genai";

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
  return new GoogleGenAI({ apiKey });
};

// ==================== Lyrics Generator Functions ====================

export const generateTitles = async (
  genre: string,
  apiKey: string
): Promise<string[]> => {
  try {
    const ai = getAI(apiKey);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${genre} 장르에 어울리는 창의적이고 감성적인 노래 제목을 8개 생성해주세요. 한국어로 작성해주세요.`,
      config: {
        ...generationConfig,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "한국어 노래 제목",
              },
            },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.titles || [];
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
    const ai = getAI(apiKey);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${genre} 장르의 '${title}'라는 제목의 한국 노래에 대한 5가지 가사 테마를 생성해주세요. 간결한 한국어 문구로 작성해주세요.`,
      config: {
        ...generationConfig,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themes: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "한국어 가사 테마",
              },
            },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.themes || [];
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
      throw new Error("API 키가 입력되지 않았습니다. 메인 페이지에서 API 키를 입력해주세요.");
    }

    const ai = getAI(apiKey);
    console.log("AI 인스턴스 생성 완료");
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `당신은 전문 작사가입니다. ${genre} 장르의 한국 노래 가사를 작성해주세요. 노래 제목은 '${title}'이고 주요 테마는 '${theme}'입니다. 가사는 반드시 한국어로 작성해야 합니다. [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Chorus], [Outro]와 같은 마커를 사용하여 노래 구조를 명확하게 표시해주세요. 가사는 감성적이고 창의적이며 지정된 장르와 테마에 잘 맞아야 합니다.`,
      config: {
        ...generationConfig,
      },
    });

    console.log("가사 생성 완료");
    const lyrics = response.text.trim();
    console.log("가사 길이:", lyrics.length);
    return lyrics;
  } catch (error: any) {
    console.error("가사 생성 오류:", error);
    console.error("오류 메시지:", error?.message);
    console.error("오류 상세:", error?.stack);
    
    if (error?.message?.includes("API_KEY_INVALID") || error?.message?.includes("API key")) {
      throw new Error("API 키가 유효하지 않습니다. API 키를 다시 확인해주세요.");
    }
    
    throw new Error(`가사 생성에 실패했습니다: ${error?.message || "알 수 없는 오류"}`);
  }
};

// ==================== Thumbnail Generator Functions ====================

export async function generateImage(prompt: string, referenceImage: string | null = null, apiKey: string): Promise<string> {
  try {
    const ai = getAI(apiKey);
    const contentParts: ({ text: string } | { inlineData: { mimeType: string; data: string; } })[] = [];

    if (referenceImage) {
      const imageParts = referenceImage.split(',');
      if (imageParts.length !== 2) {
        throw new Error("Invalid base64 image data format for reference image");
      }
      const mimeType = imageParts[0].split(':')[1].split(';')[0];
      const data = imageParts[1];
      contentParts.push({
        inlineData: {
          mimeType,
          data,
        },
      });
    }

    contentParts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: contentParts,
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) {
      console.error("Invalid response from Gemini API:", JSON.stringify(response, null, 2));
      throw new Error("No content was generated. The response may have been blocked due to safety settings.");
    }

    for (const part of parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("No image was generated in the response parts.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unexpected error occurred during image generation.');
  }
}

export async function upscaleImage(base64ImageData: string, apiKey: string): Promise<string> {
  try {
    const ai = getAI(apiKey);
    const parts = base64ImageData.split(',');
    if (parts.length !== 2) {
      throw new Error("Invalid base64 image data format");
    }
    const mimeType = parts[0].split(':')[1].split(';')[0];
    const data = parts[1];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: data,
            },
          },
          {
            text: '이 이미지를 초고해상도 4K 걸작으로 변환하세요. 모든 디테일, 질감, 조명을 극적으로 향상시켜 초현실적이고 전문적인 사진 품질을 달성하세요. 아티팩트를 만들지 않고 모든 가장자리를 선명하게 만드세요. 최종 결과는 고급 DSLR 카메라로 촬영한 것처럼 믿을 수 없을 정도로 선명하고 상세해야 합니다. 원본 구성, 피사체 또는 색상 팔레트를 변경하지 마세요.',
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const responseParts = response?.candidates?.[0]?.content?.parts;

    if (!responseParts) {
      console.error("Invalid response from Gemini API during upscale:", JSON.stringify(response, null, 2));
      throw new Error("No content was generated for upscaling. The response may have been blocked.");
    }

    for (const part of responseParts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const responseMimeType = part.inlineData.mimeType;
        return `data:${responseMimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("No upscaled image was generated in the response parts.");

  } catch (error) {
    console.error("Error upscaling image with Gemini:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unexpected error occurred during image upscaling.');
  }
}
