# 🎵 AI 음원 가사 및 썸네일 제작

> **유튜브 플레이리스트 채널을 누구나 운영할 수 있게 도와드립니다**

AI를 활용한 **가사 생성**과 **썸네일 생성** 기능을 하나로 통합한 웹 애플리케이션입니다.  
Google Gemini API 키만 있으면 1초 만에 감성적인 가사와 클릭을 부르는 썸네일을 무제한 생성할 수 있습니다.

## ✨ 왜 이 서비스를 사용해야 하나요?

- 🚀 **초고속 콘텐츠 제작**: 가사와 썸네일을 각각 1초 안에 완성
- 🎯 **장르별 맞춤 가사**: 8가지 음악 장르에 최적화된 AI 가사 생성
- 🎨 **고퀄리티 썸네일**: 유튜브에서 클릭률을 높이는 감각적인 디자인
- 💰 **완전 무료**: API 키만 있으면 무제한 사용 가능
- ⚡ **간편한 사용**: 복잡한 설치 없이 웹브라우저만 있으면 OK
- 📈 **채널 성장 가속화**: 매일 수십 개의 콘텐츠를 빠르게 업로드

## 🎯 주요 기능

### 1. 🎤 가사 생성 (AI 음악 가사 1초 완성)

**1초 만에 완성되는 감성 가사**

- ✅ AI를 사용하여 장르, 제목, 테마에 맞는 노래 가사를 자동 생성
- ✅ 다양한 장르 지원: K-발라드, K-인디, K-트로트, 힙합, 댄스, R&B, 락, 시티팝
- ✅ 스크롤 기반의 직관적인 인터페이스로 빠른 작업
- ✅ 원클릭 복사/다운로드 기능
- ✅ 썸네일 제작 페이지로 자동 연결

### 2. 🎨 썸네일 생성 (AI 음악 썸네일 제작)

**클릭을 부르는 고퀄리티 썸네일**

- ✅ 음악 플레이리스트용 썸네일 이미지 AI 생성
- ✅ 다양한 음악 장르, 악기, 분위기, 보컬 스타일 태그 지원
- ✅ 이미지 업로드를 통한 커스터마이징 기능
- ✅ 16:9 비율 자르기 및 업스케일링 기능
- ✅ 가사 제작 페이지로 자동 연결

## 기술 스택

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **AI**: Google Gemini API
- **Routing**: React Router DOM

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 🔑 API 키 설정

### Google Gemini API 키 발급 방법

1. [Google AI Studio](https://aistudio.google.com/app/apikey) 접속
2. Google 계정으로 로그인
3. "Create API Key" 버튼 클릭
4. API 키 복사
5. 웹사이트 메인 페이지에서 API 키 입력

**참고**: API 키는 브라우저의 로컬 스토리지에 안전하게 저장됩니다.

## 📁 프로젝트 구조

```
aimusic/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ApiKeyManager.tsx       # API 키 입력 및 상태 관리
│   ├── DisplayAd.tsx           # 디스플레이 광고
│   ├── FloatingBanner.tsx      # 앵커 광고
│   ├── SidebarAd.tsx           # 사이드바 광고
│   ├── LoadingSpinner.tsx      # 로딩 인디케이터
│   ├── Button.tsx              # 버튼 컴포넌트
│   └── Step*.tsx               # 가사 생성 단계별 컴포넌트
├── pages/               # 페이지 컴포넌트
│   ├── HomePage.tsx            # 메인 페이지
│   ├── LyricsPage.tsx          # 가사 생성 페이지
│   ├── ThumbnailPage.tsx       # 썸네일 생성 페이지
│   ├── ApiGuidePage.tsx        # API 가이드
│   ├── HowToUsePage.tsx        # 사용법 안내
│   └── AdminPage.tsx           # 관리자 페이지
├── services/            # API 서비스
│   └── geminiService.ts        # Gemini API 연동
├── utils/               # 유틸리티 함수
│   ├── contentProtection.ts    # 콘텐츠 보호 (우클릭 방지 등)
│   ├── coupang.ts              # 쿠팡 파트너스 연동
│   └── adBlockDetector.ts      # 광고 차단 감지
├── public/              # 정적 파일 (파비콘, OG 이미지 등)
├── App.tsx              # 메인 앱 컴포넌트 및 라우팅
├── index.tsx            # 진입점
├── constants.ts         # 상수 정의 (장르, 테마 등)
└── types.ts             # TypeScript 타입 정의
```

## 🚀 주요 특징

### 보안 기능

- 🔒 **콘텐츠 보호**: 우클릭, 드래그, 복사 방지 (입력 필드 제외)
- 🛡️ **개발자 도구 감지**: 무단 수정 방지
- 💾 **로컬 저장**: API 키는 로컬 스토리지에만 저장 (서버 전송 없음)

### 수익화 기능

- 💰 **Google AdSense**: 자동 광고, 디스플레이 광고, 앵커 광고
- 🛒 **쿠팡 파트너스**: 복사/다운로드 시 제휴 링크 연동
- 📊 **광고 차단 감지**: 광고 차단기 사용 시 사이트 접근 제한

### UX/UI 최적화

- 🎨 **모던 디자인**: 그라데이션, 네온 효과, 블러 효과
- 📱 **반응형 레이아웃**: 모바일, 태블릿, 데스크톱 최적화
- ⚡ **스크롤 기반 UI**: 단계별 이동 없이 한 페이지에서 모든 작업
- 🔄 **크로스 페이지 네비게이션**: 가사↔썸네일 페이지 간 자연스러운 이동

## 🌐 배포

이 프로젝트는 **Vercel**에 배포되어 있습니다.

- **Production URL**: https://aimusic.money-hotissue.com
- **자동 배포**: main 브랜치에 push하면 자동으로 배포됩니다

## 📄 라이선스

MIT License

## 🤝 기여

이슈와 풀 리퀘스트를 환영합니다!

---

<div align="center">

**🎵 AI 음원 가사 및 썸네일 제작**

유튜브 플레이리스트 채널의 성공을 위한 완벽한 솔루션

[웹사이트 방문하기](https://aimusic.money-hotissue.com) | [API 가이드](https://aimusic.money-hotissue.com/api-guide) | [사용법](https://aimusic.money-hotissue.com/how-to-use)

</div>

## 라이선스

© 2025 AI 음원 가사 및 썸네일 제작. All rights reserved.
