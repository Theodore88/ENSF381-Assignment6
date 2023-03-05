import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Sidebar from "./Sidebar";

function NoteEdit(props){
    let notes = props.notes;
    let deleteNote = props.deleteNote; // function to remove a note from array
    let editedNote = props.getEditedNote; // getter
    let editNote = props.editNote; // to edit notes
    let setEdited = props.setEdited;
    let addNote = props.addNote;
    let length = props.getNoteslength;
    let sidebarStatus = useOutletContext();
    const {noteId} = useParams(); 
    
    let newNote = {
        title: 'Untitled',
        body: '',
        date: new Date()
      };
    const [storedNote, setStoredNote] = useState(editedNote());
    

    const navigate = useNavigate();

    const formatDateTime = (when) => {
        when = new Date(when);
        return(`${when.getFullYear()}-${(when.getMonth()+1).toString().padStart(2, '0')}-${when.getDate().toString().padStart(2, '0')}T${when.getHours().toString().padStart(2, '0')}:${when.getMinutes().toString().padStart(2, '0')}`)
    };

    const saveNote = () => {
        let editingNote = editedNote();
        editNote({
            ...editingNote,
            "title": storedNote.title,
            "body": storedNote.body,
            "date": storedNote.date
        })
        navigate(`/notes/${noteId}`);
    }
   
    const storeNote = (field, value) => {
        if (field === "title") {
            setStoredNote({ ...storedNote, title: value });
            return;
          }
        else if (field === "body") {
          setStoredNote({ ...storedNote, body: value });
        }
        else
        {
            setStoredNote({ ...storedNote, date: value });
        }
    };
    
    const handleDelete = () => {
        let editId = editedNote().id;
        const answer = window.confirm("Are you sure?");
        if (answer) 
        {
            deleteNote(editId);
            if(notes.length>1)
            {
                navigate("/notes/1");
            }
            else{
                navigate("/notes");
            }
        }

    }
    let noteTitle = editedNote().title;
    let noteBody = (editedNote().body).replace(/<p><br><\/p>/g,"");
    let noteDate = editedNote().date;
    
    return(
        <>
        <Sidebar sidebarStatus = {sidebarStatus} notes = {notes} deleteNote = {deleteNote} getEditedNote = {editedNote} addNote = {addNote} setEdited = {setEdited} editNote = {editNote}  />
        <div class={`noteEditor ${!sidebarStatus ? 'sidebar-close' : ''}`}>
            <div class ="noteEditorHead">
                <input id = "noteTitle" onChange={(event) => storeNote("title", event.target.value)} defaultValue = {noteTitle}></input>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={(event) => saveNote()}>Save</button>
                <input type="datetime-local" onChange={(event) => storeNote("date",new Date(event.target.value))} defaultValue={formatDateTime(noteDate)} />
            </div>
            <ReactQuill theme="snow" placeholder="Your Note Here" onChange={(value) => storeNote("body", value)} defaultValue = {noteBody}  />
        </div>
        
        </>
    );
}
export default NoteEdit;

