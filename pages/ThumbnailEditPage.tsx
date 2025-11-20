import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThumbnailEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [modifyPrompt, setModifyPrompt] = useState("");
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    // sessionStorage에서 이미지 데이터 가져오기
    const imageData = sessionStorage.getItem('thumbnail_edit_image');
    if (imageData) {
      setOriginalImage(imageData);
    } else {
      // sessionStorage에 데이터가 없으면 URL 파라미터에서 시도
      const params = new URLSearchParams(window.location.search);
      const imageParam = params.get("image");
      if (imageParam) {
        setOriginalImage(decodeURIComponent(imageParam));
      }
    }
  }, []);

  const handleConfirm = () => {
    if (modifyPrompt.trim()) {
      // 부모 창으로 데이터 전달
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "IMAGE_MODIFY",
            prompt: modifyPrompt.trim(),
          },
          window.location.origin
        );
        window.close();
      }
    }
  };

  const handleCancel = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
          원하는 이미지 수정 내용을 입력하세요
        </h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            예시:
          </label>
          <ul className="text-sm text-zinc-400 space-y-2 mb-6 pl-4">
            <li>- 배경을 하늘색으로 변경</li>
            <li>- 사람의 표정을 더 밝게</li>
            <li>- 색감을 더 따뜻하게</li>
          </ul>
          
          <textarea
            value={modifyPrompt}
            onChange={(e) => setModifyPrompt(e.target.value)}
            placeholder="수정할 내용을 입력하세요..."
            className="w-full h-40 px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            autoFocus
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!modifyPrompt.trim()}
            className="flex-1 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailEditPage;
