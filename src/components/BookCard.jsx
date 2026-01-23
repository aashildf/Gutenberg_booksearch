import React, { useState }from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';    
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const formatAuthorName = (name) => {
  if (!name) return "Unknown Author";
  if (name.includes(',')) {
    const [last, first] = name.split(', ');
    return `${first} ${last}`;
  }
  return name;
};

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

// hvis onFavoriteToggle er sendt som prop, "kaller" vi den for å oppdatere favorittlisten i forelderen
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
        {/* ----Coverbilde---- */}
        <Box
          sx={{
            bgcolor: "#f5f5f5",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 250,
            pb: 1,
            pt: 2,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={
              imageUrl || "https://via.placeholder.com/150x200?text=Ingen+bilde"
            }
            alt={book.title}
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxHeight: "100%",
              maxWidth: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              bgcolor: "#f5f5f5",
              //   p: 1,
            }}
          />
        </Box>

        {/* ----Tekstinnhold---- */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* ---Bok-tittel--- */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 500,
              letterSpacing: "0.08em",
              lineHeight: 1.4,
              textAlign: "center",
              color: "#1C1A17",
              fontSize: "1.1rem",
              mt: 1,
              mb: 0.5,

              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {book.title}
          </Typography>

          {/* ---Forfatter--- */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "center",
              letterSpacing: "0.02em",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {/* mapper gjennom forfatttere, pga det kan være flere */}
            av{" "}
            {book.authors?.map((a) => formatAuthorName(a.name)).join(", ") ||
              "Ukjent forfatter"}
          </Typography>
        </CardContent>

        {/* ------KNAPPER------ */}
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          {/* ---Detaljer-knappen */}
          <Button
            size="small"
            variant="contained"
            color="primary"
            component={Link}
            to={`/book/${book.id}`}
            sx={{ flex: 1, height: "40px", fontWeight: "bold" }}
          >
            Detaljer
          </Button>

          {/* ---Favoritter-knappen--- */}
          <Button
            size="small"
            variant={isFavorite ? "contained" : "outlined"}
            color="primary"
            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={toggleFavorite}
            sx={{
              flex: 1,
              height: "40px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {isFavorite ? " " : "Favoritt"}
          </Button>
        </CardActions>
      </Card>
    );
};

export default BookCard;