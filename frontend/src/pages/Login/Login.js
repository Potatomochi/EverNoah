import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from '../../actions/userActions';
import "./Login.css"

function Login() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo, loading, error } = userSignIn;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(signIn(email, password));
    };

    useEffect(() => {
      if (userInfo) {
        window.location.reload();
      }
    }, [ userInfo]);

    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">EverNoah</h3>
                    <span className="loginDesc">
                        A personal Note Taking App for College & Code 
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="email" placeholder="Email" className="loginInput" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" className="loginInput" minLength="6" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className="loginButton" onClick={submitHandler} disabled={loading}>{loading ? "Loading" : "Log In"}</button>
                        {error && ({error})}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
