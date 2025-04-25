import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/rubik-glitch';
import '@fontsource/source-sans-pro';
import '@fontsource/roboto-mono';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Preview from './layout/Preview';
import './App.css'


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Source Sans Pro, sans-serif, Roboto Mono, Rubik Glitch',
  },
});
 
const previewRoutes = {
  path: '/',
  element: <Preview />,
};

const previewRouter = createBrowserRouter([previewRoutes]);


function App() {
  
  return (
    <ThemeProvider theme={theme}>


      <CssBaseline />
      <RouterProvider router={previewRouter} /> 
        
    </ThemeProvider>

  )
}

export default App
