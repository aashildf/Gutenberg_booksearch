// NOTATER OM NAVBAR:
// 1-Bruker "Drawer" for en semintransparent meny som glir ut.
// 2. Inneholder bok-kategorier som sender brukeren til forsiden av valgt kategori.
// 3. "OnMouseEnter" på gategorier bytter bilde på høyre side av menyen.
// navbar hentet fra MUI: https://mui.com


// IMPORTS
import {useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, InputBase, Box, Divider} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';    
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import CloseIcon from "@mui/icons-material/Close";





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


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  width: "200px",
  marginLeft:"auto",
}));

// Om menyen er åpen, og hvilket bilde som vises ved hover
export default function Navbar() {
    const [open, setOpen]  = useState(false);
    const [hoverImage, setHoverImage] = useState(categories[0].img);
const navigate = useNavigate();

// FUNKSJON: Håndterer søk når man trykker enter
const handleSearch = (e) => {
    if (e.key === "Enter") {
        navigate(`/?search=${e.target.value}`);
        e.target.value = ""; //Tømmer søkefeltet/sletter teksten
            setOpen(false)
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
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            GUTENDEX
          </Typography>

          <Search>
            <Box
              sx={{
                p: "0 10px",
                height: "100%",
                position: "absolute",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SearchIcon fontSize="small" />
            </Box>
            <InputBase
              placeholder="Søk..."
              onKeyDown={handleSearch}
              sx={{ color: "inherit", pl: 5, width: "100%" }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      {/* -----------------MENY - OVERLAY ---------------*/}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        transitionDuration={{ enter: 900, exit: 400 }}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", md: "50%" },
              backgroundColor: "rgba(15, 15, 15, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", height: "100%", position:"relative" }}>

            {/* ---Lukke-knapp--- */}
            <IconButton
            onClick={() => setOpen(false)}
            sx={{
                position: "absolute",
        top: 15,
        right: 15,
        color: "white",
        zIndex: 10, // Sørger for at den ligger over bildene
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}>
                <CloseIcon/>
            </IconButton>
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              p: 4,
              overflowY: "auto",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 4, fontWeight: "bold", color: "white" }}
            >
              Meny
            </Typography>

            <List>
              <ListItem
                button
                component={Link}
                to="/"
                onClick={() => setOpen(false)}
              >
                <ListItemText>
                  <Typography sx={{ fontWeight: "bold", color: "white" }}>
                    HJEM
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/favorites"
                onClick={() => setOpen(false)}
              >
                <ListItemText>
                  <Typography sx={{ fontWeight: "bold", color: "white" }}>
                    FAVORITTER
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>

            <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.2)" }} />

            {/* OVERSKRIFT: Kategorier */}
            <Typography
              variant="overline"
              sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
            >Kategorier
            </Typography>

            <List>
              {categories.map((cat) => (
                <ListItem
                  button
                  key={cat.name}
                  component={Link}
                  to={`/category/${cat.name.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoverImage(cat.img)}
                >
                  <ListItemText
                    primary={cat.name}
                    slotProps={{ primary: { sx: { color: "white" } } }}
                  />
                </ListItem>
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
              transition: "background-image 0.3s ease-in-out",
              m: 2,
              borderRadius: "15px",
            }}
          />
        </Box>
      </Drawer>
    </>
  );
}   