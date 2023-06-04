import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../../firebase';

import "./Register.css"
function Register() {
  const history = useNavigate ();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confrmpassword,setConfrmpassword]=useState("");
  const [username,setUsername]=useState('')
  const [error,setError]=useState("")
  const [showerror,setShowerror]=useState(false)
  const register = e=>{

    e.preventDefault();
    if(password !== confrmpassword){
        setShowerror(true);
      return setError("Confirm password and password do not match")
    }
    setShowerror(false);
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((auth) => {
        // it successfully created a new user with email and password
        var userRef = db.collection("users").doc(auth.user.uid);
        // use to add custom data variables of user 
        userRef.set({
          username:username
        });
        if (auth) {
            history('/')
        }
        // console.log(auth.user.displayName)
    })
    .catch(error => alert(error.message))
  }

  return (
    <div className='register_page'>
    <div className="register_page_info">
        <h1>Handmade Haven</h1>
          <p className="info_body">Handmade Haven is an online marketplace specializing in unique, high-quality handmade goods. 
          We offer a wide selection of handmade products, including clothing, accessories, jewelry, and home decor, 
          from independent artisans and crafters.
          Our website is a welcoming community for people who appreciate the beauty and value of handmade items.</p>
    </div>
    <div className='register_container'>
    <h2 className='register_page_header'>Register</h2>
    <form >
      <input className='rinput_style' type="text" placeholder='Username' value={username}  onChange={e => setUsername(e.target.value)}/>
      <input className='rinput_style' type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <input className='rinput_style' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <input className='rinput_style' type="password" placeholder='Confrom Password'  value={confrmpassword} onChange={e => setConfrmpassword(e.target.value)}/>
      {showerror && <label style={{color:"red"}}>*{error}</label>}
      <button type='submit' className='signIn_btn' onClick={register}>sign in</button>
      <h5 onClick={(e) =>{history("/login")}}>Already have an account?</h5>
    </form>
    </div>
    </div>
  )
}

export default Register