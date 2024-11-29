import React, { useEffect, useRef, useState } from "react";
import { autoGrow, setNewOffset, setZIndex } from "../utils.js";
import Trash from "../icons/Trash";

// 定义组件的 Props 类型
interface NoteCardProps {
  note: Note; // 接收一个 Note 类型的属性
}

interface Color {
  id: string;
  colorHeader: string;
  colorBody: string;
  colorText: string;
}

interface Position {
  x: number;
  y: number;
}

export interface Note {
  body: string;
  colors: Color;
  position: Position;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  // 解析 note 数据的类型
  const colors = note.colors as {
    colorHeader: string;
    colorBody: string;
    colorText: string;
  };
  const body = note.body;
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // 使用正确的 Ref 类型
  const [position, setPosition] = useState<{ x: number; y: number }>(note.position);

  let mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef<HTMLDivElement>(null); // 使用正确的 Ref 类型

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const mouseDown = (e: React.MouseEvent) => { // 鼠标事件类型
    if (cardRef.current){
      setZIndex(cardRef.current);
    }
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseMove = (e: MouseEvent) => { // 鼠标事件类型
    // 1. 计算移动的坐标
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    // 2. 为下一次移动更新初始的坐标
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    if (cardRef.current){
      const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
      setPosition(newPosition);
    }
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
            style={{ backgroundColor: colors.colorHeader }}
            onMouseDown={mouseDown}
        >
          <Trash />
        </div>

        <div className="card-body">
        <textarea
            ref={textAreaRef}
            style={{ color: colors.colorText }}
            defaultValue={body}
            onInput={() => autoGrow(textAreaRef)}
            onFocus={() => {
              if (cardRef.current) { // 添加非空检查
                setZIndex(cardRef.current);
              }
            }}
        ></textarea>
        </div>
      </div>
  );
};

export default NoteCard;