import React, { useState } from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import Select from '../../components/common/Select';
import { useUserData } from '../../store';
import SettingsDialog from './Dialogs/Settings';

function FeatureSelect({
  values,
  setCurrentValue,
  currentValue,
  currentProject
}) {
  const { t } = useTranslation();
  const user = useUserData();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCurrentValue(values.find(val => val.id === event.target.value))
  };

  const generateSelect = () => {
    if (user.id !== currentProject?.owner.id) {
      return (
        <Grid>
          <Select
            title={t('feature')}
            values={values}
            onChange={handleChange}
            currentValue={currentValue?.id || ''}
            fullWidth={true}
          />
        </Grid>
      )
    } else {
      return (
        <Grid container justify="space-between">
          <Grid item xs={11}>
            <Select
              title={t('feature')}
              values={values}
              onChange={handleChange}
              currentValue={currentValue?.id || ''}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <IconButton onClick={() => setOpen(true)}>
              <Settings />
            </IconButton>
          </Grid>
        </Grid>
      )
    }
  };

  return (
    <>
      {generateSelect()}
      {currentValue?.description && (
        <Typography variant="caption" color="textSecondary">
          {t('description')}: {currentValue.description}
        </Typography>
      )}
      <SettingsDialog
        open={open}
        setOpen={setOpen}
        currentProject={currentProject}
        features={values}
      />
    </>
  );
};

export default FeatureSelect