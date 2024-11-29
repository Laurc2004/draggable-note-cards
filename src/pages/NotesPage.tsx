
import { fakeData as notes } from "../assets/fakeData";
import NoteCard, {Note} from "../compoments/NoteCard";
import React from "react";

const NotesPage: React.FC = () => {
  return (
      <div>
        {notes.map((note: Note, index) => (
            <NoteCard note={note} key={index} />
        ))}
      </div>
  );
};

export default NotesPage;