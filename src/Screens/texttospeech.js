import React, { useState, useEffect } from 'react';
import Sidebar from '../Dashboard/sideBar';
import TopBar from '../Dashboard/topBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import femaleVoiceImage from "../assets/women.png";
import maleVoiceImage from "../assets/man.png";
import kidVoiceImage from "../assets/kid picture.png";

export default function Texttospeech() {
    const [voices, setVoices] = useState([]);
  
    useEffect(() => {
      const speechSynthesis = window.speechSynthesis;
      setVoices(speechSynthesis.getVoices());
      speechSynthesis.onvoiceschanged = () =>
        setVoices(speechSynthesis.getVoices());
    }, []);
  
    const handleSpeak = (voice) => {
      const text = document.getElementById("textToSpeak").value;
      const speechSynthesis = window.speechSynthesis;
      const speech = new SpeechSynthesisUtterance();
  
      speech.text = text;
      speech.lang = "en-US"; // Set the language
      speech.volume = 1; // Set the volume (0 to 1)
      speech.rate = 1; // Set the rate (0.1 to 10)
      speech.pitch = 1; // Set the pitch (0 to 2)
  
      // Set the voice
      speech.voice = voices.find((v) => v.name === voice);
  
      speechSynthesis.speak(speech);
    } 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar />
      <Sidebar />
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Enter the Text To Convert into Speech</h1>
          <input
            type="text"
            id="textToSpeak"
            style={{
              marginRight: "10px",
              padding: "10px",
              fontSize: "16px",
              marginTop:'20px'
            }}
          />
          {voices.map((voice) => (
            <button
              key={voice.name}
              onClick={() => handleSpeak(voice.name)}
              style={{
                padding: "10px 20px",
                margin: "5px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                transition: "background-color 0.3s",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {voice.name === "Google UK English Female" && (
                <img src={femaleVoiceImage} alt="Female Voice" width="64" />
              )}
              {voice.name === "Google UK English Male" && (
                <img src={maleVoiceImage} alt="Male Voice" width="64" />
              )}
              {voice.name === "Google UK English Kid" && (
                <img src={kidVoiceImage} alt="Kid Voice" width="64" />
              )}
              <span>Generate Voice ({voice.name})</span>
            </button>
          ))}
        </div>
        </Box>
      );
    };
    
   
    
  

