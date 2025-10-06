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

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.hasAttribute("data-ad-status")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  return (
    <div
      className={`w-full my-4 flex justify-center min-h-[100px] ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100px" }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default DisplayAd;
