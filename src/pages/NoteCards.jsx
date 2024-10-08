import React from 'react'
import { fakeData as notes } from '../assets/data'
import { useState,useEffect } from 'react'
import NoteCard from './NoteCard'
import { db } from '../appWrite/databses'
import { NoteContext } from '../Context/NoteContext'
import { useContext } from 'react'
import Controls from './Controls'

const NoteCards = () => {
  const { notes, setNotes } = useContext(NoteContext);
// useEffect(()=>{
// init()
// },[])
//   const init=async()=>{
//     const res=await db.notes.list();
//   // const res= await databases.listDocuments(
//   //   import.meta.env.VITE_DATABASE_ID,
//   //   import.meta.env.VITE_COLLECTION_NOTES_ID
//   // );
// setNotes(res.documents)
//   }
    
  return (
    <div>
      {notes.map((note)=>{
        return(
        <NoteCard note={note} setNotes={setNotes}/>)
      })}
       <Controls/>
    </div>
  )
}

export default NoteCards
