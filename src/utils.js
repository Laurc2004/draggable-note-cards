export const setNewOffset = (card, mouseMoveDir = {x: 0, y: 0}) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export function autoGrow(textAreaRef) {
  const {current} = textAreaRef;
  current.style.height = "auto";
  current.style.height = textAreaRef.current.scrollHeight + "px";
}

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  // 遍历每一个不是当前的zIndex并 -1，确保当前 zIndex在最上面
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};