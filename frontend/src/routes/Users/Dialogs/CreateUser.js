import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../../../hooks/useForm';
import { validationSchema, defaultValues } from './CreateUser.form'


function CreateUserDialog({
  open,
  handleClose,
  submit,
  roles,
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
    value.password = value.username;
    submit(value);
    close();
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        {t("create_user")}
      </DialogTitle>
      <DialogContent>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label={t("username")}
              variant="outlined"
              margin="normal"
              autoFocus
              error={!!errors.username}
              helperText={t(errors.username?.message)}
              {...muiRegister("username")}
            />
            <TextField
              fullWidth
              multiline
              rowsMax={4}
              label="Email"
              variant="outlined"
              margin="normal"
              error={!!errors.email}
              helperText={t(errors.email?.message)}
              {...muiRegister("email")}
            />
            <TextField
              fullWidth
              select
              label={t("role")}
              variant="outlined"
              margin="normal"
              error={!!errors.roleId}
              helperText={t(errors.roleId?.message)}
              {...muiRegister("roleId")}
              defaultValue=''
            >
              <MenuItem value='' disabled>
                {t("no")}
              </MenuItem>
              {roles.map(role => (
                <MenuItem key={role.id} value={role.id}>
                  {role.title}
                </MenuItem>
              ))}
            </TextField>
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

export default CreateUserDialog;