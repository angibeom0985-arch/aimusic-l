import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const DisplayAd: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  return (
    <div className="w-full my-8 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* 광고 영역 표시 (개발/테스트용 - 실제 광고가 로드되면 이 영역을 덮어씁니다) */}
        <div className="min-h-[100px] bg-gradient-to-r from-zinc-800/50 via-zinc-700/50 to-zinc-800/50 rounded-lg border-2 border-dashed border-zinc-600 flex items-center justify-center relative overflow-hidden">
          <div className="text-center z-10">
            <p className="text-zinc-500 text-sm font-semibold">📢 광고 영역</p>
            <p className="text-zinc-600 text-xs mt-1">Google AdSense</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
        </div>
        
        {/* 실제 AdSense 광고 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: "100px" }}
          data-ad-client="ca-pub-2686975437928535"
          data-ad-slot="6106251761"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default DisplayAd;
