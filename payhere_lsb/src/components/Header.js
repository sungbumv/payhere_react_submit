import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Github Restful API
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}