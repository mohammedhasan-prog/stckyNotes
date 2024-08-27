import React, { useEffect } from "react";
import Trash from "./Trash";
import { useRef, useState } from "react";
import { db } from "../appWrite/databses";
import { setNewOffSet ,setZIndex,bodyParser} from "../utils";

const NoteCard = ({ note }) => {
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
    setZIndex(cardRef.current)
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: (mouseStartPos.x - e.clientX)%9,
      y: (mouseStartPos.y - e.clientY)%9,
    };
    const newPosition=setNewOffSet(cardRef.current,mouseMoveDir)
    console.log(mouseMoveDir)

    setPosition(
    newPosition);
  };
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
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
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          onFocus={()=>setZIndex(cardRef.current)}
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
