# AI 음원 가사 및 썸네일 제작

AI를 활용한 **가사 생성**과 **썸네일 생성** 기능을 하나로 통합한 웹 애플리케이션입니다.

## 주요 기능

### 1. 가사 생성 (작사의 신)

- AI를 사용하여 장르, 제목, 테마에 맞는 노래 가사를 자동 생성
- 다양한 장르 지원: K-발라드, K-인디, K-트로트, 힙합, 댄스, R&B, 락, 시티팝
- 단계별 선택을 통한 직관적인 인터페이스

### 2. 썸네일 생성 (플리 채널 썸넬 제작)

- 음악 플레이리스트용 썸네일 이미지 AI 생성
- 다양한 음악 장르, 악기, 분위기, 보컬 스타일 태그 지원
- 이미지 업로드를 통한 커스터마이징 기능
- 16:9 비율 자르기 및 업스케일링 기능

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

## 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```
GEMINI_API_KEY=your_api_key_here
```

## 프로젝트 구조

```
aimusic-integrated/
├── components/     # 재사용 가능한 컴포넌트
├── pages/          # 페이지 컴포넌트
├── services/       # API 서비스
├── utils/          # 유틸리티 함수
├── public/         # 정적 파일
├── App.tsx         # 메인 앱 컴포넌트
├── index.tsx       # 진입점
└── constants.ts    # 상수 정의
```

## 라이선스

© 2025 AI 음원 가사 및 썸네일 제작. All rights reserved.
