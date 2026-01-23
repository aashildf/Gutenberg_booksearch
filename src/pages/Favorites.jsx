import React, {useState} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BookCard from "../components/BookCard.jsx";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";


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
        {/* ---Overskrift-seksjon---- */}

        {/* Gult hjerte */}
        <Box sx={{ mt: 5, mb: 6, textAlign: "center" }}>
          <Box sx={{ mb: 0.5 }}>
            <FavoriteIcon
              sx={{
                color: "secondary.main",
                fontSize: "1rem",
                opacity: 0.9,
              }}
            />
          </Box>

          {/* // Overksrift: Favoritter */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              mb: 2,
              mt: 2,
              letterSpacing: "3px",
              fontFamily: '"Times New Roman", Times, serif',
              color: "primary",
              textAlign: "center",
              lineHeight: 1.2,
              fontSize: { xs: "2.8rem", md: "3.4em" },
            }}
          >
            Mine favoritter
          </Typography>

          {/* Delelinje */}
          <Divider
            sx={{
              width: "70px",
              height: "2px",
              bgcolor: "secondary.main",
              margin: "0 auto",
              borderRadius: "2px",
              mb: 2,
            }}
          />
        </Box>

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
              justifyContent: "flex-start",
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