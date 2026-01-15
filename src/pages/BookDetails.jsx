
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";


const BookDetails = () => {
    const { id } = useParams();

    const { data: book, isLoading, error } = useQuery({
        queryKey: ["book", id],
        // vi henter den spesifikke boken basert på ID fra URL-en
        queryFn: async () => {
            const response = await fetch(`https://gutendex.com/books/${id}`);
            return response.json();
        },
    });

    if (isLoading) return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>);
 
    if (error) return <Typography color="error">Kunne ikke hente bokdetaljer.</Typography>;


  return (
    <Container sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book?.formats["image/jpeg"]}
              alt={book?.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3 gutterBottom">{book.title}</Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {" "}
              {book.authors?.map((a) => a.name).join(", ")}
            </Typography>

            <Box sx={{ my: 3 }}>
              <Typography variant="body1">
                <strong>Språk:</strong>
                {book.languages?.join(",")}
              </Typography>
              <Typography variant="body1">
                <strong>Antall nedlastinger:</strong>
                {book.download_count}
              </Typography>
              <Typography variant="body1">
                <strong>Emner:</strong> {book.subjects?.join(",")}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<FavoriteIcon />}
              color="secondary"
            >Legg til i favoritter</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default BookDetails;
