import React, { useEffect } from 'react';
import { Divider, Grid, IconButton, Typography } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useProjectData, fetchUserProjects, useUserData } from '../../store';
import ProjectsList from './ProjectsList';

const MyProjects = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useUserData();
  const projects = useProjectData();

  console.log(user);
  useEffect(() => {
    dispatch(fetchUserProjects(user.id))
  }, [dispatch, user.id]);

  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant='h5'>{t('projects')}</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <AddBox color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <Divider style={{ borderBottom: '2px solid #aaa' }} />
      <ProjectsList data={projects} />
    </>
  )
};

export default MyProjects;