import React, { useEffect, useRef, useState } from "react";

const FloatingBanner: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 체크
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (adRef.current) {
          const ins = adRef.current.querySelector(".adsbygoogle");
          if (ins && !ins.getAttribute("data-adsbygoogle-status")) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (error) {
        console.error("FloatingBanner ad error:", error);
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
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        backgroundColor: "transparent",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
        borderRadius: "8px 8px 0 0",
        padding: "8px",
        width: isMobile ? "328px" : "744px",
        height: isMobile ? "58px" : "106px",
      }}
    >
      <div
        ref={adRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: isMobile ? "320px" : "728px",
            height: isMobile ? "50px" : "90px",
          }}
          data-ad-client="ca-pub-2686975437928535"
          data-ad-slot="6106251761"
        />
      </div>
    </div>
  );
};

export default FloatingBanner;
