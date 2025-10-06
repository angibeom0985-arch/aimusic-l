import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const FloatingBanner: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 시 항상 표시
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-black/90 py-2 shadow-lg backdrop-blur-sm"
      style={{
        minHeight: isMobile ? "60px" : "100px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* 광고 영역 표시 (개발/테스트용) */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-zinc-800/50 via-zinc-700/50 to-zinc-800/50 rounded border border-dashed border-zinc-600 flex items-center justify-center"
          style={{
            width: isMobile ? "320px" : "728px",
            height: isMobile ? "50px" : "90px",
          }}
        >
          <p className="text-zinc-500 text-xs font-semibold">📢 하단 고정 광고</p>
        </div>
        
        {/* 실제 AdSense 광고 */}
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: isMobile ? "320px" : "728px",
            height: isMobile ? "50px" : "90px",
            position: "relative",
            zIndex: 10,
          }}
          data-ad-client="ca-pub-2686975437928535"
          data-ad-slot="6106251761"
        />
      </div>
    </div>
  );
};

export default FloatingBanner;
