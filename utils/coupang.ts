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

// 성공 메시지 표시
const showSuccessMessage = (message: string) => {
  const existingModal = document.getElementById("success-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "success-modal";
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(239, 68, 68, 0.95));
    color: white;
    padding: 2rem 3rem;
    border-radius: 1rem;
    z-index: 10000;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.3);
  `;
  modal.textContent = message;
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = "0";
    modal.style.transition = "opacity 0.3s ease";
    setTimeout(() => {
      modal.remove();
    }, 300);
  }, 2700);
};
