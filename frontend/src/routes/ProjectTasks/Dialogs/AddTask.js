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
import useForm from '../../../hooks/useForm';
import { validationSchema, defaultValues } from './AddTask.form'
import { FiberManualRecord } from '@material-ui/icons';


function AddTaskDialog({
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
    reset(defaultValues);
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        <Grid container justify="space-between">
          <Grid item xs={11}>
            {t("add_task")}
          </Grid>
          <Grid item xs={1} style={{ textAlign: "right" }}>
            <FiberManualRecord fontSize="large" style={{ color: open?.color }} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
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
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={t("assign_yourself")}
              labelPlacement="end"
              {...muiRegister("assign")}
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

export default AddTaskDialog;