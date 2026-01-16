import React, { useState }from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';    
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const BookCard = ({ book, onFavoriteToggle }) => {
    const imageUrl = book.formats["image/jpeg"];
    // I Gutendex lagres bilder i object-formats under nøkkelen "formats".
    const [isFavorite, setIsFavorite] = useState(() =>{
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        return favorites.some(fav => fav.id === book.id);
    });



const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites; 
    
    if (isFavorite) {
        updatedFavorites = favorites.filter(fav => fav.id !== book.id);
} else {
        updatedFavorites = [...favorites, book];
}

localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
setIsFavorite(!isFavorite);

// hvis onFavoriteToggle er sendt som prop, kaller vi den for å oppdatere favorittlisten i forelderen
if (onFavoriteToggle){
    onFavoriteToggle();
}
};

    return (
      <Card
        sx={{
          width: "100%",
          minWidth: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: 3,
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        {/* coverbilde */}
        <Box
          sx={{ bgcolor: "#f5f5f5", display: "flex", justifyContent: "center" }}
        >
          <CardMedia
            component="img"
            image={
              imageUrl || "https://via.placeholder.com/150x200?text=Ingen+bilde"
            }
            alt={book.title}
            sx={{
              height: 250,
              width: "100%",
              objectFit: "contain",
              bgcolor: "#f5f5f5",
              p: 1,
            }}
          />
        </Box>

        {/* tekstinnhold */}
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              // Tvinger frem linjeskift uansett:
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflowWrap: "anywhere",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.5em", // Låser høyden slik at kortene blir like brede
              lineHeight: "1.25em"
            }}
          >
            {book.title}
          </h3>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {/* mapper gjennom forfatttere, pga det kan være flere */}
            {book.authors?.map((a) => a.name).join(", ") || "Ukjent forfatter"}
          </Typography>
        </CardContent>

        {/* knapper */}
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Button
            size="small"
            variant="contained"
            component={Link}
            to={`/book/${book.id}`}
          >
            Detaljer
          </Button>

          <Button
            size="small"
            variant={isFavorite ? "contained" : "outlined"}
            color="secondary"
            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={toggleFavorite}
          >
            {isFavorite ? "Fjern fra favoritt" : "Legg til i favoritt"}
          </Button>
        </CardActions>
      </Card>
    );
};

export default BookCard;