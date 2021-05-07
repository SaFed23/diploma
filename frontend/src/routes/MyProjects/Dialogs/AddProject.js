import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiberManualRecord } from '@material-ui/icons';
import useForm from '../../../hooks/useForm';
import { validationSchema, defaultValues } from './AddProject.form'


function AddProjectDialog({
  open,
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
    submit(value);
    reset();
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        <Grid container justify="space-between">
          {t("add_project")}
        </Grid>
      </DialogTitle>
      <DialogContent>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              rowsMax={4}
              label={t("description")}
              variant="outlined"
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
              {...muiRegister("description")}
            />
            <TextField
              fullWidth
              type="date"
              label={t("start_date")}
              variant="outlined"
              margin="normal"
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
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
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              InputLabelProps={{
                shrink: true,
              }}
              {...muiRegister("endDate")}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("create")}
            </Button>
          </form>
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          {t("exit")}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddProjectDialog;