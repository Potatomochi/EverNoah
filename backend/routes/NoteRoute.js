import express from 'express';
import Note from '../model/NoteModel.js';

const noteRoute = new express.Router();

noteRoute.get('/' , async(req, res) => {
    const notes = await Note.find({});
    res.send({notes})
})

noteRoute.get('/:id' , async(req,res) => {
    const note = await Note.findById(req.params.id)
    if (note) {
        res.send(note)
    } else{
        res.status(404).send({message:'Error: note not found!'})
    }
})

noteRoute.post('/' , async(req,res) => {
    const noteDetails = req.body
    const note = new Note({
        title: noteDetails.title,
        desc : noteDetails.desc,
        content : noteDetails.content
    });
    const createdNote = await note.save();
    res.send({message: 'Note Created!', note: createdNote})
});

noteRoute.delete("/:id" , async (req,res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        const deleteNote = await note.remove();
        res.send({ message:'Note deleted!' , note: deleteNote})
    } else {
        res.status(404).send({ message: 'Note not found! ' })
    }
});
noteRoute.put('/:id', async (req,res) => {
    const noteId = req.params.id;
    const note = await Note.findById(noteId)
    if (note) {
        note.title = req.body.title,
        note.content = req.body.content,
        note.desc = req.body.desc;
        const updatednote = await note.save();
        res.send({ message: 'note Updated' , note: updatednote })
    } else {
        res.status(404).send({ message: 'note not found! ' })
    }
});

export default noteRoute;