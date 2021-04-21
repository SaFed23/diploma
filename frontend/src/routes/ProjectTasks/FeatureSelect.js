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
  const [openSetting, setOpenSetting] = useState(false);

  const handleChange = (event) => {
    setCurrentValue(values.find(val => val.id === event.target.value))
  };

  const GenerateSelect = ({ children }) => {
    if (user.id !== currentProject.owner?.id) {
      return (
        <Grid>
          {children}
        </Grid>
      )
    } else {
      return (
        <Grid container justify="space-between">
          <Grid item xs={11}>
            {children}
          </Grid>
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <IconButton onClick={() => setOpenSetting(true)}>
              <Settings />
            </IconButton>
          </Grid>
        </Grid>
      )
    }
  };

  return (
    <>
      <GenerateSelect>
        <Select
          title={t('feature')}
          values={values}
          onChange={handleChange}
          currentValue={currentValue?.id || ''}
          fullWidth={true}
        />
      </GenerateSelect>
      {currentValue?.description && (
        <Typography variant="caption" color="textSecondary">
          {t('description')}: {currentValue.description}
        </Typography>
      )}
      <SettingsDialog
        open={openSetting}
        setOpen={setOpenSetting}
        currentProject={currentProject}
        features={values}
      />
    </>
  );
};

export default FeatureSelect