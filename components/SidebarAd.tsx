import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface SidebarAdProps {
  position: "left" | "right";
}

const SidebarAd: React.FC<SidebarAdProps> = ({ position }) => {
  const adRef = React.useRef<HTMLModElement>(null);
  const adLoadedRef = React.useRef(false);

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
            console.error("Sidebar ad error:", err);
          }
        }, 200);

        return () => clearTimeout(timeoutId);
      }
    } catch (err) {
      console.error("Sidebar ad loading error:", err);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 ${
        position === "left" ? "left-0" : "right-0"
      } h-full hidden lg:flex items-center justify-center p-2 z-10`}
      style={{ width: "180px" }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "160px", height: "600px" }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot="6712949943"
        data-ad-format="vertical"
      />
    </div>
  );
};

export default SidebarAd;
