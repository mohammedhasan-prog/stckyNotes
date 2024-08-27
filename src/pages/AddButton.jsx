import Plus from "../icons/Plus";

import colors from "../assets/colors.json";
import { useContext, useRef } from "react";
import { NoteContext } from "../Context/NoteContext";
import { db } from "../appWrite/databses";
const AddButton = () => {
    const {setNotes}=useContext(NoteContext)
    const startingPos=useRef(10);
    const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
        };
    startingPos.current += 10;
        const response = await db.notes.create(payload);
        setNotes((prev)=>[response,...prev]);
    };
    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};
 export default AddButton