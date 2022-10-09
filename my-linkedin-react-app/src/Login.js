import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseConfig } from './firebase'
import { initializeApp } from "firebase/app";
import { login } from './features/userSlice'
// import { getFirestore } from "firebase/firestore";

function Login() {
  //----------------------------------------------------------------
  // Initialize Firebase
  initializeApp(firebaseConfig);

  //Get auth service from Firebase
  const auth = getAuth();

  //const db = getFirestore();

  //----------------------------------------------------------------

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (!name) {
      return alert('Please enter a full name');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profilePic,
        })
        .then(() => {
            console.log('User updated successfully');
            dispatch(login({
              email: userAuth.user.email,
              uId: userAuth.user.uid,
              displayName: name,
              photoURL: profilePic
            }))

            setProfilePic('');
            setName('');
            setEmail('');
            setPassword('');
          })
        .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  }

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userAuth) => {
        console.log(userAuth);

        dispatch(login({
          email: userAuth.user.email,
          uId: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          photoURL: userAuth.user.photoURL
        }))

        setProfilePic('');
        setName('');
        setEmail('');
        setPassword('');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='login'>
      
      <img 
        src='https://cdn-icons-png.flaticon.com/512/174/174857.png' 
        alt='linkedIn Logo' 
      />

      <form>
        <input type='text' placeholder='Full name (required if registering)' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='Profile pic URL (Optional)' value={profilePic} onChange={(e) => setProfilePic(e.target.value)}/>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type='submit' onClick={loginToApp}>Sign In</button>
      </form>

      <p>
        Not a member? 
        <span className='login__register' onClick={handleRegister}> Register Now</span>
      </p>
    </div>
  )
}

export default Login