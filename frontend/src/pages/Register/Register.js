import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useHistory} from 'react-router-dom';
import { register } from '../../actions/userActions';


import "../Login/Login.css"
function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");   
    

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    let history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert('Password and confirm password are not match');
        } else {
          dispatch(register(username, email, password));
        }
      };

    useEffect(() => {
        if (userInfo) {
          history.push("/");
        }
      }, [history, userInfo]);
    return (
        <div>
                <div className="loginContainer">
                    <div className="loginWrapper">
                        <div className="loginLeft">
                        <h3 className="loginLogo">Boiled Goose Inc.</h3>
                        <span className="loginDesc">
                            Connect with friends and the world around you on Boiled Goose Inc.
                        </span>
                        {loading && "Loading"}
                        {error && "Error , check credentials"}
                        </div>
                        <div className="loginRight">
                        <form className="loginBox" onSubmit={submitHandler}>
                            <input placeholder="Username" required value={username} onChange={(e)=> setUsername(e.target.value)} className="loginInput"/>
                            <input placeholder="Email" type="email" required value={email} onChange={(e)=> setEmail(e.target.value)} className="loginInput"/>
                            <input placeholder="Password" type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} className="loginInput"/>
                            <input placeholder="Confirm Password" type="password" required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} className="loginInput"/>
                            <button className="loginButton" type="submit">
                            Sign Up
                            </button>
                            <Link to="/login"><button className="loginRegisterButton">Log into Account</button></Link>
                        </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Register
