import { COUPANG_LINKS } from "../constants";

// 랜덤 쿠팡 링크 반환
export const getRandomCoupangLink = (): string => {
  const randomIndex = Math.floor(Math.random() * COUPANG_LINKS.length);
  return COUPANG_LINKS[randomIndex];
};

// 복사/다운로드 후 쿠팡 링크 열기
export const handleCopyDownload = (
  content: string,
  type: "copy" | "download" = "copy"
) => {
  if (type === "copy") {
    // 클립보드에 복사
    navigator.clipboard
      .writeText(content)
      .then(() => {
        // 성공 메시지 표시
        showSuccessMessage("📋 복사되었습니다.");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        showSuccessMessage("❌ 복사에 실패했습니다.");
      });
  } else {
    // 다운로드 처리
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "가사.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccessMessage("💾 다운로드되었습니다.");
  }

  // 3초 후 쿠팡 링크 열기
  setTimeout(() => {
    const coupangLink = getRandomCoupangLink();
    window.open(coupangLink, "_blank");
  }, 3000);
};

// 성공 메시지를 새창으로 표시
const showSuccessMessage = (message: string) => {
  // 새창으로 메시지 표시
  const messageWindow = window.open(
    "",
    "successMessage",
    "width=400,height=300,left=" +
      (screen.width / 2 - 200) +
      ",top=" +
      (screen.height / 2 - 150)
  );

  if (messageWindow) {
    messageWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>알림</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #ec4899, #ef4444);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
          }
          .message {
            text-align: center;
            color: white;
            font-size: 2rem;
            font-weight: 700;
            text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            padding: 2rem;
            animation: pulse 1s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .countdown {
            margin-top: 1rem;
            font-size: 0.875rem;
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="message">
          ${message}
          <div class="countdown" id="countdown">3초 후 닫힙니다...</div>
        </div>
        <script>
          let count = 3;
          const countdownEl = document.getElementById('countdown');
          const interval = setInterval(() => {
            count--;
            if (count > 0) {
              countdownEl.textContent = count + '초 후 닫힙니다...';
            } else {
              clearInterval(interval);
              window.close();
            }
          }, 1000);
        </script>
      </body>
      </html>
    `);
    messageWindow.document.close();
  }
};
