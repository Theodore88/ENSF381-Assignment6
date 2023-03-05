import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useParams } from "react-router-dom";
import Note from './Note';
import Layout from './Layout';
import NoteEdit from './NoteEdit';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

function App() {
  const [note, setNote] = useState(
    localStorage.note ? JSON.parse(localStorage.getItem('note')) : []
  );
  const [edited, setEdited] = useState(
    localStorage.edited ? JSON.parse(localStorage.getItem('edited')) : false
  );  
  const [noteNum, setNoteNum] = useState(0);
  // localStorage.clear()
  console.log(note.length)
  console.log(edited)

  useEffect(() => {
    localStorage.setItem('edited', JSON.stringify(edited));
  }, [edited]);
  useEffect(() => {
    localStorage.setItem('note', JSON.stringify(note)); // store array of notes under id 'notes'
  }, [note]);
  console.log(note)
  console.log(edited)
  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled',
      body: '',
      date: new Date(), 
      noteNumber : setNoteNum(noteNum + 1),
    };
    console.log(note)
    setNote([newNote, ...note]);     // add new note to beginning of array along with previous notes in front
    setEdited(newNote.id);
  }
  const deleteNote = (noteID) => {
    console.log(noteID);
    let tempNotes = note.filter((n) => n.id !== noteID);
    console.log(tempNotes);
    setNote(tempNotes);
    if (tempNotes.length > 0) {
      setEdited(tempNotes[0].id);
    } else {
      setEdited(false);
    }
  };

  const editNote = (editNote) => {
    let i;
    let tempNotes = [];
    console.log(editNote)
    for (i in note){
      if(note[i].id === editNote.id){
        tempNotes.push(editNote);
      }
      else{
        tempNotes.push(note[i]);
      }
    }
    setNote(tempNotes);
  }
  console.log(edited)
  const getEditedNote = () => {
    if(!edited) 
    {
      console.log('returning false')
      return false;
    } 
    return(note.find(({ id }) => id === edited));
  }

  return(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout notes = {note} deleteNote = {deleteNote} getEditedNote = {getEditedNote} addNote = {addNote} setEdited = {setEdited} editNote = {editNote} noteNum = {noteNum}/>}>
        <Route path="/notes" element={<Note notes = {note} deleteNote = {deleteNote} getEditedNote = {getEditedNote} addNote = {addNote} setEdited = {setEdited} editNote = {editNote} noteNum = {noteNum} />}></Route> 
        <Route exact path="/notes/:noteId" element={<Note notes = {note} deleteNote = {deleteNote} getEditedNote = {getEditedNote} addNote = {addNote} setEdited = {setEdited} editNote = {editNote} noteNum = {noteNum}/>}></Route> 
        <Route exact path="/notes/:noteId/edit" element={<NoteEdit notes = {note} deleteNote = {deleteNote} getEditedNote = {getEditedNote} addNote = {addNote} setEdited = {setEdited} editNote = {editNote} noteNum = {noteNum}/>}></Route> 
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
export default App;
