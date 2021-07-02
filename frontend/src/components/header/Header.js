import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import "./header.css";
import { signout } from '../../actions/userActions';

function Header() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(signout());
    }
    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <Link to="/">
                <h2 className="logo">EverNoah</h2>
                </Link>
            </div>
            <div className="headerRight">
                <Link to="/create-note">
                    <div className="addContainer">
                        <AddIcon className="addIcon"/>
                        <button className="addButton"> Add Note </button>
                    </div>
                </Link>
                <button className="logoutButton" onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Header
