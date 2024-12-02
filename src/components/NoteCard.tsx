import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { autoGrow, setNewOffset, setZIndex } from "../utils.js";
import Trash from "../icons/Trash";

interface NoteCardProps {
  note: Note;
  onUpdate: (updatedNote: Note) => void; // 新增一个回调函数用于通知父组件更新笔记
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
  id: number; // 卡片唯一标识
  body: string; // 卡片内容
  colors: Color; // 卡片颜色
  position: Position; // 卡片位置
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onUpdate }) => {
  const colors = note.colors as {
    colorHeader: string;
    colorBody: string;
    colorText: string;
  };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>(note.position);
  const [body, setBody] = useState(note.body); // 新增对 body 的管理
  let mouseStartPos = { x: 0, y: 0 };

  // 监听文本框的变化
  useLayoutEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef);
    }
  }, []);

   // 当 body 或 position 发生变化时，更新 localStorage 和调用父组件的 onUpdate 回调（如果有）
   useEffect(() => {
    const updatedNote = { ...note, body, position };
    localStorage.setItem(`note_${note.id}`, JSON.stringify(updatedNote));
    if (onUpdate) {
      onUpdate(updatedNote);
    }
  }, [body, position, note.id, onUpdate]);


  // 鼠标按下事件
  const mouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      setZIndex(cardRef.current);
    }
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  // 鼠标抬起事件
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  // 鼠标移动事件
  const mouseMove = (e: MouseEvent) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    if (cardRef.current) {
      const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
      setPosition(newPosition);
    }
  };

  // 处理文本区域输入事件
  const handleTextAreaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const newBody = e.currentTarget.value;
    setBody(newBody);
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
        onMouseDown={mouseDown} // 当鼠标在header上按下时，触发鼠标按下事件
      >
        <Trash cardRef={cardRef} />
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          value={body} // 使用受控组件
          onInput={handleTextAreaInput} // 监听文本框的变化
          onFocus={() => {
            if (cardRef.current) {
              setZIndex(cardRef.current); // 点击时设置卡片层叠等级
            }
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;