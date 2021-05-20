/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { TextField, Button, } from '@material-ui/core';
import useForm from '../../../hooks/useForm';
import { validationSchema } from './Update.form';
import { getDate } from '../../../utils/helper';

function UpdateForm({
  project,
  submit
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister } = useForm({
    defaultValues: {
      title: project?.title,
      description: project?.description,
      startDate: project?.startDate ? getDate(new Date(project.startDate)) : new Date().toISOString().split('T')[0],
      endDate: project?.endDate ? getDate(new Date(project.endDate)) : new Date().toISOString().split('T')[0],
    },
    resolver: yupResolver(validationSchema),
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
          helperText={t(errors.title?.message)}
          {...muiRegister("title")}
        />
        <TextField
          fullWidth
          multiline
          label={t("description")}
          variant="outlined"
          margin="normal"
          error={!!errors.description}
          helperText={t(errors.description?.message)}
          {...muiRegister("description")}
        />
        <TextField
          fullWidth
          type="date"
          label={t("start_date")}
          variant="outlined"
          margin="normal"
          error={!!errors.startDate}
          helperText={t(errors.startDate?.message)}
          InputLabelProps={{
            shrink: true,
          }}
          {...muiRegister("startDate")}
        />
        <TextField
          fullWidth
          type="date"
          label={t("end_date")}
          variant="outlined"
          margin="normal"
          error={!!errors.endDate}
          helperText={t(errors.endDate?.message)}
          InputLabelProps={{
            shrink: true,
          }}
          {...muiRegister("endDate")}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {t("update")}
        </Button>
      </form>
    </>
  )
};

export default UpdateForm;