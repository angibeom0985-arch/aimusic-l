import React, { useEffect, useRef } from "react";

interface ContentAdProps {
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const ContentAd: React.FC<ContentAdProps> = ({
  className = "",
  style = {},
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);

  useEffect(() => {
    // 광고가 이미 초기화되었으면 스킵
    if (adInitialized.current) return;

    const initAd = () => {
      try {
        if (typeof window !== "undefined" && adRef.current) {
          const ins = adRef.current.querySelector("ins.adsbygoogle");
          
          if (ins && !ins.getAttribute("data-adsbygoogle-status")) {
            // adsbygoogle 배열 초기화 및 광고 푸시
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adInitialized.current = true;
            console.log("✅ ContentAd: 광고 초기화 완료");
          }
        }
      } catch (error) {
        console.error("❌ ContentAd 초기화 오류:", error);
      }
    };

    // 즉시 실행 + 약간의 지연 후 재시도 (안전장치)
    initAd();
    const timeoutId = setTimeout(initAd, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={adRef}
      className={`my-8 w-full flex justify-center items-center ${className}`}
      style={{ minHeight: "280px", ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: "block",
          width: "100%",
          minHeight: "280px"
        }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot="6106251761"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default ContentAd;
