/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, List, Typography, ListItem, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchLocations, createLocationAndFetch, updateLocationAndFetch, useLocationData } from '../../store';
import { AddCircle, Edit } from '@material-ui/icons';
import CreateDialog from './Dialog/Create';
import UpdateDialog from './Dialog/Update';

function Locations() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const locations = useLocationData();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  const handleCreateLocation = (value) => {
    dispatch(createLocationAndFetch(value));
  };

  const handleUpdateLocation = (value) => {
    dispatch(updateLocationAndFetch(value));
  };

  return (
    <div style={{ marginTop: 15 }}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h6">{t("locations")}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton style={{ marginLeft: 30 }} onClick={() => setCreate(true)}>
            <AddCircle color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <List style={{
        borderRight: '1px solid #DBDBDB',
        borderLeft: '1px solid #DBDBDB',
        maxHeight: 300,
        overflow: 'auto'
      }}>
        {locations.map(location => (
          <ListItem key={location.id}>
            <Grid container justify="space-between">
              <Grid item xs={11}>
                <Typography variant="button" style={{ fontWeight: "bold", margin: 15 }}>
                  {location.title}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => setUpdate(location)}>
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
        submit={handleCreateLocation}
        title="create_location"
      />
      <UpdateDialog
        title="update_location"
        value={update}
        handleClose={() => setUpdate(null)}
        submit={handleUpdateLocation}
      />
    </div >
  )
}

export default Locations;