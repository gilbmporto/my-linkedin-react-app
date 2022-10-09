import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './firebase'
import { initializeApp } from "firebase/app";
import { selectUser, logout, login } from './features/userSlice'
import { useDispatch } from 'react-redux';

function App() {
  //----------------------------------------------------------------
  // Initialize Firebase
  initializeApp(firebaseConfig);

  //Get auth service from Firebase
  const auth = getAuth();

  //----------------------------------------------------------------

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL
        }));
      } else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">

      {/* Header */}
      <Header />

      {!user ? 
          <Login /> 
      : (
        <div className="app_body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
      
    </div>
  );
}

export default App;
