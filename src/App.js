import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import LogIn from './Screens/AuthScreen';
// import Home from './Dashboard/Home'
import Home from "./Dashboard/Home";
import Movies from "./Screens/movies";
import ToDo from "./Screens/to-do";
import Contacts from "./Screens/Contacts";
import TextTospeech from "./Screens/texttospeech";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Movies" element={<Movies/>} />
        <Route path="/Videos" element={<ToDo/>} />
        <Route path="/Contacts" element={<Contacts/>} />
        <Route path="/Text-To-Speech" element={<TextTospeech/>} />
      </Routes>
    </Router>
  );
};

export default App;
