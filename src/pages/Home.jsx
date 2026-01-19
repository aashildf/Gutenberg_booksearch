import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'react-router-dom';
import {fetchBooks} from "../api.js";
import {Grid, Container, CircularProgress, Typography, Box, Button} from "@mui/material";
import BookCard from "../components/BookCard.jsx";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // hente ut verdiene individuelt fra URL-en
    const query = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");


    const { data, isLoading, error} = useQuery({
        // queryen skiller mellom søkeord og sidetall
        queryKey:["books", query, page],
        queryFn: () => fetchBooks({search: query, page: page}),
        keepPreviousData: true, // beholder bildene på skjermen mens ny data hentes
    });

    // Funksjon for å bytte side
    const handlePageChange = (newPage) => {
        setSearchParams({ search: query, page: newPage.toString()  });
    };

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

        {/* Navigasjonsknapper for sidebytte */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 6,
            mb: 4,
            gap: 3,
          }}
        >
          <Button
            variant="contained"
            didabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            sx={{ minWidth: "120px" }}
          >
            Forrige
          </Button>

          <Typography
            sx={{ fontWeight: "bold", minWidth: "60px", textAlign: "center" }}
          >Side {page}
          </Typography>

          <Button
            variant="contained"
            diabled={!data?.next}
            onClick={() => handlePageChange(page + 1)}
            sx={{ minWidth: "120px" }}  
          >
            Neste
          </Button>
        </Box>
      </Container>
    );
};

export default Home;








// Komponenten som henter bøkene og viser dem på hjemmesiden.