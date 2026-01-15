
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Box} from '@mui/material';  
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import BookDetails from './pages/BookDetails.jsx';
import Navbar from './components/Navbar.jsx'; 
import Favorites from './pages/Favorites.jsx'; 




function App() {
  return (
    <>
      <Box>
        {/* navbar ligger utenfor Routes, så den vises alltid */}
        <Navbar />

          {/* her inne byttes innholdet ut basert på URL-en */}
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/genre" element={<Category />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App
