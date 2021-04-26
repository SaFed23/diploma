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
import { createFeatureAndFetch, deleteFeatureAndFetch, updateFeatureAndFetch } from '../../../store';
import { useDispatch } from 'react-redux';
import useConfirm from '../../../hooks/useConfirm';


function SettingsDialog({
  open,
  setOpen,
  currentProject,
  features,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setOpen: openConfirm, setAction } = useConfirm();
  const [current, setCurrent] = useState(0);

  const handleClose = () => {
    setOpen(false);
    setCurrent(0);
  };

  const handleChange = (event, newValue) => {
    setCurrent(newValue);
  };

  const handleCreateNewFeature = (value) => {
    dispatch(createFeatureAndFetch(value));
    handleClose();
  };

  const handleUpdateFeature = (value) => {
    dispatch(updateFeatureAndFetch(value));
    handleClose();
  };

  const handleDeleteFeature = (value) => {
    openConfirm(true);
    setAction(() => () => {
      dispatch(deleteFeatureAndFetch(value));
      handleClose();
    });
  }

  const createFeature = () => {
    const defaultValues = {
      title: "",
      description: "",
      projectId: currentProject.id
    };

    return (
      <>
        <DialogContentText>
          {t("create_new_feature_for")} {currentProject.title}
        </DialogContentText>
        <CreateForm
          defaultValues={defaultValues}
          submit={handleCreateNewFeature}
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
          submit={handleUpdateFeature}
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
          submit={handleDeleteFeature}
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