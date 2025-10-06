import React from "react";
import ContentAd from "../components/ContentAd";

const ApiGuidePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-orange-400">
        Google Gemini API 키 발급 가이드
      </h1>
      <p className="text-zinc-400 mb-6">
        AI 음원 가사 및 썸네일 제작을 사용하기 위해 필요한 Google Gemini API
        키를 발급받는 방법을 단계별로 안내드립니다.
      </p>

      {/* 광고 */}
      <ContentAd />

      {/* 보안 및 비용 안내 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
            🔒 보안 안내
          </h3>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li>• API 키는 브라우저에만 저장됩니다</li>
            <li>• 외부 서버로 전송되지 않습니다</li>
            <li>• 공용 PC에서는 '기억하기' 해제</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center gap-2">
            💰 API 비용 안내
          </h3>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li>• Gemini API 무료 등급 제공</li>
            <li>• 분당 15회 요청 제한</li>
            <li>• 결제나 비용 발생 없음</li>
          </ul>
        </div>
      </div>

      <div className="space-y-8 text-zinc-300">
        {/* 1단계: Google AI Studio 접속 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">1️⃣</span> Google AI Studio 접속
          </h2>
          <img
            src="/api 1.png"
            alt="Google AI Studio 메인 화면"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="mb-3">
            Google AI Studio 웹사이트에 접속합니다. 위 이미지와 같이 Google AI
            Studio의 메인 화면이 표시됩니다.
          </p>
          <p className="mb-3 font-semibold">접속 주소:</p>
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            https://aistudio.google.com
          </a>
          <p className="mt-4 text-blue-300">
            💡 <strong>참고:</strong> Google 계정으로 로그인하면 됩니다. 별도
            계정 생성이 필요하지 않습니다.
          </p>
        </section>

        {/* 2단계: 프로젝트 만들기 1 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">2️⃣</span> 프로젝트 만들기 1
          </h2>
          <img
            src="/api 2.png"
            alt="Get API key 버튼 클릭"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="mb-3">
            위 스크린샷과 같이 왼쪽 사이드바에서{" "}
            <strong className="text-pink-300">"Get API key"</strong> 버튼을
            클릭하여 API 키 생성 페이지로 이동합니다.
          </p>
          <div className="bg-zinc-900/50 rounded-lg p-4 mt-4">
            <p className="mb-2">
              <strong>순서:</strong>
            </p>
            <p className="mb-2">
              ✅ No Cloud Projects Available 클릭하면, 아래 'Create project'가
              나옵니다.
            </p>
            <p className="text-yellow-400">
              ⚠️ Import project: Google Cloud 프로젝트가 있는 경우에만 선택
            </p>
          </div>
        </section>

        {/* 3단계: 프로젝트 만들기 2 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">3️⃣</span> 프로젝트 만들기 2
          </h2>
          <img
            src="/api 3.png"
            alt="Create API key 버튼 클릭"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="text-green-300 font-semibold">
            ✅ '프로젝트 이름'은 본인이 구별하기 쉬운 단어로 작성
          </p>
        </section>

        {/* 4단계: 새 키 생성 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">4️⃣</span> 새 키 생성
          </h2>
          <img
            src="/api 4.png"
            alt="프로젝트 선택 화면"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="text-green-300 font-semibold mb-2">
            ✅ '키 이름' 또한 본인이 구별할 수 있는 단어로 입력
          </p>
          <p className="text-yellow-400">
            ⚠️ '가져온 프로젝트 선택'은 아까 만든 프로젝트 선택
          </p>
        </section>

        {/* 5단계: API 키 생성 완료 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">5️⃣</span> API 키 생성 완료 및 복사
          </h2>
          <img
            src="/api 5.png"
            alt="생성된 API 키 화면"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="mb-4 font-semibold">'키 만들기' 누르면 끝입니다.</p>
          <div className="bg-zinc-900/50 rounded-lg p-4">
            <p className="mb-2">
              <strong>API 키 형태 예시:</strong>
            </p>
            <code className="text-green-400 bg-black/50 px-3 py-1 rounded">
              AIzaSyB1234567890abcdefghijklmnopqrstuvwx
            </code>
          </div>
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4 mt-4">
            <p className="text-red-400">
              ⚠️ <strong>중요:</strong> API 키는 한 번만 표시되므로 반드시
              복사하여 안전한 곳에 저장하세요.
            </p>
          </div>
        </section>

        {/* 6단계: 웹사이트에 API 키 입력 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">6️⃣</span> AI 음원 제작 사이트에 API 키
            입력
          </h2>
          <img
            src="/api 6.png"
            alt="웹사이트에 API 키 입력"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="mb-4">
            API 키가 성공적으로 생성되었습니다! 생성된 API 키를 복사하여 안전한
            곳에 보관합니다.
          </p>
          <p className="mb-4">
            이제 AI 음원 가사 및 썸네일 제작 웹사이트로 돌아가서 발급받은 API
            키를 입력합니다.
          </p>
          <div className="bg-zinc-900/50 rounded-lg p-4">
            <p className="font-semibold mb-2">입력 방법:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>홈 페이지의 'API 키 입력' 필드 찾기</li>
              <li>Ctrl+V로 복사한 API 키 붙여넣기</li>
              <li>'기억하기' 체크 (선택사항)</li>
            </ol>
          </div>
        </section>

        {/* 7단계: 결제 설정 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">7️⃣</span> 결제 설정
          </h2>
          <img
            src="/api 7.png"
            alt="API 키 테스트 화면"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="text-green-300 font-semibold mb-2">
            ✅ '결제 설정'까지 마쳐야, API를 사용할 수 있습니다.
          </p>
          <p className="text-blue-300">
            ❌ '결제 설정'한다고 해서, 바로 결제되는 거 아니니 안심하세요.
          </p>
        </section>

        {/* 8단계: 결제 설정 페이지 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            <span className="text-3xl">8️⃣</span> 결제 설정 페이지
          </h2>
          <img
            src="/api 8.png"
            alt="설정 완료 및 서비스 이용"
            className="w-full rounded-lg border border-zinc-600 my-4 shadow-xl"
          />
          <p className="mb-4">이후 단계는 쉽게 하실 수 있습니다.</p>
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/40 rounded-lg p-6 text-center">
            <p className="text-2xl font-bold text-green-300 mb-4">
              🎉 축하합니다!
            </p>
            <p className="text-lg mb-4">API 키 설정이 모두 완료되었습니다.</p>
            <p className="mb-4">
              이제 AI 음원 가사 및 썸네일 제작의 모든 기능을 사용할 수 있습니다.
            </p>
          </div>
          <div className="mt-6 bg-zinc-900/50 rounded-lg p-4">
            <p className="font-semibold mb-2">이제 사용 가능한 기능들:</p>
            <ul className="space-y-1">
              <li>🎵 AI 가사 생성</li>
              <li>🖼️ 음악 썸네일 제작</li>
              <li>🎨 다양한 스타일의 이미지 생성</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-pink-400 flex items-center gap-2">
            ❓ 자주 묻는 질문 (FAQ)
          </h2>
          <div className="space-y-4">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-purple-300 mb-2">
                Q: API 키가 작동하지 않아요
              </h3>
              <p className="text-zinc-300">
                A: API 키를 정확히 복사했는지 확인하고, 앞뒤 공백이 없는지
                체크해주세요. Google AI Studio에서 해당 프로젝트가 활성화되어
                있는지 확인하세요.
              </p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-purple-300 mb-2">
                Q: 무료로 얼마나 사용할 수 있나요?
              </h3>
              <p className="text-zinc-300">
                A: Google Gemini API는 월 일정량까지 무료로 제공됩니다. 정확한
                한도는 Google AI Studio에서 확인할 수 있습니다.
              </p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-purple-300 mb-2">
                Q: API 키를 잃어버렸어요
              </h3>
              <p className="text-zinc-300">
                A: Google AI Studio에서 새로운 API 키를 생성하거나, 기존 키를
                다시 확인할 수 있습니다. 보안을 위해 이전 키는 비활성화하는 것이
                좋습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 관련 문서 */}
        <section className="bg-zinc-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
            📚 관련 문서
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://ai.google.dev/gemini-api/docs/rate-limits?hl=ko#free-tier"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all"
            >
              <p className="font-semibold text-blue-300 mb-1">
                🔄 Gemini API 속도 제한
              </p>
              <p className="text-sm text-zinc-400">
                무료 등급에서 사용 가능한 API 요청 제한
              </p>
            </a>
            <a
              href="https://ai.google.dev/gemini-api/docs/pricing?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all"
            >
              <p className="font-semibold text-green-300 mb-1">
                💰 Gemini API 요금 안내
              </p>
              <p className="text-sm text-zinc-400">
                API 사용 요금 및 무료/유료 등급 정보
              </p>
            </a>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 via-pink-600 to-orange-400 hover:from-pink-600 hover:via-pink-700 hover:to-orange-500 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-2xl hover:scale-105"
        >
          🏠 메인으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default ApiGuidePage;
