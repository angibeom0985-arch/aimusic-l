// AdBlocker 감지
export const detectAdBlocker = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // 테스트용 광고 요소 생성
    const testAd = document.createElement("div");
    testAd.innerHTML = "&nbsp;";
    testAd.className = "adsbox adsbygoogle ad-placement ad-placeholder";
    testAd.style.cssText =
      "width: 1px; height: 1px; position: absolute; left: -10000px;";
    document.body.appendChild(testAd);

    setTimeout(() => {
      const isBlocked =
        testAd.offsetHeight === 0 ||
        getComputedStyle(testAd).display === "none" ||
        getComputedStyle(testAd).visibility === "hidden";

      document.body.removeChild(testAd);
      resolve(isBlocked);
    }, 100);
  });
};

// AdBlocker 경고 모달 표시
export const showAdBlockerWarning = () => {
  const modal = document.createElement("div");
  modal.id = "adblock-modal";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      padding: 3rem;
      border-radius: 1rem;
      max-width: 500px;
      text-align: center;
      color: #1f2937;
    ">
      <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: #dc2626;">
        광고 차단 프로그램이 감지되었습니다
      </h2>
      <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">
        이 웹사이트는 광고 수익으로 운영됩니다.<br>
        광고 차단 프로그램을 비활성화하고<br>
        다시 접속해 주세요.
      </p>
      <button onclick="window.location.reload()" style="
        background: #dc2626;
        color: white;
        padding: 0.75rem 2rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        font-weight: bold;
      ">
        다시 시도
      </button>
    </div>
  `;

  document.body.appendChild(modal);
};

// 초기화
export const initAdBlockerDetection = async () => {
  const isBlocked = await detectAdBlocker();
  if (isBlocked) {
    showAdBlockerWarning();
    return false;
  }
  return true;
};
