import React, { useState, useEffect } from "react";

const ThumbnailDownloadPage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("playlist-thumbnail.png");

  useEffect(() => {
    // sessionStorage에서 이미지 데이터 가져오기
    const imageData = sessionStorage.getItem('thumbnail_download_image');
    if (imageData) {
      setImageUrl(imageData);
    } else {
      // sessionStorage에 데이터가 없으면 URL 파라미터에서 시도
      const params = new URLSearchParams(window.location.search);
      const imageParam = params.get("image");
      if (imageParam) {
        setImageUrl(decodeURIComponent(imageParam));
      }
    }
  }, []);

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      // 이미지를 fetch하여 blob으로 변환
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Blob URL 생성
      const blobUrl = URL.createObjectURL(blob);
      
      // 다운로드 링크 생성 및 클릭
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // URL 정리
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (error) {
      console.error('다운로드 오류:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    }
  };

  const handleClose = () => {
    window.close();
  };

  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
        <div className="text-zinc-400 text-center">
          <p className="text-xl mb-4">이미지를 불러오는 중...</p>
          <p className="text-sm">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            썸네일 다운로드
          </h2>
          <p className="text-zinc-400 text-sm md:text-base">
            파일명을 변경하고 다운로드 버튼을 클릭하세요
          </p>
        </div>

        {/* 이미지 미리보기 */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl p-4 md:p-6 mb-6 shadow-2xl">
          <div className="bg-black rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Thumbnail Preview"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* 파일명 입력 및 다운로드 버튼 */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl p-6 shadow-2xl">
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              파일 이름
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="파일명을 입력하세요"
            />
            <p className="text-xs text-zinc-500 mt-2">
              * .png 확장자가 자동으로 추가됩니다
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
            >
              💾 다운로드
            </button>
            <button
              onClick={handleClose}
              className="flex-1 sm:flex-none bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300"
            >
              닫기
            </button>
          </div>

          <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">📌 다운로드 안내</h3>
            <ul className="text-xs text-zinc-400 space-y-1">
              <li>• 브라우저 설정에 따라 저장 위치가 결정됩니다</li>
              <li>• Chrome: 설정 {">"} 다운로드 {">"} 위치에서 변경 가능</li>
              <li>• 파일명은 자유롭게 변경하실 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailDownloadPage;
