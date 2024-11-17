import Trash from "../icons/Trash.jsx";
import {useEffect, useRef, useState} from "react";
import {autoGrow, setNewOffset, setZIndex} from "../utils.js";

const NoteCard = ({note}) => {
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  const textAreaRef = useRef(null);
  const [position, setPositon] = useState(JSON.parse(note.position));

  let mouseStartPos = {x: 0, y: 0};

  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);


  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseMove = (e) => {
    //1. 计算移动的坐标
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2. 为下一次移动更新初始的坐标
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPositon(newPosition);
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{backgroundColor: colors.colorHeader}}
        onMouseDown={mouseDown}
      >
        <Trash/>
      </div>

      <div className="card-body">
            <textarea
              ref={textAreaRef}
              style={{color: colors.colorText}}
              defaultValue={body}
              onInput={() => autoGrow(textAreaRef)}
              onFocus={() => {
                setZIndex(cardRef.current)
              }}
            ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;