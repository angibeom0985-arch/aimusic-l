import React, { useEffect, useRef } from "react";

const SidebarAds: React.FC = () => {
  const leftAdRef = useRef<HTMLDivElement>(null);
  const rightAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAds = () => {
      try {
        // 왼쪽 광고 초기화
        if (leftAdRef.current) {
          const leftIns = leftAdRef.current.querySelector(".adsbygoogle");
          if (leftIns && !leftIns.getAttribute("data-adsbygoogle-status")) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }

        // 오른쪽 광고 초기화 (약간의 지연)
        setTimeout(() => {
          if (rightAdRef.current) {
            const rightIns = rightAdRef.current.querySelector(".adsbygoogle");
            if (rightIns && !rightIns.getAttribute("data-adsbygoogle-status")) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
          }
        }, 100);
      } catch (error) {
        console.error("SidebarAds error:", error);
      }
    };

    // AdSense 스크립트 로드 대기
    if (window.adsbygoogle) {
      loadAds();
    } else {
      const timer = setTimeout(loadAds, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* 왼쪽 사이드 광고 */}
      <div
        className="hidden lg:block"
        style={{
          position: "fixed",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "160px",
          zIndex: 100,
        }}
      >
        <div ref={leftAdRef}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2686975437928535"
            data-ad-slot="6712949943"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>

      {/* 오른쪽 사이드 광고 */}
      <div
        className="hidden lg:block"
        style={{
          position: "fixed",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "160px",
          zIndex: 100,
        }}
      >
        <div ref={rightAdRef}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2686975437928535"
            data-ad-slot="6712949943"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </>
  );
};

export default SidebarAds;
