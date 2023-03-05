import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Note(props){
    let notes = props.notes;
    let deleteNote = props.deleteNote; // function to remove a note from array
    let editedNote = props.getEditedNote; // getter
    let editNote = props.editNote; // to edit notes
    let setEdited = props.setEdited;
    let addNote = props.addNote;
    let sidebarStatus = useOutletContext();
    const navigate = useNavigate();
    const {noteId} = useParams(); 
    
    if(!editedNote()){
        return(
            <>
            <Sidebar sidebarStatus = {sidebarStatus} notes = {notes} deleteNote = {deleteNote} getEditedNote = {editedNote} addNote = {addNote} setEdited = {setEdited} editNote = {editNote}/>
            <div class = "noteBodyNone">
                <p id = "noNote">Select a note or create a new one.</p>
            </div>
            </>
        )
    }
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
    let date = editedNote().date;

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }; 

    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };

    const editNoteNav = () => {
        navigate(`/notes/${noteId}/edit`);
    }
    return(
        <>
        <Sidebar sidebarStatus = {sidebarStatus} notes = {notes} deleteNote = {deleteNote} getEditedNote = {editedNote} addNote = {addNote} setEdited = {setEdited} editNote = {editNote} />
        <div class={`noteView ${!sidebarStatus ? 'sidebar-close' : ''}`}>
            <div class ="noteHead">
                <h2 id = "noteTitle">{noteTitle}</h2>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={(event) => editNoteNav()}>Edit</button>
                <p>{formatDate(date)}</p>
            </div>
            <div class = "noteBodyView">
                <p dangerouslySetInnerHTML={{__html: noteBody}}></p>
            </div>
        </div>
        </>
    );
}
export default Note;