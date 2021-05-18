import React from 'react';
import {
  TextField,
  Grid,
  IconButton,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../../hooks/useForm';
import { validationSchema, defaultValues } from './DateFilter.form';
import { Search } from '@material-ui/icons';


function DateFilter({
  handleClose,
  submit,
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const close = () => {
    handleClose();
    reset();
  };

  const onSubmit = (value) => {
    console.log(value);
    // submit(value);
    // close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            type="date"
            label={t("start_date")}
            variant="outlined"
            margin="normal"
            autoFocus
            error={!!errors.startDate}
            helperText={t(errors.startDate?.message)}
            {...muiRegister("startDate")}
            size="small"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            type="date"
            label={t("end_date")}
            variant="outlined"
            margin="normal"
            autoFocus
            error={!!errors.endDate}
            helperText={t(errors.endDate?.message)}
            {...muiRegister("endDate")}
            size="small"
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
            size="large"
          >
            <Search />
          </Button>
        </Grid>
      </Grid >
    </form>
  )
};

export default DateFilter;