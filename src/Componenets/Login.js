import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const userEmailRef = useRef(null)
  const userPasswordRef = useRef(null)
  const logIn = (e) => {
    e.preventDefault();
    const email = userEmailRef.current.value;
    const password = userPasswordRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <>
      <div className="container">
        <div className='logo_div' >
          <img alt="logo" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" />
          <h2 className='tag_line' >Facebook helps you connect and share with the people in your life.</h2>
        </div>
        <div className="form_element">
          <form onSubmit={logIn} >
            <div className="inputs">
              <input ref={userEmailRef} type="email" placeholder='Enter your email address' />
            </div>
            <div className="inputs">
              <input ref={userPasswordRef} type="password" placeholder='Password' />
            </div>
            <div className="inputs">
              <button type="submit" className='btn'>
                Log In
              </button>
            </div>
          </form>
          <div className='border_bottom' ></div>
          <div className='create_acc_btn' >
            <Link to='/signup' >Create New Account</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
