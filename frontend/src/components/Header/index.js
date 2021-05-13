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
  Grid,
  Button
} from '@material-ui/core';
import clsx from 'clsx';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  MailOutline,
  ExitToApp
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { userAction, useUserData, useUserLanguage } from '../../store';
import { useStyles } from './style';
import { adminConfig, listConfig, userConfig } from './config';
import { Link } from 'react-router-dom';
import { useInvite } from '../../hooks/useInvite';
import { ROLES } from '../../utils/constants';

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useUserLanguage();
  const user = useUserData();
  const { invites, rejectInvite, acceptInvite } = useInvite(user.id);
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

  const handleLogout = () => {
    dispatch(userAction.clearUserData());
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
            open={!!anchorEl && !!invites.length}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <List component="nav" style={{ width: 400, maxHeight: 500, overflow: "auto" }}>
              {invites.map(invite => {
                return (
                  <div key={invite.id}>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography variant="body1" style={{ fontWeight: "bold" }}>
                            {invite.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption">
                            {new Date(invite.date).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
                          <Typography variant="body2">
                            {invite.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
                          <Typography variant="caption">
                            {t("to_project")}: {invite.project.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container justify="flex-end">
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => acceptInvite(invite)}
                            >
                              {t('accept')}
                            </Button>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => rejectInvite(invite)}
                            >
                              {t('reject')}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </div>
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
          {user?.role.title === ROLES.ADMIN && adminConfig.map(elem => (
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
          {userConfig.map(elem => (
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
        </List>
        <Divider />
        <ListItem
          button
          onClick={handleLogout}
        >
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary={t("logout")} />
        </ListItem>
      </Drawer>
    </div >
  );
}