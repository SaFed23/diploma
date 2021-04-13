import { Grid, IconButton } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from '../../components/common/Select';
import { roles } from '../../constants';
import { useUserData } from '../../store';

function FeatureSelect({
  values,
  setCurrentValue,
  currentValue
}) {
  const { t } = useTranslation();
  const user = useUserData();

  const handleChange = (event) => {
    setCurrentValue(values.find(val => val.id === event.target.value))
  };

  const generateSelect = () => {
    if (user.role.title !== roles.ADMIN) {
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
            <IconButton>
              <Settings />
            </IconButton>
          </Grid>
        </Grid>
      )
    }
  };

  return generateSelect();
};

export default FeatureSelect