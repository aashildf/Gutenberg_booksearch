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
        setSearchParams({ search: query, page: newPage.toString()  }); window.scrollTo({ top: 600, behavior: "smooth"});//Scroller opp til bøkene ved sidebytte
    };

    // HERO-BILDE-STI
    const heroImageUrl = "/Gutenberg_booksearch/images/hero.jpg";
    return (
        <Box>
            {/* HERO-SEKSJON */}
        <Box
        sx={{
                    position: 'relative',
                    height: '65vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${heroImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    color: 'white',
                    textAlign: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
        >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: '3rem', md: '5rem' }, mb: 2 }}>
                GUTENDEX
            </Typography>
            <Typography
            variant="h5" sx={{ mb: 4, fontWeight: 300, fontStyle: 'italic' }}>
                        Oppdag klassisk litteratur fra hele verden.</Typography>
            <Button 
                variant="outlined" 
                size="large" 
                sx={{ color: 'white', borderColor: 'white', '&:hover': { bgcolor: 'white', color: 'black' }}}
                onClick={() => document.getElementById('book-section').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Utforsk bøker
                        </Button>
        </Container>
        </Box>

    
     {/* BOK-SEKSJON */}
    <Container id="book-section" maxWidth={"xl"} sx={{ py: 8 }}>


  {isLoading ? (

            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress/>
            </Box>
        ) : error ? (
   <Typography color="error">Kunne ikke hente bøker...</Typography>
        ) : (
            <>

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          {query ? `Søkeresultater for "${query}"` : "Populære bøker"}
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
            disabled={page === 1}
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
      </Box>
    );
};

export default Home;








// Komponenten som henter bøkene og viser dem på hjemmesiden.