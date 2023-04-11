import { createTheme, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './src/App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
