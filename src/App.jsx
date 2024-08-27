import NotesPage from "./pages/NotesPage"
import NoteCards from "./pages/NoteCards"
import NotesProvider from "./Context/NoteContext"

function App() {
  
  return (
    <div id="app">
      <NotesProvider>
      <NotesPage/>
      
      </NotesProvider>
     

    </div>
  )
}

export default App
