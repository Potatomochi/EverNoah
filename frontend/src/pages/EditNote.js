import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/header/Header';
import {detailsNote, updateNote} from "../actions/noteActions";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import 'react-quill/dist/quill.snow.css';
import {NOTE_UPDATE_RESET} from "../constants/noteConstants";



function EditNote(props) {
    const noteId = props.match.params.id;
    const [noteText , setNoteText] = useState("")
    const [noteTitle , setNoteTitle] = useState("")
    const [noteDesc , setNoteDesc] = useState("")
    const [editNoteText , setEditNoteText] = useState("")
    

    const toolbarModules ={ toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }

    const dispatch = useDispatch();

    const noteDetails = useSelector((state) => state.noteDetails);
    const { loading, error, note } = noteDetails;
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = noteUpdate;

    useEffect(() => {
        if (successUpdate) {
          props.history.push('/');
        }
        if (!note || note._id !== noteId || successUpdate) {
          dispatch({ type: NOTE_UPDATE_RESET });
          dispatch(detailsNote(noteId));
        } else {
            setNoteText(note.content)
            setNoteTitle(note.title)
            setNoteDesc(note.desc)
        }
      }, [note, dispatch, noteId, successUpdate, props.history]);


      const updateBody = async(value,delta,source,editor) => {
       await setNoteText(value)
       await setEditNoteText(editor.getContents());
       
    }

    const editNoteHandler = () => {
      dispatch(
        updateNote({
          _id: noteId,
          title: noteTitle,
          desc : noteDesc , 
          content: editNoteText
      }))
    }

    return (
        <>
        {loading ? (
          <p>Loading</p>
        ) : error ? (
          <p>Error with displaying notes {error}</p>
        ) : (
          <>
          <Header />
          <div className="editingContainer">
              <BorderColorIcon className="editingIcon"></BorderColorIcon>
              <input className="editingTitle" placeholder="What's the Title of this note?" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}></input>
              <input className="editingTitle" placeholder="How would you describe this note?" value={noteDesc} onChange={(e) => setNoteDesc(e.target.value)}></input>       
              <div className="quillEditor">
              <ReactQuill theme="snow" 
              onChange={updateBody} modules={toolbarModules} 
              value = {noteText} 
              ></ReactQuill>
              <button className="submitButton" onClick={editNoteHandler}>Edit Note!</button>
              </div>    
              {loadingUpdate && (<p>Loading</p>)}
              {errorUpdate && (<p>Error updating document {errorUpdate}</p>)}
          </div>
          </>
        )
       }

        </>
    )
}

export default EditNote
