import React from "react";
import { Controller, useForm } from 'react-hook-form';
import { Redirect } from "react-router";
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { defaultValues, validationSchema } from './auth.form';
import { userAuth, useUserToken } from "../../store";

const Login = () => {
  const dispatch = useDispatch();
  const token = useUserToken();
  const { handleSubmit, formState: { errors }, control } = useForm({
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
        <Controller
          name="username"
          control={control}
          render={({ field }) => <TextField fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...field}
          />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...field}
          />}
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