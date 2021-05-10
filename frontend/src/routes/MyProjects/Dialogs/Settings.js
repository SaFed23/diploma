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
  Typography,
} from '@material-ui/core';
import { Edit, Delete, People } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';
import UpdateForm from './UpdateForm';
// import CreateForm from './CreateForm';
// import UpdateForm from './UpdateForm';
// import DeleteForm from './DeleteForm';
import { createFeatureAndFetch, deleteProjectAndFetch, updateProjectAndFetch } from '../../../store';
import { useDispatch } from 'react-redux';
import useConfirm from '../../../hooks/useConfirm';
import { getDate } from '../../../utils/helper';
import DeleteProjectDialog from './DeleteProject';


function SettingsDialog({
  currentProject,
  setProject
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setOpen: openConfirm, setAction } = useConfirm();
  const [current, setCurrent] = useState(0);

  const handleClose = () => {
    setProject(null);
    setCurrent(0);
  };

  const handleChange = (event, newValue) => {
    setCurrent(newValue);
  };

  const handleCreateNewFeature = (value) => {
    dispatch(createFeatureAndFetch(value));
    handleClose();
  };

  const handleUpdateProject = async (value) => {
    const obj = { ...value };
    obj.id = currentProject.id;
    obj.startDate = getDate(value.startDate);
    obj.endDate = getDate(value.endDate);
    const { payload } = await dispatch(updateProjectAndFetch(obj));
    setProject(payload);
  };

  const handleDeleteProject = async () => {
    setProject(null);
    await dispatch(deleteProjectAndFetch(currentProject.id));
  };

  // const createFeature = () => {
  //   const defaultValues = {
  //     title: "",
  //     description: "",
  //     projectId: currentProject.id
  //   };

  //   return (
  //     <>
  //       <DialogContentText>
  //         {t("create_new_feature_for")} {currentProject.title}
  //       </DialogContentText>
  //       <CreateForm
  //         defaultValues={defaultValues}
  //         submit={handleCreateNewFeature}
  //       />
  //     </>
  //   )
  // };

  const updateProject = () => {
    return (
      <>
        <DialogContentText>
          {t("choose_feature")}
        </DialogContentText>
        <UpdateForm
          submit={handleUpdateProject}
          project={currentProject}
        />
      </>
    )
  };

  const deleteProject = () => {
    return (
      <>
        <Typography variant="body2">{t("delete_project_text")}</Typography>
        <DeleteProjectDialog
          submit={handleDeleteProject}
          project={currentProject}
        />
      </>
    )
  };

  return (
    <div>
      <Dialog open={!!currentProject} onClose={handleClose}>
        <DialogTitle>
          <Tabs
            value={current}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<Edit />} label={t("update")} />
            <Tab icon={<People />} label={t("users")} />
            <Tab icon={<Delete />} label={t("delete")} />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          {current === 0 && updateProject()}
          {/* {current === 1 && updateFeature()} */}
          {current === 2 && deleteProject()}
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