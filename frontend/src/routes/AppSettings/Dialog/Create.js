import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../../../hooks/useForm';
import { validationSchema, defaultValues } from './CreateTaskStatus.form';


function CreateDialog({
  open,
  title,
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
    handleClose();
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        {t(title)}
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

export default CreateDialog;