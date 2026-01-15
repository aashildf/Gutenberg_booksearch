import React from "react";
import {Container, Typography, Grid} from "@mui/material";

const Favorites = () => {
    // Henter favorittbøker fra localStorage
    const favoriteBooks = [];

    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mine favoritter
        </Typography>
        {favoriteBooks.length === 0 ? (
          <Typography>Du har ikke lagt til noen favoritter enda.</Typography>
        ) : (
          <Grid container spacing={4}>
            {/* her skal det mappes gjennom favorittene slik som i Home */}
          </Grid>
        )}
      </Container>
    );
};

export default Favorites