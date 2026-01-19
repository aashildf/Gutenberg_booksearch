import * as React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button, Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';    
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';


// navbar hentet fra MUI: https://mui.com

// kategori: https://mui.com/material-ui/react-app-bar/#app-bar-with-a-primary-search-field

const categories = [
    "Fiction", "Mystery", "Thriller", "Romance", "Fantasy", "Morality", "Society", "Power", "Justice", "Adventure", "Tragedy", "War", "Philosophy"
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {"width" : "auto"},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

export default function Navbar() {
const navigate = useNavigate();

const handleSearch = (event) => {
    if (event.key === "Enter") {
        const searchTerm = event.target.value;
        // navigerer til hjemmesiden med søkeparameter
        navigate(`/?search=${searchTerm}&page=1`);// &page=1 gjør at søket alltid starter på side en.
    }
};


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {/* Hovedlinje: Logo, Søk og Favoritter */}
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link} to="/"
            sx={{
              flexGrow: 1,
            //   display: { xs: "block", sm: "block" },
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            BOK-APP
          </Typography>

          {/* Søkefeltet*/}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Søk på bok…"
              onKeyDown={handleSearch}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Lenke til favoritter */}
          <Button color="inherit" component={Link} to="/favorites">
            Favoritter
          </Button>
        </Toolbar>

{/* kategori-linje */}
<Toolbar
variant="dense" //litt smalere
sx={{ 
            backgroundColor: alpha("#000", 0.1), 
            display: "flex", 
            flexWrap: "wrap", //wrapper på små skjermer
            justifyContent: "center",
            py: 1,
            gap: 1
          }}
          >
            {categories.map((cat) => (
                <Button
                key={cat}
                size="small"
                color="inherit"
                component={Link}
                to={`/category/${cat.toLowerCase()}`}
                sx={{ fontSize: "0.75rem", textTransform: "capitalize"}}
                >
                    {cat}  
                </Button>
            ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}