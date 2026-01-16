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
      <Container maxWidth={"xl"} sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          {searchParams ? "Søkeresultater" : "Populære bøker"}
        </Typography>

        <Grid
          container
          sx={{
            margin: 0, // Sentrerer selve grid-beholderen
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {data?.results?.map((book) => (
            <Grid
              item
              key={book.id}
              sx={{
                display: "flex",
                minWidth: 0,
                flexBasis: { lg: "25%", md: "33.33%", sm: "50%", xs: "100%" },
                maxWidth: { lg: "25%", md: "33.33%", sm: "50%", xs: "100%" },
                p: 1.5, // Dette skaper "spacing" inni rutenettet uten å ødelegge bredden
              }}
            >
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
};

export default Home;








// Komponenten som henter bøkene og viser dem på hjemmesiden.