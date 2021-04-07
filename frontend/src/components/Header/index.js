import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Select,
  FormControl,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  CssBaseline,
} from '@material-ui/core';
import clsx from 'clsx';
import { Menu as MenuIcon, AccountCircle, ChevronLeft, ChevronRight, Inbox, Mail } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { userAction, useUserData, useUserLanguage } from '../../store';
import { useStyles } from './style';

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useUserLanguage();
  const user = useUserData();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    dispatch(userAction.setUserLanguage(event.target.value));
    i18n.changeLanguage(event.target.value)
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My work
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={language}
              onChange={handleChange}
              className={classes.select}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="ru">RU</MenuItem>
            </Select>
          </FormControl>
          <div>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <Typography style={{ marginRight: 3 }}>{user.username}</Typography>
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{t('profile')}</MenuItem>
              <MenuItem onClick={handleClose}>{t('settings')}</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>{t('logout')}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}