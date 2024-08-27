import Trash from "./Trash";
import { db } from "../appWrite/databses";
import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";
 
 const DeleteButton = ({ noteId }) => {
    const { setNotes } = useContext(NoteContext);
 
    const handleDelete = async (e) => {
        db.notes.delete(noteId);
        setNotes((prevState) =>
            prevState.filter((note) => note.$id !== noteId)
        );
    };
 
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};
export default DeleteButton