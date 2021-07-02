import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import noteRoute from "./routes/NoteRoute.js";
import userRoute from "./routes/UserRoute.js";

// setup
dotenv.config();
const app = express();
const port = process.env.PORT ;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
}});

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//mongoose SetUp
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/' , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
})

//Routes
app.use("/api/notes", noteRoute)
app.use("/api/users", userRoute)

app.get('/',(req,res) => {
  res.send('Server is ready');
});

app.use((err,req,res,next) =>{
  res.status(500).send({ message: err.message });
})

app.listen(port , () =>{
  console.log("Server is up on " + port)
})