import React from 'react'
import './HeaderOption.css';
import { Avatar } from '@mui/material';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';

function HeaderOption({ avatar, Icon, title, handleClick }) {
  const user = useSelector(selectUser);

  return (
    <div className='headerOption' onClick={handleClick}>
      {Icon && <Icon className='headerOption__icon' />}
      {avatar && (
        <Avatar className='headerOption__icon' src={user && user.photoURL}>{user?.email[0]}</Avatar>
      )}
      <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOption