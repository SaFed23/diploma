import React from 'react';
import { Redirect } from 'react-router';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import { useLoadingState, useUserToken } from '../store';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content: {
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(12),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

function BaseComponent({
  component
}) {
  const classes = useStyles();
  const token = useUserToken();
  const loading = useLoadingState();

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <Header />
      <div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress size={60} />
        </Backdrop>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {component}
        </main>
      </div>
    </div>
  );
};

export default BaseComponent;