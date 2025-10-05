import React, { useState, useEffect } from "react";
import { ADMIN_CREDENTIALS } from "../constants";

interface PageContent {
  name: string;
  path: string;
  content: string;
}

const PAGES: PageContent[] = [
  { name: "API 가이드", path: "ApiGuidePage", content: "" },
  { name: "사용법", path: "HowToUsePage", content: "" },
];

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [editorMode, setEditorMode] = useState<"basic" | "html">("basic");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 로그인 상태 확인
    const loggedIn = sessionStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_logged_in", "true");
      setError("");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_logged_in");
    setUsername("");
    setPassword("");
  };

  const handleLoadPage = (pagePath: string) => {
    setSelectedPage(pagePath);
    // 실제로는 파일을 읽어와야 하지만, 여기서는 시뮬레이션
    setContent(
      `<!-- ${pagePath}의 내용 -->\n\n여기에 페이지 내용이 표시됩니다.\n\n이 기능은 실제 파일 시스템 접근이 필요하므로,\n백엔드 API와 연동하여 구현해야 합니다.`
    );
  };

  const handlePreview = () => {
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>미리보기</title>
            <style>
              body {
                font-family: 'Noto Sans KR', sans-serif;
                padding: 2rem;
                background: #18181b;
                color: #f4f4f5;
              }
            </style>
          </head>
          <body>
            ${editorMode === "html" ? content : `<pre>${content}</pre>`}
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  const handleSave = () => {
    alert(
      "저장 기능은 백엔드 API가 필요합니다.\n\n현재는 데모 버전이므로 실제로 저장되지 않습니다."
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const imageTag = `<img src="${imageUrl}" alt="업로드 이미지" />`;
        setContent((prev) => prev + "\n" + imageTag);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                아이디
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">관리자 페이지</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          로그아웃
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 사이드바 - 페이지 선택 */}
        <div className="lg:col-span-1 bg-zinc-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">페이지 선택</h2>
          <div className="space-y-2">
            {PAGES.map((page) => (
              <button
                key={page.path}
                onClick={() => handleLoadPage(page.path)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedPage === page.path
                    ? "bg-pink-600 text-white"
                    : "bg-zinc-700 hover:bg-zinc-600"
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>

        {/* 메인 - 에디터 */}
        <div className="lg:col-span-3 space-y-4">
          {selectedPage ? (
            <>
              {/* 에디터 툴바 */}
              <div className="flex flex-wrap gap-4 items-center bg-zinc-800 rounded-lg p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditorMode("basic")}
                    className={`px-4 py-2 rounded-lg ${
                      editorMode === "basic"
                        ? "bg-pink-600 text-white"
                        : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  >
                    기본 모드
                  </button>
                  <button
                    onClick={() => setEditorMode("html")}
                    className={`px-4 py-2 rounded-lg ${
                      editorMode === "html"
                        ? "bg-pink-600 text-white"
                        : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  >
                    HTML 모드
                  </button>
                </div>
                <div className="flex gap-2 ml-auto">
                  <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer">
                    이미지 업로드
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handlePreview}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                  >
                    미리보기
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg"
                  >
                    저장
                  </button>
                </div>
              </div>

              {/* 에디터 */}
              <div className="bg-zinc-800 rounded-lg p-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`w-full h-[600px] bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono ${
                    editorMode === "html" ? "text-sm" : "text-base"
                  }`}
                  placeholder="내용을 입력하세요..."
                />
              </div>

              {/* 안내 메시지 */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                <p className="text-yellow-400">
                  ⚠️ <strong>주의:</strong> 이 관리자 페이지는 프론트엔드 전용
                  데모입니다. 실제 파일 시스템에 접근하거나 저장하려면 백엔드
                  API가 필요합니다.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-zinc-800 rounded-lg p-8 text-center text-zinc-400">
              <p className="text-xl">왼쪽에서 편집할 페이지를 선택하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
