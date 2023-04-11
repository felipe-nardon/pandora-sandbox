import * as React from 'react';
import {
  AppBar,
  Box,
  Drawer,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Squad from './components/squad/squad';
import ExecutiveScore from './components/executiveScore';
import Home from './components/home';

export default function App() {
  const [content, setContent] = React.useState(<ExecutiveScore />);

  const showHome = () => {
    setContent(<Home />);
  };

  const showScores = () => {
    setContent(<ExecutiveScore />);
  };

  const showSquad = () => {
    setContent(<Squad />);
  };

  return (
    <Box>
      <AppBar
        sx={{
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h5">Pandora</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left">
        <Toolbar />
        <MenuItem onClick={showHome}>Home</MenuItem>
        <MenuItem onClick={showSquad}>Squad</MenuItem>
        <MenuItem onClick={showScores}>Scores</MenuItem>
      </Drawer>
      <Box sx={{ paddingTop: 8, paddingLeft: 11 }}>{content}</Box>
    </Box>
  );
}
