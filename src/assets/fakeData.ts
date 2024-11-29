import {Note} from "../compoments/NoteCard";

export const fakeData: Note[] = [
  {
    body: 'A purple card',
    colors: {
      id: "color-purple",
      colorHeader: "#FED0FD",
      colorBody: "#FEE5FD",
      colorText: "#18181A",
    },
    position: { x: 400, y: 50 },
  },
  {
    body: 'A blue card',
    colors: {
      id: "color-blue",
      colorHeader: "#9BD1DE",
      colorBody: "#A6DCE9",
      colorText: "#18181A",
    },
    position: { x: 300, y: 500 },
  },
  {
    body: 'A yellow card',
    colors: {
      id: "color-yellow",
      colorHeader: "#FFEFBE",
      colorBody: "#FFF5DF",
      colorText: "#18181A",
    },
    position: { x: 800, y: 300 },
  },
];