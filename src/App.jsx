import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import Favorites from "./pages/Favorites.jsx";


function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        width: "100%",
        display: "block",
      }}
    >
      <CssBaseline />
      {/* Denne "nullstiller" CSS-en for hele appen */}

      {/* Navbar ligger utenfor Routes, så den vises alltid */}
      <Navbar />

      {/* Her inne byttes innholdet ut basert på URL-en */}
      <Box component="main" sx={{ width: "100vw", flexGrow: 1 }}>
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
    </Box>
  );
}

export default App;
