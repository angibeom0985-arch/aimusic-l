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
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 ${
        position === "left" ? "left-0" : "right-0"
      } h-full hidden lg:flex items-center justify-center p-2 z-10`}
      style={{ width: "180px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 광고 영역 표시 (개발/테스트용) */}
        <div className="absolute inset-2 bg-gradient-to-b from-zinc-800/50 via-zinc-700/50 to-zinc-800/50 rounded border border-dashed border-zinc-600 flex items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-500 text-xs font-semibold mb-1">📢</p>
            <p className="text-zinc-600 text-[10px]">사이드 광고</p>
            <p className="text-zinc-600 text-[10px]">{position === "left" ? "왼쪽" : "오른쪽"}</p>
          </div>
        </div>
        
        {/* 실제 AdSense 광고 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "160px", position: "relative", zIndex: 10 }}
          data-ad-client="ca-pub-2686975437928535"
          data-ad-slot="6712949943"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default SidebarAd;
