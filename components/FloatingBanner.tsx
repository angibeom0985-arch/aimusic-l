import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const FloatingBanner: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-black bg-opacity-90 py-2"
      style={{ minHeight: isMobile ? "60px" : "100px" }}
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
  );
};

export default FloatingBanner;
