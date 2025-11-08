import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from '@mui/material'
import theme from './theme/theme'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<ThemeProvider theme={theme}>
<App />
</ThemeProvider>
</React.StrictMode>
)