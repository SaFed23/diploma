/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, List, Typography, ListItem, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchFactors, createFactorAndFetch, updateFactorAndFetch, useFactorData } from '../../store';
import { AddCircle, Edit } from '@material-ui/icons';
import CreateDialog from './Dialog/Create';
import UpdateDialog from './Dialog/Update';

function Locations() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const factors = useFactorData();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    dispatch(fetchFactors());
  }, []);

  const handleCreateFactor = (value) => {
    dispatch(createFactorAndFetch(value));
  };

  const handleUpdateFactor = (value) => {
    dispatch(updateFactorAndFetch(value));
  };

  return (
    <div style={{ marginTop: 15 }}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h6">{t("factors")}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton style={{ marginLeft: 30 }} onClick={() => setCreate(true)}>
            <AddCircle color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <List style={{ borderRight: '1px solid #DBDBDB', borderLeft: '1px solid #DBDBDB' }}>
        {factors.map(factor => (
          <ListItem key={factor.id}>
            <Grid container justify="space-between">
              <Grid item xs={11}>
                <Typography variant="button" style={{ fontWeight: "bold", margin: 15 }}>
                  {factor.title}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => setUpdate(factor)}>
                  <Edit fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <CreateDialog
        open={create}
        handleClose={() => setCreate(false)}
        submit={handleCreateFactor}
        title="create_factor"
      />
      <UpdateDialog
        title="update_factor"
        value={update}
        handleClose={() => setUpdate(null)}
        submit={handleUpdateFactor}
      />
    </div >
  )
}

export default Locations;