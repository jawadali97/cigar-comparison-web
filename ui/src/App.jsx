import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductsPage from './components/ProductsPage'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ADB5',
    },
    secondary: {
      main: '#EEEEEE',
    },
  },
});

function App() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Other components and layout */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <ProductsPage />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
