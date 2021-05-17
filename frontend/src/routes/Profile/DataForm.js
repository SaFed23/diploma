/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './DataForm.form';
import useForm from '../../hooks/useForm';
import ChangePasswordDialog from './Dialog/ChangePassword';


function DataForm({
  user,
  locations,
  submit,
  handleChangePassword,
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
    resolver: yupResolver(validationSchema),
  });
  const [locationId, setLocation] = useState(user.location?.id || '');
  const [changePassword, setChange] = useState(false);

  useEffect(() => {
    reset(user);
  }, [user]);

  const onSubmit = (value) => {
    value.locationId = locationId;
    submit(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label={t("username")}
          variant="outlined"
          margin="normal"
          autoFocus
          error={!!errors.username}
          helperText={errors.username?.message}
          {...muiRegister("username")}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...muiRegister("email")}
        />
        <TextField
          fullWidth
          select
          label={t("location")}
          variant="outlined"
          margin="normal"
          value={locationId}
          onChange={({ target }) => setLocation(target.value)}
        >
          <MenuItem value={''}>
            {t("no")}
          </MenuItem>
          {locations?.map(location => (
            <MenuItem key={location.id} value={location.id}>
              {location.title}
            </MenuItem>
          ))}
        </TextField>
        <Grid container justify="space-between">
          <Grid item xs={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("update")}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => setChange(true)}
            >
              {t("change_password")}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ChangePasswordDialog
        open={changePassword}
        handleClose={() => setChange(false)}
        submit={handleChangePassword}
      />
    </>
  )
};

export default DataForm;