import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductsPage from './components/ProductsPage'

function App() {
  return (
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
  )
}

export default App
