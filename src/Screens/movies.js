import React, { useState, useEffect } from 'react';
import Sidebar from '../Dashboard/sideBar';
import TopBar from '../Dashboard/topBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Carousel, Tabs, Card, Pagination, Modal } from 'antd';
import axios from 'axios';

const { TabPane } = Tabs;

const apiKey = '26b1180912b4ef354fff604e426a33c2';
const apiUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [crimeThrillerMovies, setCrimeThrillerMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResponses, setTotalResponses] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchMovies = async (url, setData) => {
      try {
        const response = await axios.get(url);
        setData(response.data.results);
        setTotalResponses(response.data.total_results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Fetch trending movies
    fetchMovies(`${apiUrl}/trending/movie/week?api_key=${apiKey}&page=${currentPage}`, setTrendingMovies);

    // Fetch upcoming movies
    fetchMovies(`${apiUrl}/movie/upcoming?api_key=${apiKey}&page=${currentPage}`, setUpcomingMovies);

    // Fetch movies by genre
    const fetchMoviesByGenre = async (genreId, setMovies) => {
      fetchMovies(`${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${currentPage}`, setMovies);
    };

    fetchMoviesByGenre(27, setHorrorMovies); // Horror
    fetchMoviesByGenre(28, setActionMovies); // Action
    fetchMoviesByGenre(80, setCrimeThrillerMovies); // Crime Thriller
    fetchMoviesByGenre(35, setComedyMovies); // Comedy
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderMovieCards = (movies) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
      {movies.map(movie => (
        <Card key={movie.id} style={{ width: '100%', cursor: 'pointer' }} onClick={() => openModal(movie)}>
          <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
          <div style={{ marginTop: '8px', margin: '-5px' }}>
            <h3 style={{ margin: '1px' }}>{movie.title}</h3>
            <div style={{ display: 'flex', marginTop: '8px' }}>
              <p style={{ margin: '0', fontWeight: 'bold' }}>Release Date:</p>
              <p style={{ margin: '0', marginLeft: '8px' }}>{movie.release_date}</p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ margin: '0', fontWeight: 'bold' }}>Overview:</p>
              <p style={{ margin: '0', marginLeft: '8px' }}>{movie.overview.split(' ').slice(0, 10).join(' ')}...</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar />
      <Sidebar />
      <div style={{ padding: '60px 40px 0px 40px', maxWidth: '1000px', margin: 'auto', flex: '1', marginTop: '2695px',background:'#3a8278' }}>
        <h1>Trending Movies</h1>
        <Carousel autoplay dotPosition="bottom" style={{ marginBottom: '20px', marginTop: '10px', backgroundColor: '#3a8278', borderRadius: '10px' }}>
          {trendingMovies.map(movie => (
            <div key={movie.id}>
              <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} style={{ width: '100%', objectFit: 'contain', height: '300px', marginTop: '30px' }} />
              <center><h4 style={{ marginTop: '8px', height: '80px', overflow: 'hidden', backgroundColor: '#3a8278', padding: '8px' }}>{movie.title}</h4></center>
            </div>
          ))}
        </Carousel>

        <Tabs defaultActiveKey="upcoming" style={{ marginTop: '20px',color:"#000",fontWeight:'bolder' }}>
          <TabPane tab="Upcoming Movies" key="upcoming">
            {renderMovieCards(upcomingMovies)}
          </TabPane>

          <TabPane tab="Horror" key="horror">
            {renderMovieCards(horrorMovies)}
          </TabPane>

          <TabPane tab="Action" key="action">
            {renderMovieCards(actionMovies)}
          </TabPane>

          <TabPane tab="Crime Thriller" key="crimeThriller">
            {renderMovieCards(crimeThrillerMovies)}
          </TabPane>

          <TabPane tab="Comedy" key="comedy">
            {renderMovieCards(comedyMovies)}
          </TabPane>
        </Tabs>

        <Pagination
          current={currentPage}
          pageSize={20}
          total={totalResponses}
          onChange={handlePageChange}
          style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
        />

        <Modal
          title={selectedMovie?.title}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
          style={{height:'60px',zIndex:9999}}
          
        >
          {/* Render detailed movie information here */}
          {selectedMovie && (
            <div>
              <img src={`${imageBaseUrl}${selectedMovie.poster_path}`} alt={selectedMovie.title} style={{ width: '100%',objectFit:'contain',height:'200px' }} />
              <p>Release Date: {selectedMovie.release_date}</p>
              <p>Overview: {selectedMovie.overview}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </Modal>
      </div>
    </Box>
  );
};

export default Movies;
