import React, {useState, useEffect} from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, CssBaseline, Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Import av sider og komponenter
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import Favorites from "./pages/Favorites.jsx";


// ---KOMPONENT: sørger for at vi havner øverst på siden ved hvert sidebytte
const ScrollToTopOnNavigation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

  function App() {
    const [showButton, setShowButton] = useState(false);
  

  // Lytt til scroll-eventer for å vise/skjule "scroll to top"-knappen
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTopAction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ScrollToTopOnNavigation/> 
      {/* går til toppen ved alle sidebytter*/}

      {/* Navbar ligger utenfor Routes, så den vises alltid */}
      <Navbar />

      {/* Her inne byttes innholdet ut basert på URL-en */}
      <Box component="main" sx={{ width: "100%", flexGrow: 1, pb: 5 }}>
        <Routes>
          {/* Dette er forsiden. Når du laster siden vises Home */}
          <Route path="/" element={<Home />} />

          {/* Andre ruter */}
          <Route path="/category/:genre" element={<Category />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          {/*  Denne sender folk hjem hvis de skriver feil URL */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Box>

      {/* til toppen-knappen  som dukker opp når man scroller*/}
      <Zoom in={showButton}>
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTopAction}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default App;
