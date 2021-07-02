import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { noteCreateReducer, noteDeleteReducer, noteDetailsReducer, noteListReducer, noteUpdateReducer } from './reducers/noteReducer';
import { userDetailsReducer, userRegisterReducer, userSignInReducer } from './reducers/userReducer';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null,
};

const reducer = combineReducers({
    userSignIn: userSignInReducer,
    userInfo: userDetailsReducer,
    userRegister: userRegisterReducer,
    noteDetails: noteDetailsReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    noteList: noteListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );

  
export default store;