import React, { useEffect, useState } from 'react';
import { validationSchema } from './ReportForm.form';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../../hooks/useForm';
import { Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function ReportForm({
  date,
  report,
  user,
}) {
  const { t } = useTranslation();
  const [defaultValues, setValues] = useState({});

  const isWeekend = (day) => {
    const dayOfWeek = new Date(day).getDay();
    return (dayOfWeek === 6) || (dayOfWeek === 0);
  };

  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues: {
      projectId: report?.projectId || '',
      featureId: report?.featureId || '',
      taskId: report?.taskId || '',
      hours: isWeekend(date) ? 0 : 8,
      factorId: report?.factorId || '',
      locationId: report?.locationId || user.location.id || '',
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const obj = {
      projectId: report?.projectId || '',
      featureId: report?.featureId || '',
      taskId: report?.taskId || '',
      hours: isWeekend(date) ? 0 : 8,
      factorId: report?.factorId || '',
      locationId: report?.locationId || user.location.id || '',
    };

    console.log(report, obj);

    reset(obj);

  }, [date, report, user]);

  return (
    <form style={{ marginTop: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label={t("project")}
            fullWidth
            variant="outlined"
            error={!!errors.projectId}
            helperText={t(errors.projectId?.message)}
            {...muiRegister('projectId')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("feature")}
            fullWidth
            variant="outlined"
            error={!!errors.featureId}
            helperText={t(errors.featureId?.message)}
            {...muiRegister('featureId')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("task")}
            fullWidth
            variant="outlined"
            error={!!errors.taskId}
            helperText={t(errors.taskId?.message)}
            {...muiRegister('taskId')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("hours")}
            fullWidth
            variant="outlined"
            error={!!errors.hours}
            helperText={t(errors.hours?.message)}
            {...muiRegister('hours')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("factor")}
            fullWidth
            variant="outlined"
            error={!!errors.factorId}
            helperText={t(errors.factorId?.message)}
            {...muiRegister('factorId')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("location")}
            fullWidth
            variant="outlined"
            error={!!errors.locationId}
            helperText={t(errors.locationId?.message)}
            {...muiRegister('locationId')}
          />
        </Grid>
      </Grid>
    </form>
  )
};

export default ReportForm;