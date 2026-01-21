import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {fetchBooks} from '../api.js';
import {Grid, Container, CircularProgress, Button, Typography, Box} from "@mui/material";
import BookCard from '../components/BookCard.jsx';

const Category = () => {
    const {genre} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    // Hent sidetall fra URL, standard er 1.
    const page = parseInt(searchParams.get("page") || "1");

    // Hent bøker basert på kategori
    const {data, isLoading, error} = useQuery({
    queryKey: ["category", genre, page],
    queryFn: () => fetchBooks({topic: genre, page: page}),
    keepPreviousData: true,
});

const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString()});
    window.scrollTo(0, 0); // Scroll til toppen av siden ved sidebytte.
};

// if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
// }

if (error) return <Typography color="error">Kunne ikke hente bøker for {genre}</Typography>;

return (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <Typography
      variant="h4"
      sx={{ fontWeight: "bold", mb: 4, textTransform: "capitalize" }}
    >
      Kategori:{genre}
    </Typography>


    {isLoading ?(
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Henter klassikere...</Typography>
      </Box>
    ) : (
         <>

    <Grid
      container
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {data?.results?.map((book) => (
        <Grid
          item
          key={book.id}
          sx={{
            display: "flex",
            flexBasis: { lg: "25%", md: "33.33%", sm: "50%", xs: "100%" },
            maxWidth: { lg: "25%", md: "33.33%", sm: "50%", xs: "100%" },
            p: 1.5,
          }}
        >
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>

    {/*----------------- Paginering for kategori -----------*/}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 6,
        gap: 3,
      }}
    >
      <Button
        variant="contained"
        diabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        sx={{ minWidth: "120px" }}
      >
        Forrige
      </Button>
      <Typography sx={{ fontWeight: "bold" }}>Side {page}</Typography>
      <Button
        variant="contained"
        disabled={!data?.next}
        onClick={() => handlePageChange(page + 1)}
        sx={{ minWidth: "120px" }}
      >
        Neste
      </Button>
    </Box>
    </>
    )}
  </Container>
 );
};

export default Category;
