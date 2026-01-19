import axios from 'axios';

const API_URL = "https://gutendex.com/books/";

export const fetchBooks = async ({search  = "", page = 1, topic = ""}) => {
     const response = await axios.get(API_URL, {
        params:{
            search:search || undefined,
            page: page || undefined,
            topic: topic || undefined,
        }
    });
    return response.data;   
};

export const fetchBookDetails = async (id) => {
    // denne funksjonen henter detaljer for en spesifikk bok basert på ID.
    const response = await axios.get (`${API_URL}${id}`);
    return response.data;
};

// Denne siden håndterer all kommunikasjonn med API-et ved hjelp av axios.