// NOTATER OM NAVBAR:
// 1-Bruker "Drawer" (skuff) for en semintransparent meny som glir ut.
// 2. Inneholder bok-kategorier som sender brukeren til forsiden av valgt kategori.
// 3. "OnMouseEnter" på gategorier bytter bilde på høyre side av menyen.
// navbar hentet fra MUI: https://mui.com


// IMPORTS
import {useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {styled, alpha} from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
// Ikoner
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";

import { Link, useNavigate } from 'react-router-dom';    


// ------DATA - KATEGORILISTE: med tilhørende bilder for hover-effekt
const categories = [
  { name: "Fiction", img: "/Gutenberg_booksearch/images/fiction.jpg" },
  { name: "Mystery", img: "/Gutenberg_booksearch/images/mystery.jpg" },
  { name: "Thriller", img: "/Gutenberg_booksearch/images/thriller.jpg" },
  { name: "Romance", img: "/Gutenberg_booksearch/images/romance.jpg" },
  { name: "Fantasy", img: "/Gutenberg_booksearch/images/fantasy.jpg" },
  { name: "Morality", img: "/Gutenberg_booksearch/images/morality.jpg" },
  { name: "Society", img: "/Gutenberg_booksearch/images/society.jpg" },
  { name: "Power", img: "/Gutenberg_booksearch/images/power.jpg" },
  { name: "Justice", img: "/Gutenberg_booksearch/images/justice.jpg" },
  { name: "Adventure", img: "/Gutenberg_booksearch/images/adventure.jpg" },
  { name: "Tragedy", img: "/Gutenberg_booksearch/images/tragedy.jpg" },
  { name: "War", img: "/Gutenberg_booksearch/images/war.jpg" },
  { name: "Philosophy", img: "/Gutenberg_booksearch/images/philosophy.jpg" },
];

//Styled komponent for søkefeltet
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "3px",
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  width: "auto",
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

// Om menyen er åpen, og hvilket bilde som vises ved hover
export default function Navbar() {
    const [open, setOpen]  = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [hoverImage, setHoverImage] = useState(categories[0].img);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

// FUNKSJON: Håndterer søket ----------------------------
const executeSearch = (value) => {
    if (value.trim() ){
        navigate(`/?search=${value}`);
        setSearchQuery(""); //Tømmer søkefeltet/sletter teksten
            setOpen(false);
            // Lukk tastatur på mobil
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            // scroll ned til søkene (søkeresultatet)
            setTimeout(() => {
                const element = document.getElementById("book-section");
                if (element){
                    element.scrollIntoView({behavior : "smooth"});
                }
            }, 200);
            }
};


  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(26, 26, 26, 0.95)",
          backdropFilter: "blur(5px)",
        }}
      >
        {/* -------Toolbar (header) ----- */}
        <Toolbar sx={{ height: "80px" }}>
          {/* Hamburgermeny - ikon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ mr: 2, color: "white" }} //tvinger den til å være hvit, pga mørkt bilde.
          >
            <MenuIcon sx={{ fontSize: "2rem" }} />
          </IconButton>

          {/* -------Logo: GUTENDEX------------- */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              letterSpacing: "3px",
            }}
          >
            GUTENDEX
          </Typography>

          {/* -------------SØKEFELTET------------ */}
          <Search>
            <InputBase
              placeholder={
                isMobile ? "Søk..." : "Søk..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeSearch(searchQuery)}
              sx={{
                color: "white",
                ml: 2,
                width: { xs: "120px", sm: "200px" },
                fontSize: "0.9rem",
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                  opacity: 1,
                },
              }}
            />

            {/* -------knappforstørrelsesglass-ikon og "søk"-tekst------- */}
            <Button
              onClick={() => executeSearch(searchQuery)}
              variant="contained"
              size="medium"
              startIcon={<SearchIcon />}
              sx={{
                ml: 1,
                backgroundColor: "secondary.main",
                color: "white",
                "&:hover": { backgroundColor: "primary.main" },
                textTransform: "none",
                fontWeight: "bold",
                minWidth: "80px",
                display: { xs: "none", sm: "flex" }, //Skjuler teksten på knappen på små mobiler
              }}
            >
              Søk
            </Button>
          </Search>
        </Toolbar>
      </AppBar>

      {/* -----------------MENY - DRAWER/OVERLAY ---------------*/}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        transitionDuration={{ enter: 900, exit: 400 }}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", md: "60%" },
              backgroundColor: "rgba(28, 26, 23, 0.98)",
              backdropFilter: "blur(10px)",
              color: "white",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", height: "100%", position: "relative" }}>
          {/* ---Lukke-knapp--- */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "white",
              zIndex: 10, // Sørger for at den ligger over bildene
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": { backgroundColor: "secondary.main" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* --------- (Venstre side, LENKER------------ */}
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              p: { xs: 2, md: 4 },
              overflowY: "auto",
            }}
          >
            {/* ----Meny--- */}
            <Typography
              variant="h3"
              sx={{
                mb: 1,
                fontWeight: 900,
                color: "white",
                fontSize: { xs: "2rem", md: "3rem" },
              }} // Responsiv størrelse }}
            >
              Meny
            </Typography>

            <List>
              {["HJEM", "FAVORITTER"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={text === "HJEM" ? "/" : "/favorites"}
                    onClick={() => setOpen(false)}
                    sx={{ py: 0.5 }}
                  >
                    <ListItemText
                      primary={text}
                      slotProps={{
                        primary: {
                          sx: { fontWeight: "bold", letterSpacing: "2px" },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            {/* ---Delestrek--- */}
            <Divider
              sx={{ my: 3, backgroundColor: "rgba(235, 205, 205, 0.7)" }}
            />

            {/* Overskrift: "Kategorier" */}
            <Typography
              variant="overline"
              sx={{
                color: "rgba(235, 205, 205, 0.7)",
                display: "block",
                mb: 2,
                ml: 2,
                fontWeight: "bold",
                letterSpacing: "1px",
                fontSize: "1.1rem",
              }}
            >
              Kategorier
            </Typography>

            {/* ---Liste med kategoriene, som lenker---- */}
            <List sx={{ mt: 2 }}>
              {categories.map((cat) => (
                <ListItemButton
                  key={cat.name}
                  component={Link}
                  to={`/category/${cat.name.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoverImage(cat.img)}
                  sx={{ py: 0.5, "&:hover": { color: "secondary.main" } }}
                >
                  <ListItemText primary={cat.name} />
                </ListItemButton>
              ))}
            </List>
          </Box>

          {/* høyre side, dynamisk bilde (skjules på mobil) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              backgroundImage: `url(${hoverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 0.4s ease-in-out",
              m: 3,
              borderRadius: "4px",
              boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
            }}
          />
        </Box>
      </Drawer>
    </>
  );
}   