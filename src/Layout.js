import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { uuid } from 'react-uuid';
import { useParams } from "react-router-dom";

function Layout(props){
    let notes = props.notes;
    let deleteNote = props.deleteNote; // function to remove a note from array
    let editedNote = props.getEditedNote; // getter
    let editNote = props.editNote; // to edit notes
    let setEdited = props.setEdited;
    let addNote = props.addNote;
    let length = props.getNoteslength;
    const [sidebarStatus,setSidebarStatus] = useState(true);
    const toggleSidebar = () => {
        setSidebarStatus(!sidebarStatus)
    }

    const {noteId} = useParams(); 
    // Find the note with the noteId parameter and set it as the initial value of edited
    useEffect(() => {
        if (noteId) {
        const editedNote = notes[noteId-1];
            if (editedNote) {
                setEdited(editedNote.id);
                console.log("if")
            }
        }
            else{
                console.log("else")
                setEdited(false);
            }
        console.log(editedNote())
    }, [notes, noteId]);

    return(
        <>
        <div class="header">
            <nav>
                <ul>
                    <li><button onClick={toggleSidebar} id="menu">&#9776;</button></li>
                    <div class = "title">
                        <li><h1 id="headtitle">Lotion</h1></li>
                        <li><h5 id="subtitle">Like Notion, but worse.</h5></li>
                    </div>
                    
                </ul>
            </nav>
        </div>
        <div class = "underHead">
            <Outlet context={sidebarStatus}/>
        </div>
        </>
    );
}
export default Layout;