import axios from 'axios';

const API_URL = "https://gutendex.com/books/";

export const fetchBooks = async (searchParams = "")=> {
    // fetchBooks henter bøker basert på søkeparametre og returnerer data.
    const response = await axios.get (`${API_URL}?${searchParams}`);
    return response.data;
};

// Denne siden håndterer all kommunikasjonn med API-et ved hjelp av axios.