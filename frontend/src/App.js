import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Route  } from "react-router-dom"
import {Home, CreateNote , EditNote, Login} from "./pages"

function App() {

  const userInfo = useSelector((state) => state.userInfo);
  const userLogin = userInfo;


  return (
    <BrowserRouter>  
      <Route path="/" exact >
        {userLogin ? <Home /> : <Login />}
      </Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/create-note">
        {userLogin ? <CreateNote /> : <Login />}
      </Route>
      <Route path="/edit-note/:id">
        {userLogin ? <EditNote /> : <Login />}
      </Route>
    </BrowserRouter>
  );
}

export default App;
