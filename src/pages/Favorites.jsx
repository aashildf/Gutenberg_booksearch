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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Mine favoritter
        </Typography>

        {favorites.length === 0 ? (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Du har ikke lagt til noen favoritter enda.
            </Typography>
          </Box>
        ) : (
          <Grid 
          container 
                sx={{
            width: "100%", 
            margin: 0, 
            display: "flex", 
            flexWrap: "wrap",
            // Bruker flex-start her så kortene legger seg pent til venstre 
            // hvis du f.eks. bare har 2 favoritter
            justifyContent: "flex-start" 
          }}
              >
                {favorites.map((book) => (
                    <Grid
                    item
                    key={book.id}
                    sx={{
                        display: "flex",
                        minWidth: 0,
                        // Tvinger 4 kort på stor skjerm, 3 på medium, 2 på tablet og 1 på mobil
                flexBasis: { lg: "25%", md: "33.33%", sm: "50%", xs: "100%" },
                maxWidth: { lg: "25%", md: "33.33%", sm: "50%", xs: "100%" },
                p: 1.5, // Dette lager mellomrommet (erstatter spacing={4})
              }}
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