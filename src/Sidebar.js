import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";


function Sidebar(props){
    let notes = props.notes;
    let editedNote = props.getEditedNote; // getter
    let editNote = props.editNote; // to edit notes
    let setEdited = props.setEdited;
    let addNote = props.addNote;
    let sidebarStatus = useOutletContext();
    
    const navigate = useNavigate();
    const addNoteSide = () => {
        navigate(`/notes/${1}/edit`);
    }

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
   
    return(
        <>
        <div class = "underHead">
        {sidebarStatus && (
            <div class="sidebar">
                <nav>
                    <div class = "sidebarhead">
                        <h2>Notes</h2>
                        <button id="addNote" onClick={() => { addNoteSide(); addNote(); }}>+</button>
                    </div>
                    {/* {     
                        notes?.length null:<p id = "noteList">No Note Yet</p>
                    }   
                    <ul class="notesList">
                        {notes.map((note, index) => (
                            <li key={index}>{note}<p>...</p></li>
                        ))}
                    </ul> */}
                    {(!editedNote) && <p id="noteList">No Note Yet</p>}
                    {/* {editedNote && notes && notes.length > 0 && (
                        <ul className="notesList">
                            {notes.map(({id, title, body, noteNumber}, i) => (
                                <li key={id} onClick={() => setEdited(id)}>
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </li>
                            ))}
                        </ul>
                    )} */}
                    
                    {notes.length > 0 && (
                        <ul className="notesList">
                            {notes.map(({id, title, body, date}, index) => (
                                <Link to ={`/notes/${index+1}`} style={{ textDecoration: 'none' }}>
                                <li key={id} className = {`sidebarNote ${id === editedNote().id && "active" }`} onClick={() => setEdited(id)}>
                                    <h3>{title}</h3>
                                    <span>{formatDate(date)}</span>
                                    <p dangerouslySetInnerHTML={{__html: `${body.substr(0,90)}...`}}></p>
                                </li>
                                </Link>
                            ))}
                        </ul>
                    )}

                </nav>
            </div>
            )}                            
        </div>
        </>
    );
}
export default Sidebar;