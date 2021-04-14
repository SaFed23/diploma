import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Edit, Add, Delete } from "@material-ui/icons";
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Form = (defaultValues, submit) => {
  const { t } = useTranslation();
  const schema = {
    title: yup.string().required(t("required_field"))
  }
  const { handleSubmit, formState: { errors }, control } = useForm({
    defaultValues,
    resolver: yupResolver({
      resolver: schema,
    }),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField fullWidth
            label={t("title")}
            variant="outlined"
            margin="normal"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...field}
          />}
        />
        <Button fullWidth variant="contained" color="primary">
          {t("create")}
        </Button>
      </form>
    </>
  )
}


function SettingsDialog({
  open,
  setOpen,
  currentProject,
}) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setCurrent(newValue);
  };

  const createFeature = () => {
    const defaultValues = {
      title: "",
    };

    return (
      <>
        <DialogContentText>
          {t("create_new_feature_for")} {currentProject.title}
        </DialogContentText>
        <Form
          defaultValues={defaultValues}
          handleSubmit={(value) => console.log(value)}
        />
      </>
    )
  };

  const updateFeature = () => {
    const defaultValues = {
      title: "",
    };

    return (
      <>
        <DialogContentText>
          {t("update_feature")}
        </DialogContentText>
        <Form
          defaultValues={defaultValues}
          handleSubmit={(value) => console.log(value)}
        />
      </>
    )
  };

  const deleteFeature = () => {
    return (
      <>
        <DialogContentText>
          {t("delete_feature")}
        </DialogContentText>
      </>
    )
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Tabs
            value={current}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<Add />} label={t("create")} />
            <Tab icon={<Edit />} label={t("update")} />
            <Tab icon={<Delete />} label={t("delete")} />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          {current === 0 && createFeature()}
          {current === 1 && updateFeature()}
          {current === 2 && deleteFeature()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("exit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default SettingsDialog;