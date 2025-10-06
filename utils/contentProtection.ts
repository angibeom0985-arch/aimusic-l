// 콘텐츠 보호 기능 - 드래그프리 같은 우회 프로그램 방어 강화

// 드래그 방지 (우회 프로그램 방어 강화)
export const preventDrag = (e: Event) => {
  // input, textarea는 드래그 허용
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    return true;
  }
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
};

// 우클릭 방지 (우회 프로그램 방어 강화)
export const preventContextMenu = (e: Event) => {
  // input, textarea는 우클릭 허용
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    return true;
  }
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
};

// 텍스트 선택 방지 (추가)
export const preventSelection = (e: Event) => {
  // input, textarea는 선택 허용
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    return true;
  }
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  // 현재 선택된 텍스트 제거
  if (window.getSelection) {
    window.getSelection()?.removeAllRanges();
  }
  return false;
};

// 마우스 이벤트 강제 차단 (드래그프리 방어)
export const blockMouseEvents = (e: MouseEvent) => {
  // input, textarea, button은 허용
  const target = e.target as HTMLElement;
  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "BUTTON" ||
    target.closest("button")
  ) {
    return true;
  }

  // 우클릭 또는 드래그 시도 차단
  if (e.button === 2 || e.buttons === 2) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
  return true;
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

// 콘텐츠 보호 초기화 (드래그프리 같은 우회 프로그램 방어 강화)
export const initContentProtection = () => {
  // 드래그 방지 - 여러 이벤트에 중복 등록으로 우회 방지
  document.addEventListener("dragstart", preventDrag, true);
  document.addEventListener("selectstart", preventDrag, true);
  document.addEventListener("select", preventSelection, true);
  document.addEventListener("mousedown", preventSelection, true);

  // 우클릭 방지 - 캡처 단계에서 차단
  document.addEventListener("contextmenu", preventContextMenu, true);
  document.addEventListener("auxclick", preventContextMenu, true); // 중간 버튼 클릭도 차단

  // 마우스 이벤트 추가 차단 (드래그프리 방어)
  document.addEventListener("mousedown", blockMouseEvents, true);
  document.addEventListener("mouseup", blockMouseEvents, true);
  document.addEventListener("click", blockMouseEvents, true);

  // 복사 방지
  document.addEventListener("copy", preventCopy, true);
  document.addEventListener("cut", preventCopy, true);

  // 키보드 단축키 차단
  document.addEventListener("keydown", preventShortcuts, true);

  // CSS로 추가 보호 - 다중 속성 적용
  const style = document.createElement("style");
  style.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }
    input, textarea {
      -webkit-user-select: auto !important;
      -moz-user-select: auto !important;
      -ms-user-select: auto !important;
      user-select: auto !important;
    }
  `;
  document.head.appendChild(style);

  // 추가 보호: 주기적으로 선택 영역 제거
  const clearSelection = () => {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        // input, textarea가 아닌 경우만 제거
        const activeElement = document.activeElement;
        if (
          activeElement?.tagName !== "INPUT" &&
          activeElement?.tagName !== "TEXTAREA"
        ) {
          selection.removeAllRanges();
        }
      }
    }
  };
  setInterval(clearSelection, 100);

  // 개발자 도구 감지 및 경고
  const detectDevTools = () => {
    const threshold = 160;
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      // 개발자 도구가 열렸을 가능성
      document.body.style.display = "none";
    }
  };
  setInterval(detectDevTools, 1000);
};

// 콘텐츠 보호 해제
export const removeContentProtection = () => {
  document.removeEventListener("dragstart", preventDrag, true);
  document.removeEventListener("selectstart", preventDrag, true);
  document.removeEventListener("select", preventSelection, true);
  document.removeEventListener("mousedown", preventSelection, true);
  document.removeEventListener("contextmenu", preventContextMenu, true);
  document.removeEventListener("auxclick", preventContextMenu, true);
  document.removeEventListener("mousedown", blockMouseEvents, true);
  document.removeEventListener("mouseup", blockMouseEvents, true);
  document.removeEventListener("click", blockMouseEvents, true);
  document.removeEventListener("copy", preventCopy, true);
  document.removeEventListener("cut", preventCopy, true);
  document.removeEventListener("keydown", preventShortcuts, true);
};
