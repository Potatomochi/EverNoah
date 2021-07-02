import { React , useEffect } from 'react'
import Header from '../../components/header/Header';
import NoteCard from '../../components/noteCard/NoteCard';
import { useSelector , useDispatch } from 'react-redux';
import "./home.css"
import { listNotes } from '../../actions/noteActions';


function Home() {
    const dispatch = useDispatch();
    const noteList = useSelector((state) => state.noteList);
    const { loading, error, notes } = noteList;

    useEffect(() => {
        dispatch(listNotes({}));
      }, [dispatch]);
    return (
        <> 
        <Header />
        <div className="homeContainer">
        {loading ? 
        (<p>Still Loading</p>) :
         error ? (<p>Error</p>) : 
         (
             <>
            {notes.map((note) =>(
                <NoteCard key={note.id} note={note}></NoteCard>
            ))}
            </>
         )}


        </div>
        </>
    )
}

export default Home
