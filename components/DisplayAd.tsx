import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface DisplayAdProps {
  slot?: string;
  className?: string;
}

const DisplayAd: React.FC<DisplayAdProps> = ({
  slot = "6106251761",
  className = "",
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const adLoadedRef = useRef(false);

  useEffect(() => {
    try {
      // 이미 로드된 광고인지 확인
      if (
        adRef.current &&
        !adRef.current.hasAttribute("data-ad-status") &&
        !adLoadedRef.current
      ) {
        adLoadedRef.current = true;

        // 약간의 지연을 두고 광고 로드
        const timeoutId = setTimeout(() => {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.error("Display ad error:", err);
          }
        }, 300);

        return () => clearTimeout(timeoutId);
      }
    } catch (err) {
      console.error("Display ad loading error:", err);
    }
  }, []);

  return (
    <div
      className={`w-full my-6 flex justify-center ${className}`}
      style={{ minHeight: "280px" }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: "250px" }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default DisplayAd;
