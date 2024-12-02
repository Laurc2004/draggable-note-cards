import React, { useState, useEffect, useCallback } from "react";
import { fakeData as defaultNotes } from "../assets/fakeData";
import NoteCard, {Note} from "../components/NoteCard";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // 初始化状态从 localStorage 加载笔记数据
  useEffect(() => {
    let loadedNotes: Note[] = [];

    defaultNotes.forEach(note => {
      const storedNote = localStorage.getItem(`note_${note.id}`);
      if (storedNote) {
        try {
          const parsedNote: Note = JSON.parse(storedNote);
          loadedNotes.push(parsedNote);
        } catch (error) {
          console.error(`Error parsing note ${note.id}`, error);
          loadedNotes.push(note);
        }
      } else {
        loadedNotes.push(note);
        localStorage.setItem(`note_${note.id}`, JSON.stringify(note));
      }
    });

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