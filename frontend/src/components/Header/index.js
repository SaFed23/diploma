import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
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
  Badge,
  Popover,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  MailOutline
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { userAction, useUserData, useUserLanguage } from '../../store';
import { useStyles } from './style';
import { listConfig, userConfig } from './config';
import { Link } from 'react-router-dom';
import { useInvite } from '../../hooks/useInvite';

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useUserLanguage();
  const user = useUserData();
  const { invites } = useInvite(user.id);
  const [openDrawer, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    dispatch(userAction.setUserLanguage(event.target.value));
    localStorage.setItem('lng', event.target.value)
    i18n.changeLanguage(event.target.value)
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
            <Typography style={{ marginRight: 3, marginLeft: 30 }}>
              {`${t('hi')}, ${user.username}`}
            </Typography>
          </div>
          <IconButton color="inherit" onClick={handleClick}>
            <Badge variant="dot" color="secondary" badgeContent={invites.length}>
              <MailOutline />
            </Badge>
          </IconButton>
          <Popover
            open={!!anchorEl && invites.length}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <List component="nav">
              {invites.map(invite => {
                return (
                  <>
                    <ListItem>
                      <ListItemText primary={invite.title} />
                    </ListItem>
                    <Divider />
                  </>
                )
              })}
            </List>
          </Popover>
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
          {listConfig.map(elem => (
            <Link
              key={elem.label}
              style={{ textDecoration: "none", color: "black" }}
              to={elem.path}>
              <ListItem
                button
                selected={window.location.pathname === elem.path}
              >
                <ListItemIcon>{elem.icon}</ListItemIcon>
                <ListItemText primary={t(elem.label)} />
              </ListItem>
            </Link>
          ))}
          <Divider />
          {userConfig.map(elem => {
            if (elem.path) {
              return (
                <Link
                  key={elem.label}
                  style={{ textDecoration: "none", color: "black" }}
                  to={elem.path}>
                  <ListItem
                    button
                    selected={window.location.pathname === elem.path}
                  >
                    <ListItemIcon>{elem.icon}</ListItemIcon>
                    <ListItemText primary={t(elem.label)} />
                  </ListItem>
                </Link>
              );
            }
            return (
              <ListItem
                key={elem.label}
                button
                selected={window.location.pathname === elem.path}
                onClick={elem.func}
              >
                <ListItemIcon>{elem.icon}</ListItemIcon>
                <ListItemText primary={t(elem.label)} />
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </div >
  );
}