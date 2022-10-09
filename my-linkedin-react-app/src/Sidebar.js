import React from 'react';
import './Sidebar.css';
import { Avatar } from '@mui/material';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';

function Sidebar() {
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <img src='https://media-exp1.licdn.com/dms/image/C4E16AQHAtF9xMmZlqw/profile-displaybackgroundimage-shrink_350_1400/0/1663713829690?e=1670457600&v=beta&t=Afy9UR3__KA7BimCmT3SA4JbzL1PoJgfWvbrkGcZyBg' alt='background-gil' />
        <Avatar className='sidebar__avatar' src={user.photoURL} />
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className='sidebar__stats'>
        <div className='sidebar__stat'>
          <p>Who viewed you</p>
          <p className='sidebar__statNumber'>
            2,547
          </p>
        </div>
        <div className='sidebar__stat'>
        <p>Views on post</p>
          <p className='sidebar__statNumber'>
            2,127
          </p>
        </div>
      </div>

      <div className='sidebar__bottom'>
        <p>Recent</p>
        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('application')}
        {recentItem('blockchain')}
        {recentItem('web3')}
      </div>
    </div>
  )
}

export default Sidebar