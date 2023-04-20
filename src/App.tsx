import * as React from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Squad from './components/squad';
import ExecutiveScore from './components/executiveScore';
import Home from './components/home';
import MenuIcon from '@mui/icons-material/Menu';

export default function App() {
  const loadSquadMenu = () => {
    setContent(<Squad />);
  };
  const [content, setContent] = React.useState(
    <ExecutiveScore loadSquadMenu={loadSquadMenu} />
  );
  const [menu, setMenu] = React.useState(false);

  const showContent = (content: JSX.Element) => () => {
    setContent(content);
    setMenu(false);
  };

  const showMenu = (open: boolean) => () => {
    setMenu(open);
  };

  return (
    <Box marginTop={10}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={showMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">Pandora</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={menu} onClose={showMenu(false)}>
        <Toolbar />
        <MenuItem onClick={showContent(<Home />)}>Home</MenuItem>
        <MenuItem onClick={showContent(<Squad />)}>Squad</MenuItem>
        <MenuItem
          onClick={showContent(
            <ExecutiveScore loadSquadMenu={loadSquadMenu} />
          )}
        >
          Scores
        </MenuItem>
      </Drawer>
      {content}
    </Box>
  );
}
