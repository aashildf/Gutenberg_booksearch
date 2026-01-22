import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HashRouter as Router} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from "./theme.js"
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)

// QueryClientProvider:gir tilgang til API-henting i hele appen.
// CssBaseline: sørger for at MUI-stilen ser lik ut i alle nettlesere.
// BrowserRouter: gir tilgang til navigasjon/lenker i hele appen.
