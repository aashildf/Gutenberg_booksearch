import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {fetchBooks} from '../api.js';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookCard from '../components/BookCard.jsx';

const Category = () => {
    const {genre} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    //-Fjerner "kategori"-navnet fra overskriften/ visning av kategorien
    const displayTitle = genre
      ? genre.replace(/kategori[:\s]+/i, "").trim()
      : "";

      //Kategoriforklaringer
      const descriptions = {
        fiction:
          "Dykk ned i forestilte verdener og tidløse fortellinger fra historiens største forfattere.",
        romance:
          "Oppdag klassiske skildringer av kjærlighet, lidenskap og hjerteosorg gjennom århundrene.",
        mystery:
          "Følg sporene og løs gåtene i våre mest fengslende klassiske mysterier.",
        thriller:
          "Opplev intens spenning og psykologiske spill som har definert sjangeren.",
        fantasy: "Reis til magiske riker der alt er mulig og helter blir født.",
        war: "Sterke skildringer av konflikt, mot og menneskehetens mørkeste og lyseste øyeblikk.",
        philosophy:
          "Utforsk de dype tankene og ideene som har formet vår forståelse av verden.",
        adventure:
          "Bli med på episke reiser over land og hav i søken etter det ukjente.",
        tragedy:
          "Mektige historier om skjebne, tap og den menneskelige tilstand.",
      };

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



if (error) return <Typography color="error">Kunne ikke hente bøker for {genre}</Typography>;

return (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    {/* //---OVERSKRIFT-SEKSJON--- */}
    <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 }, mb: 8 }}>
      <Typography
        variant="overline"
        sx={{
          letterSpacing: "3px",
          color: "secondary.main",
          fontWeight: "bold",
        }}
      >
        Klassisk Samling
      </Typography>

      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontFamily: '"Times New Roman", Times, serif',
          fontWeight: 500,
          color: "#1C1A17", // Den mørke fargen fra menyen
          fontSize: { xs: "3rem", md: "3.4em" },
          textTransform: "capitalize",
          textAlign: "center",
          letterSpacing: "0.1em",
          lineHeight: 1.2,
          mt: 1,
          mb: 2,
        }}
      >
        {displayTitle}
      </Typography>

      {/* //Forklaring som henter tekst fra description-objektet */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: "700px",
          mx: "auto",
          color: "text.secondary",
          fontStyle: "italic",
          fontSize: "1.1rem",
          mb: 3,
          textAlign: "center",
        }}
      >
        {descriptions[displayTitle.toLowerCase()] ||
          "Utforsk vår nøye utvalgte samling av klassisk litteratur."}
      </Typography>

      {/* ---DEKORLINE--- */}
      <Box
        sx={{
          width: "70px",
          height: "2px",
          bgcolor: "secondary.main",
          mx: "auto",
          borderRadius: "2px",
        }}
      />
    </Box>
    {isLoading ? (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <CircularProgress color="secondary" />
        <Typography sx={{ mt: 2, fontFamily: '"Playfair Display", serif' }}>
          Henter klassikere...
        </Typography>
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
            disabled={page === 1}
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
