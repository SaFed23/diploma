import React from "react";
import useForm from '../../hooks/useForm';
import { Redirect } from "react-router";
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { defaultValues, validationSchema } from './auth.form';
import { userAuth, useUserToken } from "../../store";
import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useUserToken();
  const { handleSubmit, formState: { errors }, muiRegister } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (authData) => {
    dispatch(userAuth(authData));
  };

  if (token) {
    return <Redirect to="/my-projects" />
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={4}
      style={{ marginTop: '30vh' }}
    >
      <Typography variant="h5">My work</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth
          label={t("username")}
          variant="outlined"
          margin="normal"
          autoFocus
          error={!!errors.username}
          helperText={errors.username?.message}
          {...muiRegister('username')}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label={t("password")}
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...muiRegister('password')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>

    </Grid>
  );
};

export default Login;