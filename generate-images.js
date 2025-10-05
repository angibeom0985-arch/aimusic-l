const fs = require('fs');
const { createCanvas } = require('canvas');

// OG 이미지 생성 (1200x630)
function generateOGImage() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // 그라데이션 배경
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#ec4899'); // pink-500
  gradient.addColorStop(1, '#fb923c'); // orange-400
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  // 반투명 오버레이
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, 1200, 630);

  // 제목
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI 음원 가사 및', 600, 250);
  ctx.fillText('썸네일 제작', 600, 350);

  // 부제목
  ctx.font = '40px Arial, sans-serif';
  ctx.fillText('무료 AI 작사 & 이미지 생성 도구', 600, 450);

  // 아이콘 (간단한 음표와 이미지 표시)
  ctx.font = '100px Arial';
  ctx.fillText('🎵 🖼️', 600, 550);

  // 파일 저장
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./public/og-image.png', buffer);
  console.log('✅ OG 이미지 생성 완료: public/og-image.png');
}

// 파비콘 생성 (32x32)
function generateFavicon32() {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext('2d');

  // 그라데이션 배경
  const gradient = ctx.createLinearGradient(0, 0, 32, 32);
  gradient.addColorStop(0, '#ec4899');
  gradient.addColorStop(1, '#fb923c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  // 음표 이모지
  ctx.font = '20px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🎵', 16, 16);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./public/favicon-32x32.png', buffer);
  console.log('✅ Favicon 32x32 생성 완료');
}

// 파비콘 생성 (16x16)
function generateFavicon16() {
  const canvas = createCanvas(16, 16);
  const ctx = canvas.getContext('2d');

  // 그라데이션 배경
  const gradient = ctx.createLinearGradient(0, 0, 16, 16);
  gradient.addColorStop(0, '#ec4899');
  gradient.addColorStop(1, '#fb923c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 16, 16);

  // 작은 원
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(8, 8, 6, 0, 2 * Math.PI);
  ctx.fill();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./public/favicon-16x16.png', buffer);
  console.log('✅ Favicon 16x16 생성 완료');
}

// Apple Touch Icon 생성 (180x180)
function generateAppleTouchIcon() {
  const canvas = createCanvas(180, 180);
  const ctx = canvas.getContext('2d');

  // 그라데이션 배경
  const gradient = ctx.createLinearGradient(0, 0, 180, 180);
  gradient.addColorStop(0, '#ec4899');
  gradient.addColorStop(1, '#fb923c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 180, 180);

  // 음표 이모지
  ctx.font = 'bold 100px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🎵', 90, 90);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./public/apple-touch-icon.png', buffer);
  console.log('✅ Apple Touch Icon 생성 완료');
}

// 실행
console.log('🎨 이미지 생성 시작...\n');
generateOGImage();
generateFavicon32();
generateFavicon16();
generateAppleTouchIcon();
console.log('\n✨ 모든 이미지 생성 완료!');
