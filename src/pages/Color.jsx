import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";

const Color = ({ color }) => {
    const {selectedNote}=useContext(NoteContext);
    const changeColor = () => {
        console.log("selected Color:", selectedNote);
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );
     
            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };
     
            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);
     
            db.notes.update(selectedNote.$id, {
                colors: JSON.stringify(color),
            });
        } catch (error) {
            alert("You must select a note before changing colors");
        }
    };
 
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};
export default Color