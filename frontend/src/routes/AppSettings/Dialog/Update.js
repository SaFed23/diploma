/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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
import { validationSchema } from './CreateTaskStatus.form';


function UpdateDialog({
  value,
  title,
  handleClose,
  submit,
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues: { title: value?.title || "" },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(value);
  }, [value]);

  const close = () => {
    handleClose();
    reset();
  };

  const onSubmit = (value) => {
    submit(value);
    close();
  };

  return (
    <Dialog open={!!value} onClose={close}>
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
              helperText={t(errors.title?.message)}
              {...muiRegister("title")}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("update")}
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

export default UpdateDialog;