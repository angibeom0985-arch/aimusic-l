import React, { useEffect, useState } from "react";

const AdBlockDetector: React.FC = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    const detectAdBlock = async () => {
      try {
        // AdSense 스크립트 로드 확인
        const adsenseScript = document.querySelector(
          'script[src*="adsbygoogle.js"]'
        );

        if (adsenseScript) {
          // AdSense 객체 확인
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (
            typeof window.adsbygoogle === "undefined" ||
            window.adsbygoogle.loaded === false
          ) {
            setAdBlockDetected(true);
            return;
          }
        }

        // 추가 감지: 가짜 광고 요소 생성
        const testAd = document.createElement("div");
        testAd.innerHTML = "&nbsp;";
        testAd.className = "adsbox ad-placement adsbygoogle";
        testAd.style.cssText =
          "position:absolute;top:-10px;left:-10px;width:1px;height:1px";
        document.body.appendChild(testAd);

        setTimeout(() => {
          if (
            testAd.offsetHeight === 0 ||
            getComputedStyle(testAd).display === "none" ||
            getComputedStyle(testAd).visibility === "hidden"
          ) {
            setAdBlockDetected(true);
          }
          document.body.removeChild(testAd);
        }, 100);
      } catch (error) {
        console.error("AdBlock detection error:", error);
        setAdBlockDetected(true);
      }
    };

    detectAdBlock();
  }, []);

  if (!adBlockDetected) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "500px",
          textAlign: "center",
          border: "2px solid #333",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>🚫</div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#ffffff",
          }}
        >
          광고 차단 프로그램 감지
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#cccccc",
            marginBottom: "24px",
          }}
        >
          이 웹사이트는 무료로 제공되며, 광고 수익으로 운영됩니다.
          <br />
          <br />
          <strong style={{ color: "#ffffff" }}>
            광고 차단 프로그램(AdBlock)을 비활성화
          </strong>
          한 후<br />
          페이지를 새로고침해 주세요.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#3b82f6")
          }
        >
          새로고침
        </button>
        <p
          style={{
            fontSize: "14px",
            color: "#888888",
            marginTop: "24px",
          }}
        >
          광고 차단을 해제하는 방법을 모르시나요?
          <br />
          브라우저의 확장 프로그램 메뉴에서 AdBlock을 찾아 비활성화하세요.
        </p>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export default AdBlockDetector;
