import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
import { deleteNote } from '../../actions/noteActions';
import "./notecard.css";

function NoteCard(props) {
    const {note} = props;
    const dispatch = useDispatch();
    const noteId = note._id
    const deleteHandler = () => {
        dispatch(deleteNote(noteId)).then(
            window.location.reload()
        )
    }

    return (
        <div key={note._id} className="noteContainer">
            <div className="noteInner">
                <div className="noteLeft">
                    <div className="noteTitle">
                        <h3>{note.title}</h3>
                    </div>
                    <div className="noteDescription">
                        <p>{note.desc}</p>
                    </div>
                    <div className="noteDate">
                        <p>{format(note.createdAt)}</p>
                    </div>
                </div>
                <div className="noteRight">
                    <Link to={`/edit-note/${note._id}`}>
                    <button className="noteCardButton">Edit</button>
                    </Link>
                    <button className="noteCardButton" onClick={deleteHandler}>Delete</button>
                </div>

            </div>
        </div>
    )
}

export default NoteCard
