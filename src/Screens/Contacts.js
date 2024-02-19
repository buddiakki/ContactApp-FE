import React, { useState, useEffect } from 'react';
import Sidebar from '../Dashboard/sideBar';
import TopBar from '../Dashboard/topBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { notification } from 'antd';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal,Typography } from '@mui/material';


export default function Contacts() {
  const token = localStorage.getItem('accessToken');
  const [errorMessage, setErrorMessage] = useState(null);
  const [contactDetails, setContactsDetails] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [editformData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIconSuccess = (type) => {
    api[type]({
      message: 'Contact Added Successfully',
      description:
        'Contact Added to Data Base',
    });
  };

  const openNotificationWithIconSuccess2 = (type) => {
    api[type]({
      message: 'Contact Deleted Successfully',
      description:
        'Success',
    });
  };

  const openNotificationWithIconError = (type) => {
    api[type]({
      message: 'Error Saving the Contact',
      description:
        `${errorMessage}`,
    });
  };

  const openNotificationWithIconError2 = (type) => {
    api[type]({
      message: 'Error deleting the contact',
      description:
        `${errorMessage}`,
    });
  };

  const openNotificationWithIconError3 = (type) => {
    api[type]({
      message: 'Error Updating the contact',
      description:
        `${errorMessage}`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      const response = await fetch("http://localhost:5001/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
        body: JSON.stringify(formData),
      });
      
      if (response.status === 201) {
        console.log('Form submitted successfully:', formData);
        openNotificationWithIconSuccess('success');
      } else {
        console.error('Error submitting form:', response.data);
        setErrorMessage(response.data);
        openNotificationWithIconError('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const GetContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/contacts',{headers});
      
      if (response.status !== 200) {
        // openNotificationWithIconError2('error');
        console.log(response?.data);
       
      } else {
        const data = response?.data;
        console.log(data);
        setContactsDetails(data);
        // openNotificationWithIconSuccess2('success');
       
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }

  }

  useEffect(() => {
    GetContacts();
  }, []);


  const handleDeleteIconClick = async (contact) => {

      try {
        const response = await axios.delete(`http://localhost:5001/api/contacts/${contact._id}`,{headers});
        
        if (response.status !== 200) {
          openNotificationWithIconError2('error');
          console.log(response?.data);
          setErrorMessage(response?.data);
        } else {
          const data = response?.data;
          console.log(data);
          openNotificationWithIconSuccess2('success');
        }
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
  }


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', editId._id);
    try {
      const response = await fetch(`http://localhost:5001/api/contacts/${editId._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
        body: JSON.stringify(editformData),
      });
      
      if (response.status === 200) {
        console.log('Form submitted successfully:', formData);
        // openNotificationWithIconSuccess('success');
        GetContacts();
        handleClose();
      } else {
        console.error('Error submitting form:', response.data);
        setErrorMessage(response.data);
        openNotificationWithIconError('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  const handleOpen = async (contact) => {
    setOpen(true);
    console.log('edit button is clicked')

    try {
      const response = await axios.get(`http://localhost:5001/api/contacts/${contact._id}`,{headers});
      
      if (response.status !== 200) {
        // openNotificationWithIconError2('error');
        console.log(response?.data);
        setErrorMessage(response?.data);
      } else {
        const data = response?.data;
        console.log(data,'api responce');
        setEditFormData({name: data.name, email: data.email, phone: data.phone});
        console.log(editformData);
        setEditId(data); 
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
    
  };




  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <Box>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar />
      <Sidebar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop:'250px'
          }}
        >
          {contextHolder}
          <h1>Add Contact</h1>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
        
    </Box>
    {contactDetails.length !== 0 &&
    <TableContainer component={Paper} style={{ padding: '20px', borderRadius: '10px', background: '#3a8278', overflowX: 'auto', marginTop: '40px', marginLeft: '200px',width:'80%', height:'40%' }}>
      <Table style={{ width: '100%',overflowX: 'auto' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactDetails?.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact?.name}</TableCell>
              <TableCell>{contact?.email}</TableCell>
              <TableCell>{contact?.phone}</TableCell>
              <TableCell>
                <IconButton style={{ cursor: 'pointer' }}>
                  <DeleteIcon onClick={()=>{handleDeleteIconClick(contact)}} />
                </IconButton>
                <IconButton style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={()=>{handleOpen(contact)}} >
                  <ModeEditOutlineIcon  />
                </IconButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                <form onSubmit={handleEditSubmit} style={{ width: '100%' }}>
                   <Grid container spacing={2}>
                    <Grid item xs={12}>
                       <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={editformData.name}
                        onChange={handleChange1}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={editformData.email}
                        onChange={handleChange1}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={editformData.phone}
                          onChange={handleChange1}
                          required
                        />
                      </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                     >
                    Edit
                    </Button>
                    </form>
                  </Box>
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }


    </Box>
    
  );
}
