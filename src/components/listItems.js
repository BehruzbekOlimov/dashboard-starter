import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ListItem} from "@mui/material";
import {ShortText} from "@mui/icons-material";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItem button
              onClick={()=> {}}
              selected={true} style={{backgroundColor: 'rgba(0,0,0,0.1)'}}>
      <ListItemIcon>
        {
            <ShortText/>
        }
      </ListItemIcon>
      <ListItemText primary={"Menu"} />
    </ListItem>
  </React.Fragment>
);
