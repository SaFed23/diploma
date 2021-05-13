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
import { validationSchema, defaultValues } from './CreateTaskStatus.form';
import { ChromePicker } from 'react-color';


function CreateTaskStatus({
  open,
  handleClose,
  submit,
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const [color, setColor] = useState("#fff")

  const close = () => {
    handleClose();
    setColor("#fff");
    reset();
  };

  const onSubmit = (value) => {
    const newStatus = { ...value, color: color.hex };
    submit(newStatus);
    handleClose();
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        {t("create_task_status")}
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
            {t("color")}:
            <div style={{ margin: 15 }}>
              <ChromePicker
                color={color}
                onChange={(color) => setColor(color)}
                disableAlpha={true}
              />
            </div>
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

export default CreateTaskStatus;