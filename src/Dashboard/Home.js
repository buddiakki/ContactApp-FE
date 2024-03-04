import React  from 'react'
import Sidebar from './sideBar'
import TopBar from './topBar'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Card, Avatar } from "antd";
import {
  FileTextOutlined,
  VideoCameraOutlined,
  ContactsOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const cardStyle = {
    width: 200,
    textAlign: "center",
    color: "white",
    borderRadius: "8px",
    transition: "transform 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const UserName = localStorage.getItem('UserNmae');

  return (
    <Box sx={{ display: 'flex' }} >
       <CssBaseline />
       <TopBar/>
      <Sidebar/>
      <div
      style={{
        // padding: "20px",
        // background: "linear-gradient(to right, #74ebd5, #acb6e5)",
        width:'100%',
        marginRight: '-10%',
        marginLeft:  '-10%',
        overflow:'hidden'
      }}
    >
      <div>
        <h1 style={{ color: "#000", textAlign: "center" }}>
          Welcome {UserName}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          // padding: "20px",
          marginTop:'40px'
        }}
      >
        <Card
          title="Movies"
          style={{
            ...cardStyle,
            background: "linear-gradient(to right, #f3a683, #f19066)",
          }}
          hoverable
          onClick={()=>{
            navigate(`/ContactApp-FE/Movies`)
          }}
        >
          <Avatar size={60} icon={<FileTextOutlined style={{fontSize:'40px'}} />} />
        </Card>

        <Card
          title="Videos"
          style={{
            ...cardStyle,
            background: "linear-gradient(to right, #00b894, #00cec9)",
          }}
          hoverable
          onClick={()=>{
            navigate('/ContactApp-FE/Videos')
          }}
        >
          <Avatar size={60} icon={<VideoCameraOutlined style={{fontSize:'40px'}}/>} />
        </Card>

        <Card
          title="Contacts"
          style={{
            ...cardStyle,
            background: "linear-gradient(to right, #0984e3, #6c5ce7)",
          }}
          hoverable
          onClick={()=>{
            navigate('/ContactApp-FE/Contacts');
          }}
        >
          <Avatar size={60} icon={<ContactsOutlined  style={{fontSize:'40px'}} />} />
        </Card>

        <Card
          title="Text to Speech"
          style={{
            ...cardStyle,
            background: "linear-gradient(to right, #6a0572, #ab83a1)",
          }}
          hoverable
          onClick={()=>{
            navigate('/ContactApp-FE/Text-To-Speech')
          }}
        >
          <Avatar size={60} icon={<AudioOutlined style={{fontSize:'40px'}} />} />
        </Card>
      </div>
    </div>
    </Box>
      
  )
}


