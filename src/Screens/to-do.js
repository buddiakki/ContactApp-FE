import React, { useState, useEffect } from 'react';
import Sidebar from '../Dashboard/sideBar';
import TopBar from '../Dashboard/topBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import ReactPlayer from 'react-player';

export default function Todo() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const videosPerPage = 10; // You can adjust this as needed

  useEffect(() => {
    // Fetch Dailymotion videos for the specified page
    const fetchVideos = async (page) => {
      try {
        const response = await axios.get('https://api.dailymotion.com/videos', {
          params: {
            limit: videosPerPage,
            page,
            fields: 'id,title,thumbnail_url',
          },
        });

        setVideos(response.data.list);
        setTotalPages(Math.ceil(response.data.total / videosPerPage));
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos(currentPage);
  }, [currentPage]);

  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ display: 'flex', }}>
    <CssBaseline />
    <TopBar style={{ position: 'fixed', width: '100%', zIndex: 1000 }} />
    <Sidebar />
    <div style={{ marginLeft: '30px', padding: '20px', maxWidth: '1600px', marginTop:'1000px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Video Player</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.3s',
                ':hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => playVideo(video)}
            >
              <img
                src={video.thumbnail_url}
                alt={video.title}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '6px 6px 0 0',
                }}
              />
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{video.title}</p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              style={{ marginRight: '10px', padding: '5px 10px', fontSize: '14px', cursor: 'pointer' }}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              style={{ padding: '5px 10px', fontSize: '14px', cursor: 'pointer' }}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}

        {selectedVideo && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>{selectedVideo.title}</h2>
            <ReactPlayer url={`https://www.dailymotion.com/video/${selectedVideo.id}`} controls width="800px" height="400px" />
          </div>
        )}
      </div>
    </Box>
  );
}
