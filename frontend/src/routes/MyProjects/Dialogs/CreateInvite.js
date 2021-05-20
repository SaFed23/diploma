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
import { validationSchema, defaultValues } from './CreateInvite.form'


function CreateInvite({
  open,
  handleClose,
  submit,
  users,
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
    reset();
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        {t("send_invite_for_users")}: {users.map(user => user.username).join(", ")}
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("send")}
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

export default CreateInvite;