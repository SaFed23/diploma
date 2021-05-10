import React from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import useForm from '../../../hooks/useForm';

function CreateForm({
  defaultValues,
  submit,
}) {
  const { t } = useTranslation();
  const schema = yup.object({
    title: yup.string().required(t("required_field")),
    description: yup.string()
  });
  const { handleSubmit, formState: { errors }, muiRegister } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <TextField
          fullWidth
          label={t("title")}
          variant="outlined"
          margin="normal"
          autoFocus
          error={!!errors.title}
          helperText={errors.title?.message}
          {...muiRegister("title")}
        />
        <TextField
          fullWidth
          multiline
          label={t("description")}
          variant="outlined"
          margin="normal"
          error={!!errors.description}
          helperText={errors.description?.message}
          {...muiRegister("description")}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {t("create")}
        </Button>
      </form>
    </>
  )
};

export default CreateForm;