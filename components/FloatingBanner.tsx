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
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm"
      style={{
        width: isMobile ? "320px" : "728px",
        height: isMobile ? "50px" : "90px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot="6106251761"
      />
    </div>
  );
};

export default FloatingBanner;
