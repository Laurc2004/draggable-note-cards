import React, { useState, useEffect, useCallback } from "react";
import { fakeData as defaultNotes } from "../assets/fakeData";
import NoteCard, {Note} from "../components/NoteCard";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // 初始化状态从 localStorage 加载笔记数据
  useEffect(() => {
    let loadedNotes: Note[] = [];

    // 判断是否有存储
    if (localStorage.getItem('note_1')){
      for (let i = 1; ; i++) {
        const note = localStorage.getItem(`note_${i}`);
        if (!note) break
        const parsedNote: Note = JSON.parse(note);
        loadedNotes.push(parsedNote);
      }
    } else {
      // 如果没有则从默认卡片中遍历
      defaultNotes.forEach(note => {
        localStorage.setItem(`note_${note.id}`, JSON.stringify(note));
        loadedNotes.push(note);
      })
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
    },
    [] // 确保没有依赖项变化
  );

  return (
    <div>
      {notes.map((note: Note) => (
        <NoteCard key={note.id} note={note} onUpdate={handleUpdateNote} />
      ))}
    </div>
  );
};

export default NotesPage;