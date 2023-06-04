import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { Link } from 'react-router-dom'
import { auth } from '../../firebase';
import {AiFillCaretRight} from "react-icons/ai"
function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [showforgotpassword, setShowforgotpassword] = useState(false)
  const signIn = e => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        history('/')
      })
      .catch(error => alert(error.message))
  }
  const forgotPassword = e => {
    setShowforgotpassword(true);
  }
  const resetPassword = e => {
    e.preventDefault();
    auth.sendPasswordResetEmail(email)
      .then(auth => {
        setSuccess(true);
      })
      .catch(error => alert(error.message))
  }
  const setLogin = e => {
    setShowforgotpassword(false);
    setSuccess(false);
  }

  return (
    <div className="login_container">
    <div className="login_left">
      <img
        className="right_img"
        src="https://cdn.shopify.com/s/files/1/0924/6362/files/Rectangle_264_d3ddbed3-9b21-4026-b596-1c601a7e0b94.png?v=1677759971&width=1000"
        alt=""
        srcset=""
      />
    </div>
    <div className="login_right">
      <div className="login_right_up">
        <div className="login_form">
        {success && <h2>check inbox for furthor info. <span onClick={setLogin} title="for login click here">login</span></h2>}
        {!showforgotpassword ? <h1 className='login_header'>SIGN IN</h1> : <h1 className='login_header'>Reset Password</h1>}
        <input type='text' value={email} onChange={e => setEmail(e.target.value)} className='input_style' placeholder='*Email' />
        {!showforgotpassword && <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='input_style' placeholder='*Password' />}
        <br />
        {/* {!showforgotpassword ? <button type='submit' className='login_btn' onClick={signIn} onMouseEnter={(e) => { setStyle(true) }} onMouseLeave={(e) => { setStyle(false) }}>login {<span style={style ? styles2 : styles1}><AiOutlineArrowRight className='arrow'/></span>}</button> :
          <button type='submit' className='reset_btn' onClick={resetPassword}>Reset Password</button>} */}
          {!showforgotpassword && <h5 onClick={forgotPassword}>forgot password?</h5>}
          {!showforgotpassword ? <button type='submit' className='login_btn' onClick={signIn} >Sign In</button> :
          <button type='submit' className='reset_btn' onClick={resetPassword}>Reset Password</button>}
          {showforgotpassword && <h4 onClick={()=>{window.location.reload()}}>login</h4>}
        </div>
      </div>
      <div className="login_right_down">
      <div className="register_form">
        <h1 className='register_header'>REGISTER</h1>
        <p className='register_info'>Create an account to expedite future checkouts, view and update your account details, track your order status, and history.</p>
        <Link to='/register'>
          <button className='register_btn' >Register</button>
        </Link>
      </div>
      </div>
    </div>
  </div>
  )
}

export default Login