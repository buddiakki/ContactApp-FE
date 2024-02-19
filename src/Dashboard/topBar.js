import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from 'antd';
import axios from 'axios';

const drawerWidth = 240;
const UserName = localStorage.getItem('UserNmae');

export default function PermanentDrawerLeft() {

    const [userImage, setUserImage] = useState('');
    const token = localStorage.getItem('accessToken')

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    useEffect(() => {
      const fetchUserImage = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/users/get-image',{headers});
               
              
          if (response.status !== 200) {
            console.error('Error fetching Image');
            return;
          }
  
          const data = response.data;
          console.log(data.imageUrl);
          setUserImage(data.imageUrl);
        } catch (error) {
          console.error('Error fetching user image:', error.message);
        }
      };
  
      fetchUserImage();
    }, []);
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleProfile = () => {
    console.log('Profile clicked');
  };
  

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: 100, background: '#f4f3ff',zIndex:1 }}
    >
      <Toolbar>
        <IconButton onClick={handleMenuClick} edge="start" color="inherit" sx={{ marginLeft: 'auto',gap:'5px',marginTop:'10px' }}>
          <Avatar src={userImage} alt={UserName ? UserName[0].toUpperCase() : ''}/>
           
         <Typography >{UserName}</Typography>
         
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
