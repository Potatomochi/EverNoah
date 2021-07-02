import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title : {type: String},
    desc : {type: String},
    content : {type: Object},
}, {timestamps: true})

const Note = mongoose.model("Note" , noteSchema);
export default Note;