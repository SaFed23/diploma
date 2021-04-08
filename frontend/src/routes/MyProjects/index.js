import { Grid, IconButton, Typography } from '@material-ui/core';
import { Add, AddBox } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

const MyProjects = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justify="space-between">
        <Grid item xs={6}>
          111111
        </Grid>
        <Grid item xs={6}>
          22222222
        </Grid>
      </Grid>
    </>
  )
};

export default MyProjects;