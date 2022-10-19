import React, {useState} from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import {ExitToAppSharp, Menu, Refresh} from "@mui/icons-material";
import {ToastContainer} from "react-toastify";
import DashboardMenuList from "./listItems";
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
// import logo from '../asssets/images/logo-vatancabel.svg'
import PaginationComponent from "./PaginationComponent";
import pageList from "../utills/pageList";
import {LOCAL_STORAGE_NAME} from "../utills/constants";
import {useNavigate} from "react-router-dom";

const drawerWidth = 300;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#E94E1B',
    },
    secondary: {
      main: '#282828'
    }
  }
});

export default function Dashboard({setInitialData, setInitialLoading, initialLoading}) {
  const [currentMenu, setCurrentMenu] = useState(pageList[0]);
  const [open, setOpen] = useState(true);
  const [refreshVal, setRefreshVal] = useState(0);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const refresh = () => {
    setRefreshVal(refreshVal+1);
  }

  const navigate = useNavigate()
  return (<ThemeProvider theme={mdTheme}>
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{
          pr: '24px', // keep right padding when drawer closed
        }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '12px',
            }}
          >
            <Menu/>
          </IconButton>
          <Typography component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      sx={{flexGrow: 1}}>
            {currentMenu?currentMenu.name:"Dashboard"}
          </Typography>
          {/*<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>*/}
          {/*  /!*{this.props.user && props.user.firstName+(props.user.lastName &&+" "+ props.user.lastName)}*!/*/}
          {/*</Typography>*/}
          <IconButton color="inherit" onClick={refresh}>
            <Refresh/>
          </IconButton>
          <IconButton color="inherit" onClick={() => {
            localStorage.removeItem(LOCAL_STORAGE_NAME)
            navigate('/sign-in')
          }}>
            <ExitToAppSharp/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
      >
        <div className="overflow-auto vh-100 scroll-drawer">
          <div className="p-3">
            <strong>LOGO</strong>
            {/*<img src={logo} alt="LOGO" height={20}/>*/}
          </div>
          <Divider/>
          <List className="mt-0 pt-0">
            <DashboardMenuList current={currentMenu} setCurrentMenu={setCurrentMenu}/>
          </List>
        </div>

      </Drawer>
      <Box
        compon ent="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar/>
        <Container maxWidth="lg" sx={{mt: 2, mb: 4}}>
          <PaginationComponent loading={initialLoading} show={currentMenu && currentMenu.pageable && currentMenu.pageable.show} pageable={currentMenu.pageable} refresh={refreshVal} setData={setInitialData} setLoading={setInitialLoading}/>
        </Container>
        <ToastContainer/>
      </Box>
    </Box>
  </ThemeProvider>);
}
