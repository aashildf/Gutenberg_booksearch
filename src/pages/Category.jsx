import React from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {fetchBooks} from '../api.js';
import {Grid, Container, CircularProgress, Typography, Box} from "@mui/material";
import BookCard from '../components/BookCard.jsx';

const Category = () => {
    const {genre} = useParams();

    const {data, isLoading, error} = useQuery({
    queryKey: ["books", genre],
    queryFn: () => fetchBooks(`?topic=${genre}`),
});

if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        
        <CircularProgress />
      </Box>
    );
}

if (error) return <Typography color="error">Kunne ikke hente bøker for {genre}</Typography>;

return (
  <Container>
    <Typography variant="h4" gutterBottom sx={{ textTransform: "capitalize" }}>
      Kategori:{genre}
    </Typography>

    <Grid container spacing={4}>
        {data?.results?.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book}/>
        </Grid>
    ))}
    </Grid>
  </Container>
);

};

export default Category;
