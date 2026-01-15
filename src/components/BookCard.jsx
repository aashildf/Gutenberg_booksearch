import React, { useState }from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';    
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const BookCard = ({ book }) => {
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
};

    return (
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
        }}
      >
        {/* coverbilde */}
        <CardMedia
          component="img"
          image={
            imageUrl || "https://via.placeholder.com/150x200?text=Ingen+bilde"
          }
          alt={book.title}
          sx={{ height: 250, objectFit: "contain", bgcolor: "#f5f5f5", p: 2 }}
        />

        {/* tekstinnhold */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontSize: "1rem",
              lineHeight: 1.2,
              fontWeight: "bold",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.4em",
            }}
          >
            {book.title}
          </Typography>
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
            {book.authors.map((a) => a.name).join(", ") || "Ukjent forfatter"}
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