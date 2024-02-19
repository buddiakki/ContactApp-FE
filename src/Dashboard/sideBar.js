import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ContactsIcon from '@mui/icons-material/Contacts';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Logo from "../assets/akhil_log-removebg-preview.png";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/Home" },
  { label: "Movies", icon: <MovieCreationIcon />, path: "/Movies" },
  { label: "Videos", icon: <OndemandVideoIcon />, path: "/Videos" },
  { label: "Contacts", icon: <ContactsIcon />, path: "/Contacts" },
  {label: "Text-To-Speech", icon: <RecordVoiceOverIcon />, path: "/Text-To-Speech"}
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path) => {
    navigate(path);
  };


  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        zIndex:1
      }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ background: '#F4F3FF', height: '100%' }}>
      <Toolbar
        // sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
      <img
        src={Logo}
        alt="logo"
        className="moving-logo"
      />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={location.pathname === item.path}
            onClick={() => handleItemClick(item.path)}
            style={{
              backgroundColor:
                location.pathname === item.path ? "#3a8378" : "initial",
              color: location.pathname === item.path ? "white" : "initial",
              margin: '0 10px',
              borderRadius: 9,
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "white" : "initial",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      </div>
    </Drawer>
  );
}

export default Sidebar;