import React, { useState, useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import './Feed.css';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Post from './Post';
import { firebaseConfig } from './firebase'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';

function Feed() {
  //----------------------------------------------------------------
  // Initialize Firebase
  initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore();

  //Add something to the database
  const colRef = collection(db, 'posts');

  //----------------------------------------------------------------

  const user = useSelector(selectUser);

  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
      })).sort((a, b) => b.data.timestamp - a.data.timestamp)
    ))
    .catch(err => console.log(err.message));
  }, [posts]);

  
  const sendPost = (event) => {
    event.preventDefault();
    addDoc(colRef, {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoURL || '',
        timestamp: Date.now()
    })
    .then(() => {
      setInput('');
      console.log(posts[0].timestamp)
    })
};

  return (
    <div className='feed'>
      <div className='feed__inputContainer'>
        <div className='feed__input'>
          <CreateIcon />
          <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} type='text'/>
            <button type='submit' onClick={sendPost}>Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption Icon={CalendarTodayIcon} title="Write Article" color="#7FC15E" />
        </div>
      </div>
      <FlipMove>
      {posts.map(({ id, data: { name, description, message, photoUrl, timestamp } }) => (
        <Post
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl}
        />
      ))}
      </FlipMove>
    </div>
  )
}

export default Feed;

