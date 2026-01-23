import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import DownloadIcon from "@mui/icons-material/Download";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import { fetchBookDetails } from "../api.js";

const formatAuthorName = (name) => {
    if (!name) return "Unknown Author";
  if (name.includes(',')) {
    const [last, first] = name.split(', ');
    return `${first} ${last}`;
  }
  return name;
};


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

  //   ------FUNKSJONER--------

  // ----- Funksjon:oversetter språkkoder til norsk-----
  const getLanguageName = (code) => {
    const languages = {
      en: "Engelsk",
      no: "Norsk",
      fr: "Fransk",
      de: "Tysk",
      es: "Spansk",
    };
    return languages[code.toLowerCase()] || code.toUpperCase();
  };

  // ----Funksjon:{/* (Gutendex) bruker veldig spesifikke emneord (subjects), jeg ønsker å filtrere dem inn oppgavens hovedkategorier.  */}
  const getCategoryName = (subjects) => {
    if (!subjects || subjects.length === 0) return "klassiker";
    const text = subjects.join(" ").toLowerCase();


    //Definerer søkeord som hver av de 13 kategoriene innehar
    const rules = [
      {
        name: "Fantasy",
        matches: [
          "fantasy",
          "fairy",
          "vampire",
          "ghost",
          "supernatural",
          "gothic",
          "magic",
        ],
      },
      { name: "Mystery", matches: ["mystery", "detective", "crime", "murder"] },
      {
        name: "Romance",
        matches: ["romance", "love", "courtship", "marriage"],
      },
      {
        name: "Adventure",
        matches: ["adventure", "voyage", "sea stories", "frontier"],
      },
      { name: "Thriller", matches: ["thriller", "suspense", "intrigue"] },
      {
        name: "Tragedy",
        matches: ["tragedy", "conflict of generations", "death"],
      },
      { name: "War", matches: ["war", "military", "battle"] },
      { name: "Philosophy", matches: ["philosoph", "meditations"] },
      { name: "Morality", matches: ["moral", "ethics", "conduct of life"] },
      { name: "Society", matches: ["society", "social", "class", "poverty"] },
      { name: "Power", matches: ["power", "politics", "monarchy", "kings"] },
      { name: "Justice", matches: ["justice", "law", "court", "prison"] },
      { name: "Fiction", matches: ["fiction"] }, // Denne må ligge nederst!
    ];

    // Finn den første kategorien som treffer
    const found =  rules.find(rule => 
        rule.matches.some(keyword => text.includes(keyword))
);
    

return found ? found.name: "Klassiker";
  };



  //   Sjekker for Loading og Error-----
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
      // Hvis boken er favoritt, fjern den fra listen
      updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
    } else {
      // Hvis boken ikke er favoritt, legg den til
      updatedFavorites = [...favorites, book];
    }
    // lagre den nye listen i nettleseren
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

        <Grid
          container
          spacing={6}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          {/* ---Bok cover- venstre side--- */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              component="img"
              src={book?.formats["image/jpeg"]}
              alt={book?.title}
              sx={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "450px",
                borderRadius: "4px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                display: "block",
                // margin: { xs: "0 auto", md: "0" },
              }}
            />
          </Grid>

          {/* ----Tekst og info- høyre side----(Midtstilt på mobil, venstre på PC)*/}
          <Grid
            item
            xs={12}
            md={7}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            {/* ---Boktittel--- */}
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: "500",
                color: "#1C1A17",
                textAlign: "left",
                letterSpacing: "0.12em",
                wordSpacing: "0.2em",
                mt: "0.6em",
                mb: "0.4em",
                lineHeight: 1.2,
              }}
            >
              {book.title}
            </Typography>

            {/* ---Forfatter--- */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: "150%",
                color: "#1C1A17",
                mt: "1.5em",
                mb: "1.5em",
                letterSpacing: "0.05em",
              }}
            >
              av {book.authors?.map((a) => formatAuthorName(a.name)).join(", ")}
            </Typography>

            {/* ------Knapper for info/ chips------ */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 4,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 1,
              }}
            >
              <Chip
                icon={<DownloadIcon />}
                label={`${book.download_count?.toLocaleString()} Nedlastinger`}
                sx={{ borderRadius: "8px" }}
              />

              <Chip
                icon={<CategoryIcon />}
                label={`Kategori: ${getCategoryName(book.subjects)}`}
                sx={{ borderRadius: "8px" }}
              />

              <Chip
                icon={<LanguageIcon />}
                label={getLanguageName(book.languages?.[0])}
                sx={{ borderRadius: "8px" }}
              />
            </Stack>

            {/* ---skillelinje----- */}
            <Divider sx={{ mb: 4 }} />

            {/* Les nå- knapp -sentrert på mobil*/}
            <Stack
              spacing={2}
              sx={{ maxWidth: "350px", mx: { xs: "auto", md: "0" } }}
            >
              <Button
                variant="contained"
                size="large"
                component="a"
                href={digitalLink}
                target={"_blank"}
                rel="noopener noreferrer"
                startIcon={<MenuBookIcon />}
                sx={{
                  bgcolor: "#C5A059",
                  py: 1.8,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  "&:hover": { bgcolor: "#B38F4D" },
                }}
              >
                Les nå
              </Button>

              {/* legg til/fjern fra favoritter-knapp */}
              <Button
                variant="outlined"
                size="large"
                onClick={toggleFavorite}
                startIcon={
                  isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
                sx={{
                  py: 1.8,
                  borderRadius: "12px",
                  borderColor: "#C5A059",
                  borderWidth: "2px",
                  color: "#C5A059",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  "&:hover": {
                    borderWidth: "2px",
                    borderColor: "#B38F4D",
                    backgroundColor: "rgba(197, 160, 89, 0.05)",
                  },
                }}
              >
                {isFavorite ? "Fjern fra favoritter" : "Legg til i favoritter"}
              </Button>
            </Stack>

            {/* ---Utdrag fra boken --(Er pr. nå en statisk tekst, siden API-et ikke har denne muligheten- jeg måtte eventuelt da ha hentet den infoen fra ett annet API og koblet sammen.) */}
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Utdrag fra boken
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontStyle: "italic" }}
              >
                “For most of history, Anonymous was a woman. And I would venture
                to guess that Anon, who wrote so many poems without signing
                them, was often a woman who had no room of her own. No quiet
                place in which to sit, no uninterrupted time in which to think.
                Intellectual freedom depends upon material things. Poetry
                depends upon intellectual freedom. And women have always been
                poor, not for two hundred years merely, but from the beginning
                of time.” (Virginia Woolf, "A Room of One’s Own", 1929).
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default BookDetails;
