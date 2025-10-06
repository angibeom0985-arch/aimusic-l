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
        alert("📋 복사되었습니다.");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        alert("❌ 복사에 실패했습니다.");
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
    alert("💾 다운로드되었습니다.");
  }

  // 3초 후 쿠팡 링크로 이동
  setTimeout(() => {
    const coupangLink = getRandomCoupangLink();
    window.location.href = coupangLink;
  }, 3000);
};
