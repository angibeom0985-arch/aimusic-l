import React, { useEffect, useRef } from "react";

interface ContentAdProps {
  className?: string;
  style?: React.CSSProperties;
}

const ContentAd: React.FC<ContentAdProps> = ({
  className = "",
  style = {},
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (adRef.current) {
          const ins = adRef.current.querySelector('.adsbygoogle');
          if (ins && !ins.getAttribute('data-adsbygoogle-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (error) {
        console.error("ContentAd error:", error);
      }
    };

    // AdSense 스크립트 로드 대기
    if (window.adsbygoogle) {
      loadAd();
    } else {
      const timer = setTimeout(loadAd, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`my-6 flex justify-center ${className}`}
      style={style}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot="6106251761"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default ContentAd;
