// 定义鼠标移动方向的类型
interface MouseMoveDir {
  x: number;
  y: number;
}

// 定义 `setNewOffset` 函数
export const setNewOffset = (card: HTMLElement, mouseMoveDir: MouseMoveDir = { x: 0, y: 0 }): { x: number; y: number } => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

// 定义 `autoGrow` 函数
export function autoGrow(textAreaRef: React.RefObject<HTMLTextAreaElement>): void {
  const { current } = textAreaRef;
  if (current) {
    current.style.height = "auto";
    current.style.height = `${current.scrollHeight}px`;
  }
}

// 定义 `setZIndex` 函数
export const setZIndex = (selectedCard: HTMLElement): void => {
  selectedCard.style.zIndex = "999";

  // 遍历每一个不是当前的zIndex并 -1，确保当前 zIndex在最上面
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    const cardElement = card as HTMLElement;
    if (cardElement !== selectedCard) {
      cardElement.style.zIndex = (parseInt(selectedCard.style.zIndex) - 1).toString();
    }
  });
};