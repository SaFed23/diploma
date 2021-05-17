import React, { useState } from 'react';
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
import { validationSchema, defaultValues } from './ChangePassword.form'


function ChangePasswordDialog({
  open,
  handleClose,
  submit,
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const [check, setCheck] = useState('');
  const [oldCheck, setOld] = useState('');

  const close = () => {
    handleClose();
    reset();
  };

  const checkAnswer = ({ payload }) => {
    if (!payload) {
      setOld('password_is_wrong');
    } else {
      close();
    }
  };

  const onSubmit = (value) => {
    if (value.newPassword.length < 8) {
      setCheck("password_cannot_be_less_then_8")
    } else if (value.newPassword !== value.repeatNewPassword) {
      setCheck("passwords_dont't_match")
    } else {
      submit({
        password: value.newPassword,
        oldPassword: value.oldPassword
      }, checkAnswer);
    }
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        {t("change_password")}
      </DialogTitle>
      <DialogContent>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              type="password"
              label={t("old_password")}
              variant="outlined"
              margin="normal"
              autoFocus
              error={!!errors.oldPassword || !!oldCheck}
              helperText={t(errors.oldPassword?.message) || t(oldCheck)}
              {...muiRegister("oldPassword")}
            />
            <TextField
              fullWidth
              type="password"
              label={t("new_password")}
              variant="outlined"
              margin="normal"
              error={!!errors.newPassword || !!check}
              helperText={t(errors.newPassword?.message) || t(check)}
              {...muiRegister("newPassword")}
            />
            <TextField
              fullWidth
              type="password"
              label={t("repeat_new_password")}
              variant="outlined"
              margin="normal"
              error={!!errors.repeatNewPassword || !!check}
              helperText={t(errors.repeatNewPassword?.message) || t(check)}
              {...muiRegister("repeatNewPassword")}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("save")}
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

export default ChangePasswordDialog;