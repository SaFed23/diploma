import React, { useState } from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../../../hooks/useForm';
import { validationSchema, defaultValues } from './DeleteProject.form'


function DeleteProjectDialog({
  project,
  submit,
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const [checkErr, setCheck] = useState("");

  const onSubmit = ({ title }) => {
    if (title !== project.title) {
      setCheck("titles_are_not_equal")
    } else {
      submit();
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label={t("title")}
        variant="outlined"
        margin="normal"
        autoFocus
        error={!!errors.title || !!checkErr}
        helperText={t(errors.title?.message) || t(checkErr)}
        {...muiRegister("title")}
      />
      <Button type="submit" fullWidth variant="contained" color="secondary">
        {t("delete")}
      </Button>
    </form>
  )
};

export default DeleteProjectDialog;