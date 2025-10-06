import React from "react";
import ContentAd from "../components/ContentAd";

const HowToUsePage: React.FC = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">작사의 신 사용법</h1>

      {/* 광고 */}
      <ContentAd />

      <div className="space-y-6 text-zinc-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            1. API 키 준비
          </h2>
          <p className="mb-3">
            작사의 신을 사용하려면 Gemini API 키가 필요합니다.
          </p>
          <a
            href="/api-guide"
            target="_blank"
            className="inline-block px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
          >
            API 키 발급 방법 보기
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            2. 장르 선택
          </h2>
          <p className="mb-3">
            메인 페이지에서 원하는 음악 장르를 선택하세요. 다양한 장르가
            준비되어 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>K-발라드 - 감성적인 한국 발라드</li>
            <li>K-인디 - 독특하고 개성 있는 인디 음악</li>
            <li>K-트로트 - 전통과 현대가 어우러진 트로트</li>
            <li>힙합 - 강렬한 리듬의 힙합</li>
            <li>댄스 - 신나는 댄스 음악</li>
            <li>R&B - 부드러운 리듬 앤 블루스</li>
            <li>락 - 강렬한 록 음악</li>
            <li>시티팝 - 감성적인 도시 음악</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            3. 제목 선택
          </h2>
          <p className="mb-3">
            AI가 선택한 장르에 맞는 8개의 창의적인 노래 제목을 생성합니다.
          </p>
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 space-y-2">
            <p className="font-semibold">💡 팁:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>
                마음에 드는 제목이 없다면 "새로운 제목 생성" 버튼을 클릭하세요
              </li>
              <li>직접 제목을 입력할 수도 있습니다</li>
            </ul>
          </div>
        </section>

        {/* 광고 */}
        <ContentAd />

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            4. 테마 선택
          </h2>
          <p className="mb-3">
            선택한 제목에 어울리는 5가지 가사 테마가 제시됩니다. 노래의 전체적인
            분위기를 결정하는 중요한 단계입니다.
          </p>
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
            <p className="text-sm">
              예시: "이별", "그리움", "사랑", "희망", "자유" 등
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            5. 가사 생성
          </h2>
          <p className="mb-3">
            AI가 당신이 선택한 장르, 제목, 테마를 바탕으로 완성도 높은 가사를
            생성합니다. 일반적으로 30초~1분 정도 소요됩니다.
          </p>
          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
            <p className="text-blue-400">
              ℹ️ 생성된 가사는 Verse, Chorus, Bridge 등의 구조로 명확하게
              구분되어 있습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            6. 가사 활용
          </h2>
          <p className="mb-3">
            생성된 가사를 복사하거나 텍스트 파일로 다운로드할 수 있습니다.
          </p>
          <div className="space-y-2">
            <p>
              <strong>복사하기:</strong> 클릭 한 번으로 클립보드에 복사됩니다
            </p>
            <p>
              <strong>다운로드:</strong> .txt 파일로 저장됩니다
            </p>
          </div>
          <div className="mt-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
            <p className="text-yellow-400">
              ⚠️ 가사를 복사하거나 다운로드하면 3초 후 파트너 링크가 열립니다.
              이는 무료 서비스 운영을 위한 것이니 양해 부탁드립니다.
            </p>
          </div>
        </section>

        {/* 광고 */}
        <ContentAd />

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                Q. 생성된 가사를 상업적으로 사용해도 되나요?
              </h3>
              <p className="text-sm text-zinc-400">
                A. AI가 생성한 가사는 참고용으로 제공됩니다. 상업적 사용 전에
                반드시 수정 및 검토하시고, 저작권 관련 법률을 확인하시기
                바랍니다.
              </p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                Q. 가사 품질이 마음에 들지 않아요
              </h3>
              <p className="text-sm text-zinc-400">
                A. "처음부터 다시하기"를 클릭하여 다른 제목이나 테마를
                선택해보세요. 같은 선택이라도 다른 결과가 생성될 수 있습니다.
              </p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                Q. API 사용량 제한이 있나요?
              </h3>
              <p className="text-sm text-zinc-400">
                A. Gemini API의 무료 할당량에 따라 제한이 있을 수 있습니다.
                자세한 내용은 Google AI Studio에서 확인하세요.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          지금 시작하기
        </a>
      </div>
    </div>
  );
};

export default HowToUsePage;
