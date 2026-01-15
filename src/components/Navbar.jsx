import * as React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button, Box} from '@mui/material';
import { Link } from 'react-router-dom';    
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';



// navbar hentet fra MUI: https://mui.com



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1), width: "auto" },
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link} // Gjør logoen til en lenke til forsiden
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "white",
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
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Lenke til favoritter */}
          <Button color="inherit" component={Link} to="/favorites">
            Favoritter
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}