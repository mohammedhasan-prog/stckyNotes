import React, { useEffect } from "react";

import { useRef, useState } from "react";
import { db } from "../appWrite/databses";
import { setNewOffSet, setZIndex, bodyParser } from "../utils";
import Spinner from "./Spinner";
import DeleteButton from "./DeleteButton";
const NoteCard = ({ note ,setNotes}) => {
  const [saving, setSaving] = useState(false);
  const KeyUpTimer = useRef();

  const body = bodyParser(note?.body);
  // let position = JSON.parse(note?.position);
  const colors = JSON.parse(note?.colors);

  const textAreaRef = useRef();
  const [position, setPosition] = useState(JSON.parse(note.position));
  let mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);
  const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const mouseDown = (e) => {
   
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    setZIndex(cardRef.current);

  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: (mouseStartPos.x - e.clientX) % 9,
      y: (mouseStartPos.y - e.clientY) % 9,
    };
    const newPosition = setNewOffSet(cardRef.current, mouseMoveDir);
    console.log(mouseMoveDir);

    setPosition(newPosition);
  };
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffSet(cardRef.current);
    saveData("position", newPosition);
  };
  const saveData = async (key, vlaue) => {
    const payload = { [key]: JSON.stringify(vlaue) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {}
    setSaving(false)
  };
  const handleKeyUp = () => {
    setSaving(true);
    if (KeyUpTimer.current) {
        clearTimeout(KeyUpTimer.current);
    }
    KeyUpTimer.current=setTimeout(() => {
        saveData("body",textAreaRef.current.value)
    }, 2000);
  };
  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseUp={mouseUp}
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
       <DeleteButton noteId={note.$id} setNotes={setNotes} />
        
   { saving && (
        <div className="card-saving">
             <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
        </div>
    )}

      </div>
      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          onFocus={() => setZIndex(cardRef.current)}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          style={{ color: colors.colorText }}
          defaultValue={body}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
