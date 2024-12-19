import React, { useState, useEffect, useCallback } from "react";
import { fakeData as defaultNotes } from "../assets/fakeData";
import NoteCard, { Note } from "../components/NoteCard";
import Add from "../icons/Add.tsx";
import colorSchemes from "../assets/colorSchemes.ts";
import NewNoteCard from "../components/NewNoteCard.tsx";
import toast from "react-hot-toast";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // 初始化状态从 localStorage 加载笔记数据
  useEffect(() => {
    const loadedNotes: Note[] = [];
    const maxNotes = 50;

    // 从 localStorage 加载笔记
    for (let i = 0; i < maxNotes; i++) {
      const note = localStorage.getItem(`note_${i}`);
      if (note) {
        const parsedNote: Note = JSON.parse(note);
        loadedNotes.push(parsedNote);
      }
    }

    // 如果 localStorage 为空，则使用默认笔记
    if (loadedNotes.length === 0) {
      defaultNotes.forEach(note => {
        localStorage.setItem(`note_${note.id}`, JSON.stringify(note));
        loadedNotes.push(note);
      });
    }

    setNotes(loadedNotes);
  }, []);

  // 定义 onUpdate 回调函数，并使用 useCallback 包裹以保持引用稳定
  const handleUpdateNote = useCallback(
      (updatedNote: Note) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === updatedNote.id ? updatedNote : note
            )
        );
        // 更新 localStorage
        localStorage.setItem(`note_${updatedNote.id}`, JSON.stringify(updatedNote));
      },
      []
  );

  const handleAddNote = () => {
    // 生成唯一的 ID，查找一个在 0 到 50 范围内未使用的 ID
    const maxId = 50;
    let newId = -1;

    // 尝试在 0 到 50 范围内找一个空闲的 ID
    for (let i = 0; i < maxId; i++) {
      const note = localStorage.getItem(`note_${i}`);
      if (!note) {
        newId = i;
        break;
      }
    }

    // 如果没有找到空闲的 ID，则使用最大的 ID + 1，但要限制最大为 50
    if (newId === -1) {
      // 超过最大 ID，不能创建更多卡片
      toast.error("A maximum of 50 note cards can be created!");
      return;
    }
    // 随机获取配色方案
    const randomIndex = Math.floor(Math.random() * colorSchemes.length);
    const colorScheme = colorSchemes[randomIndex];

    // 计算新卡片的位置，避免重叠
    const position = {
      x: 30 + notes.length * 10, // 每行 5 张卡片，横向偏移
      y: 200
    };

    const newNoteCard = NewNoteCard(newId, colorScheme.colorId, colorScheme.colorHeader, colorScheme.colorBody, position);

    // 更新 localStorage
    localStorage.setItem(`note_${newId}`, JSON.stringify(newNoteCard));

    // 更新状态
    setNotes(prevNotes => [...prevNotes, newNoteCard]);
    toast.success("Successfully created a new random color note card!")
  };

  return (
      <div>
        <div className="fixed top-0 left-0 mt-2 ml-2 cursor-pointer" onClick={handleAddNote}>
          <Add />
        </div>
        <div className="notes-container">
          {notes.map((note: Note) => (
              <NoteCard key={note.id} note={note} onUpdate={handleUpdateNote} />
          ))}
        </div>
      </div>
  );
};

export default NotesPage;