import {Note, Position} from "./NoteCard.tsx";

const NewNoteCard = (id: number, colorId: string , colorHeader: string, colorBody: string, position: Position): Note => {
  return (
      {
        id: id,
        body: '',
        colors: {
          id: colorId,
          colorHeader: colorHeader,
          colorBody: colorBody,
          colorText: "#18181A",
        },
        position: position
      }
  )
}

export default NewNoteCard;