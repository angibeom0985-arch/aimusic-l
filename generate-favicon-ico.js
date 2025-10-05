const fs = require("fs");
const { createCanvas } = require("canvas");

// ICO 파일 생성 (16x16)
function generateFaviconICO() {
  const canvas = createCanvas(16, 16);
  const ctx = canvas.getContext("2d");

  // 그라데이션 배경
  const gradient = ctx.createLinearGradient(0, 0, 16, 16);
  gradient.addColorStop(0, "#ec4899");
  gradient.addColorStop(1, "#fb923c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 16, 16);

  // 작은 원 (간단한 디자인)
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(8, 8, 5, 0, 2 * Math.PI);
  ctx.fill();

  // PNG로 저장 (브라우저는 .ico 확장자로 PNG도 인식)
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./public/favicon.ico", buffer);
  console.log("✅ favicon.ico 생성 완료");
}

generateFaviconICO();
