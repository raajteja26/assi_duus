import React, { useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import logo from "../images/logo.png"
import icon from "../images/icon.ico"
import Button from 'react-bootstrap/Button';

const ResponsiveAppBar =({onButtonClick}) => {
  return (
    <AppBar style={{backgroundColor:"white"}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <img style={{width:"14%"}} src={logo}/>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          <Button
            style={{ border: '1px solid #E7EDFD', backgroundColor: '#E7EDFD', color: 'black',marginRight:"10px"}}
            onClick={onButtonClick}
          >
              <span style={{color:"#71BE88"}}>Randomize Data</span>
            </Button>
            <Tooltip title="Open Profile">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Raaj" src={icon} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;