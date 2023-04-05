import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header/Header';
import SimpleBottomNavigation from './component/MainNav';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import Series from './pages/Series/Series';
import Trending from './pages/Trending/Trending';

function App() {
  return (
    <>
     <Header/> 
    <div className="app">
    <Container>
      <Routes>
          <Route path='/' element={<Trending />}>   
          </Route>
          <Route path="/movies" element={<Movies />}>
          </Route>
          <Route path="/series" element={ <Series />}>
          </Route>
          <Route path="/search" element={ <Search />}>
           
          </Route>
      </Routes>
      </Container> 
    </div>
    <SimpleBottomNavigation/>
    </>
  );
}

export default App;
