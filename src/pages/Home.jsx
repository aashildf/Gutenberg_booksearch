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
    const category = searchParams.get("category") || "";
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

    // -------------HERO-SEKSJON---------------

// ------Hero-Bildet---------
    const heroImageUrl = "/Gutenberg_booksearch/images/hero4.jpg";
    return (
      <Box>
        {/* Hero-seksjonen*/}
        <Box
          sx={{
            position: "relative",
            height: "65vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            color: "white",
            textAlign: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Container sx={{ position: "relative", zIndex: 1 }}>
            {/* ------------Hero-tekst-1------- */}
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: "900",
                color: "#fbf4eb",
                mb: 2,
                fontSize: { xs: "3.5rem", sm: "5.5rem", md: "7rem" },
                textAlign: "center",
                lineHeight: 1,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              GUTENDEX
            </Typography>

            {/* -------Hero tekst-2------- */}
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: "#fbf4eb",
                fontWeight: 400,
                fontFamily: '"Lato", sans-serif',
                textAlign: "center",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                maxWidth: "600px",
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Oppdag klassisk litteratur fra hele verden.
            </Typography>

            {/* ------Knapp: "Utforsk samlingen"------ */}
            <Button
              variant="outlined"
              size="large"
              sx={{
                mt: 4, //luft over knappen
                px: 6, //ekstra bredde
                py: 1.5, //Ekstra høyde
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "white",
                borderColor: "secondary.main",
                borderWidth: "2px",
                borderRadius: "0",
                letterSpacing: "2px",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "black",
                  borderWidth: "2px",
                  borderColor: "white",
                  transform: "translateY(-3px)", // Løfter knappen
                  boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                },
              }}
              onClick={() => {
                // tømmer søket ved å sette searchParams til ingenting
                setSearchParams({});

                // scroll ned til bøkene
                setTimeout(() => {
                  document
                    .getElementById("book-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              Utforsk samlingen
            </Button>
          </Container>
        </Box>

        {/* --------------------BOK-SEKSJON ---------------------*/}

        <Container id="book-section" maxWidth={"xl"} sx={{ py: 8 }}>
          {/* Overskriften står øverst så den alltid er synlig, uansett om bøker lastes med en gang, eller loading-symbolet jobber */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              mb: 4,
              mt: 5,
              fontFamily: '"Playfair Display", serif',
              color: "primary",
              textAlign: "center",
              fontSize: { xs: "2rem", md: "4rem" },
            }}
          >
            {query
              ? `Søkeresultater for "${query}"`
              : category
              ? `Kategori: ${
                  category.charAt(0).toUpperCase() + category.slice(1)
                }`
              : "Utforsk Arkivet"}
          </Typography>

          {/* -----------LOADING ------------*/}
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 10,
              }}
            >
              <CircularProgress
                size={60}
                thickness={4}
                sx={{ color: "#000" }}
              />
              <Typography sx={{ mt: 2, fontWeight: "medium" }}>
                Henter klassikere...
              </Typography>
            </Box>
          ) : error ? (
            <Typography color="error">Kunne ikke hente bøker...</Typography>
          ) : (
            <>
              {/* ---Her vises Grid og navigasjon når dataene er klare ---*/}
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
                      flexBasis: {
                        lg: "25%",
                        md: "33.33%",
                        sm: "50%",
                        xs: "100%",
                      },
                      maxWidth: {
                        lg: "25%",
                        md: "33.33%",
                        sm: "50%",
                        xs: "100%",
                      },
                      p: 1.5, // Dette skaper "spacing" inni rutenettet uten å ødelegge bredden
                    }}
                  >
                    <BookCard book={book} />
                  </Grid>
                ))}
              </Grid>

              {/* -------Navigasjonsknapper for sidebytte  nederst------*/}
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
                  sx={{
                    fontWeight: "bold",
                    minWidth: "60px",
                    textAlign: "center",
                  }}
                >
                  Side {page}
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








