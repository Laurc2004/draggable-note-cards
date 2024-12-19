import NotesPage from "./pages/NotesPage";
import {Toaster} from "react-hot-toast";


function App() {
  return (
    <div id="app">
      <Toaster toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        }
      }}/>
      <NotesPage/>
    </div>
  );
}

export default App;