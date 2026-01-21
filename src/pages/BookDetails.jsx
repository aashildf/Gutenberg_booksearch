import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { fetchBookDetails } from "../api.js";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // henter data om boken
  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id),
  });

  // state for favoritter
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.some((fav) => fav.id === Number(id));
  });

  //   stopp sjekk
  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (error || !book)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        Kunne ikke hente bokdetaljer.
      </Typography>
    );

  // funksjon for å legge til/fjerne favoritt
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
    } else {
      updatedFavorites = [...favorites, book];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  // lenke til digital versjon av boken
  const digitalLink =
    book?.formats?.["text/html; charset=utf-8"] ||
    book?.formats?.["text/html"] ||
    book?.formats?.["application/pdf"] ||
    book?.formats?.["application/epub+zip"] ||
    book?.formats?.["text/plain; charset=utf-8"] ||
    "#";

  //   selve visningen

  return (
    <Container sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
        {/* ----LUKKEKNAPPEN-- */}
        <IconButton
          onClick={() => navigate(-1)} //-1 betyr, gå en side tilbake
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
            color: "grey.500",
            transition: "0.2s",
            "&:hover": {
              color: "black",
              backgroundColor: "rgba(0,0,0,0,0.5)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <img
              src={book?.formats["image/jpeg"]}
              alt={book?.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
              {book.title}
            </Typography>

            <Typography variant="h5" color="textSecondary" gutterBottom>
              {book.authors?.map((a) => a.name).join(", ")}
            </Typography>

            <Box sx={{ my: 3 }}>
              <Typography variant="body1">
                <strong>Språk:</strong>
                {book.languages?.join(",").toUpperCase()}
              </Typography>
              <Typography variant="body1">
                <strong>Antall nedlastinger:</strong>
                {book.download_count?.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Emner:</strong> {book.subjects?.join(",")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant={isFavorite ? "contained" : "outlined"} // Endrer stil basert på status
                startIcon={
                  isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                } // Bytter mellom fylt og tomt hjerte
                color="secondary"
                onClick={toggleFavorite} // <-- Dette er den viktigste linjen som kobler til funksjonen
              >
                {isFavorite ? "Fjern fra favoritter" : "Legg til i favoritter"}
              </Button>

              {/* knapp for å lese boken digitalt */}
              <Button
                variant="outlined"
                component="a"
                href={digitalLink}
                target="blank"
                rel="noopener noreferrer"
                startIcon={<OpenInNewIcon />}
              >
                Les boken digitalt
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default BookDetails;
