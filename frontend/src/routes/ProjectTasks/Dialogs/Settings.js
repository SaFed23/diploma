import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Edit, Add, Delete } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';


function SettingsDialog({
  open,
  setOpen,
  currentProject,
  features,
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
      description: "",
    };

    return (
      <>
        <DialogContentText>
          {t("create_new_feature_for")} {currentProject.title}
        </DialogContentText>
        <CreateForm
          defaultValues={defaultValues}
          submit={(value) => console.log(value)}
        />
      </>
    )
  };

  const updateFeature = () => {
    return (
      <>
        <DialogContentText>
          {t("choose_feature")}
        </DialogContentText>
        <UpdateForm
          submit={(value) => console.log(value)}
          features={features}
        />
      </>
    )
  };

  const deleteFeature = () => {
    return (
      <>
        <DialogContentText>
          {t("choose_feature")}
        </DialogContentText>
        <DeleteForm
          features={features}
        />
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