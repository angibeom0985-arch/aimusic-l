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
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-black bg-opacity-80 py-2 shadow-lg"
      style={{
        minHeight: isMobile ? "60px" : "100px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div>
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: isMobile ? "320px" : "728px",
            height: isMobile ? "50px" : "90px",
          }}
          data-ad-client="ca-pub-2686975437928535"
          data-ad-slot="6106251761"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default FloatingBanner;
