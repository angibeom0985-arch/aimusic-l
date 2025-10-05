// 콘텐츠 보호 기능

// 드래그 방지
export const preventDrag = (e: Event) => {
  e.preventDefault();
  return false;
};

// 우클릭 방지
export const preventContextMenu = (e: Event) => {
  e.preventDefault();
  return false;
};

// 복사 방지
export const preventCopy = (e: ClipboardEvent) => {
  // input, textarea 등 입력 필드는 허용
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    return true;
  }
  e.preventDefault();
  return false;
};

// 키보드 단축키 차단
export const preventShortcuts = (e: KeyboardEvent) => {
  // input, textarea에서는 정상 동작 허용
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    return true;
  }

  const key = e.key.toLowerCase();
  const ctrl = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const win = e.metaKey;

  // 차단할 단축키 목록
  if (
    (ctrl && key === "s") || // Ctrl+S (저장)
    (ctrl && key === "p") || // Ctrl+P (인쇄)
    (ctrl && shift && key === "s") || // Ctrl+Shift+S (다른 이름으로 저장)
    key === "printscreen" || // PrintScreen
    (win && shift && key === "s") || // Win+Shift+S (스크린샷)
    (ctrl && shift && key === "c") || // Ctrl+Shift+C
    (ctrl && shift && key === "w") || // Ctrl+Shift+W
    (ctrl && shift && key === "d") || // Ctrl+Shift+D
    (ctrl && shift && key === "a") || // Ctrl+Shift+A
    (ctrl && shift && key === "f") || // Ctrl+Shift+F
    e.keyCode === 44 // PrintScreen 키코드
  ) {
    e.preventDefault();
    return false;
  }

  return true;
};

// 콘텐츠 보호 초기화
export const initContentProtection = () => {
  // 드래그 방지
  document.addEventListener("dragstart", preventDrag);
  document.addEventListener("selectstart", preventDrag);

  // 우클릭 방지
  document.addEventListener("contextmenu", preventContextMenu);

  // 복사 방지
  document.addEventListener("copy", preventCopy);
  document.addEventListener("cut", preventCopy);

  // 키보드 단축키 차단
  document.addEventListener("keydown", preventShortcuts);

  // CSS로 추가 보호
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
};

// 콘텐츠 보호 해제
export const removeContentProtection = () => {
  document.removeEventListener("dragstart", preventDrag);
  document.removeEventListener("selectstart", preventDrag);
  document.removeEventListener("contextmenu", preventContextMenu);
  document.removeEventListener("copy", preventCopy);
  document.removeEventListener("cut", preventCopy);
  document.removeEventListener("keydown", preventShortcuts);

  document.body.style.userSelect = "";
  document.body.style.webkitUserSelect = "";
};
