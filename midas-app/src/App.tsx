import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import SearchPage from './pages/SearchPage';
import Preview from './layout/Preview';


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
    { element: <SearchPage />, path: '/home'},
    { element: <Preview />, path: '/contact'},
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
