import React from "react";
import DisplayAd from "../components/DisplayAd";

const ApiGuidePage: React.FC = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gemini API 키 발급 방법</h1>

      <DisplayAd />

      <div className="space-y-6 text-zinc-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            1. Google AI Studio 접속
          </h2>
          <p className="mb-3">
            아래 링크를 클릭하여 Google AI Studio에 접속합니다.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 underline"
          >
            https://aistudio.google.com/app/apikey
          </a>
        </section>

        <DisplayAd />

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            2. API 키 생성
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">2-1. Get API key 버튼 클릭</h3>
              <img
                src="/api 1.png"
                alt="API 키 생성 1단계"
                className="w-full rounded-lg border border-zinc-700 my-2"
              />
              <p className="text-sm text-zinc-400">
                Google AI Studio 페이지 상단의 "Get API key" 버튼을 클릭합니다.
              </p>
            </div>

            <DisplayAd />

            <div>
              <h3 className="font-semibold mb-2">2-2. Create API key 선택</h3>
              <img
                src="/api 2.png"
                alt="API 키 생성 2단계"
                className="w-full rounded-lg border border-zinc-700 my-2"
              />
              <p className="text-sm text-zinc-400">
                "Create API key in new project"를 클릭합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2-3. API 키 복사</h3>
              <img
                src="/api 3.png"
                alt="API 키 생성 3단계"
                className="w-full rounded-lg border border-zinc-700 my-2"
              />
              <p className="text-sm text-zinc-400">
                생성된 API 키를 복사합니다. 이 키를 절대 다른 사람과 공유하지
                마세요!
              </p>
            </div>
          </div>
        </section>

        <DisplayAd />

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            3. 웹사이트에 API 키 입력
          </h2>
          <p className="mb-3">
            복사한 API 키를 메인 페이지의 API 키 입력란에 붙여넣고 "기억하기"를
            체크하면 다음부터 자동으로 입력됩니다.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
            <p className="text-yellow-400">
              ⚠️ <strong>주의사항:</strong> API 키는 브라우저의 로컬
              스토리지에만 저장되며, 서버로 전송되지 않습니다. 하지만 공용
              컴퓨터에서는 "기억하기" 기능을 사용하지 마세요.
            </p>
          </div>
        </section>

        <DisplayAd />

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            문제 해결
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">Q. API 키가 작동하지 않아요</h3>
              <p className="text-sm text-zinc-400">
                A. API 키를 다시 확인하거나, Google AI Studio에서 새로운 키를
                발급받아 보세요.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Q. 무료인가요?</h3>
              <p className="text-sm text-zinc-400">
                A. Gemini API는 무료 할당량이 제공됩니다. 자세한 내용은 Google
                AI Studio에서 확인하세요.
              </p>
            </div>
          </div>
        </section>
      </div>

      <DisplayAd />

      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          메인으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default ApiGuidePage;
