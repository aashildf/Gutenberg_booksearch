import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  //FARGER
  palette: {
    background: {
      default: "#F5EEE5", //lys bakgrunnsfarge
      paper: "#FFFFFF", //helt hvit
    },
    primary: {
      main: "rgba(235, 205, 205, 0.7)", //beige
    },
    secondary: {
      main: "#B38F4D", // Gull
    },
    text: {
      primary: "#1C1A17", // tekstfarge
    },
  },
  //FONTER
  typography: {
    fontFamily: '"Playfair Display", "Lato", serif',
    //Perfect fifth Skala (Base 16px)
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 900,
      fontSize: "7.6rem",
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: "5rem",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: "3.4rem",
    },
    h4: {
      fontFamily: '"Lato", sans-serif',
      fontSize: "1rem", //16px
    },
    body1: {
      fontFamily: '"Lato", sans-serif',
      fontSize: "1.1rem",
      lineHeight: "1.5",
    },
    listItemText: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
  },

  //KOMPONENTER
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "uppercase",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;