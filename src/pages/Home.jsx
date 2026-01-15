import React from 'react';
import { useQuery } from "@tanstack/react-query";
import {useLocation} from "react-router-dom";
import {fetchBooks} from "../api.js";
import {Grid, Container, CircularProgress, Typography, Box} from "@mui/material";
import BookCard from "../components/BookCard.jsx";

const Home = () => {
    const location = useLocation();

    // vi henter søkeordet fra uRL-en
    const searchParams = location.search;

    const { data, isLoading, error} = useQuery({
        // queryen oppdateres hver gang søket endres.
        queryKey:["books", searchParams],
        queryFn: () => fetchBooks(searchParams),
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) return <Typography color="error">Kunne ikke hente bøker...</Typography>;

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* maxWidth="lg" setter maksbredden (1200px) og marginer. */}
        <Typography variant="h4" gutterBottom>
          {searchParams ? "Søkeresultater" : "Populære bøker"}
        </Typography>

        <Grid container spacing={3}>
          {data?.results?.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
              {/* xs-(mobil) betyr at en bok tar hele plassen 12/12, sm-(nettbrett) 6/12, altså to bøker ved siden av hverandre, osv.*/}
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
};

export default Home;








// Komponenten som henter bøkene og viser dem på hjemmesiden.