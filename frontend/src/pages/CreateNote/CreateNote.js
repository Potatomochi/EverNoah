import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import Header from '../../components/header/Header';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import "./createnote.css";
import 'react-quill/dist/quill.snow.css';
import { createNote } from '../../actions/noteActions';

function CreateNote(props) {
    const [noteText , setNoteText] = useState({ops: []})
    const [noteTitle , setNoteTitle] = useState("")
    const [noteDesc , setNoteDesc] = useState("")
    
    const toolbarModules ={ toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }
    const dispatch = useDispatch();

    const createNoteHandler = () => {
        dispatch(
            createNote({
                title : noteTitle,
                desc : noteDesc,
                content : noteText
            })
        ).then(
            props.history.push("/")
        )    
    }

    const updateBody = async(value,delta,source,editor) => {
        await setNoteText(editor.getContents());
    }

    return (
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
            <button className="submitButton" onClick={createNoteHandler}>Create Note!</button>
            </div>       

        </div>
        </>
    )
}

export default CreateNote
