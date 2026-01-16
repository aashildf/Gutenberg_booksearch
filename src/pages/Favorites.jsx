import React, {useState} from "react";
import {Container, Typography, Grid, Box} from "@mui/material";
import BookCard from "../components/BookCard.jsx";


    // Henter favorittbøker fra localStorage
    const Favorites = () => {
        const [favorites, setFavorites] = useState(() => {
               const saved =
                 JSON.parse(localStorage.getItem("favorites")) || [];
               return saved;
        });
// funksjon som henter favoritter fra localStorage
const refreshFavorites = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
};

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Mine favoritter
        </Typography>

        {favorites.length === 0 ? (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Du har ikke lagt til noen favoritter enda.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4} alignItems="stretch">
            {favorites.map((book) => (
              <Grid
                item
                key={book.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ display: "flex" }}
              >
                {/* vi sender refreshFavorites som prop til BookCard */}
                <BookCard book={book} onFavoriteToggle={refreshFavorites} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    );
};

export default Favorites;