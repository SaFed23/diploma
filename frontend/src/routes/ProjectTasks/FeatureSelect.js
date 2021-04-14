import { Grid, IconButton } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React, { useState } from 'react';
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
      <SettingsDialog
        open={open}
        setOpen={setOpen}
        currentProject={currentProject}
      />
    </>
  );
};

export default FeatureSelect