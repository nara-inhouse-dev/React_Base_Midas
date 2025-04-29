import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import SearchPage from './pages/SearchPage';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Source Sans Pro, sans-serif, Roboto Mono, Rubik Glitch',
  },
});

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { element: <SearchPage />, path: '/', index: true },
   
  ],
};

const mainRouter = createBrowserRouter([MainRoutes]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={mainRouter} />
    </ThemeProvider>
  );
}

export default App;
