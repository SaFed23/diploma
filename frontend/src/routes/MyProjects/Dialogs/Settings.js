/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import { Edit, Delete, People } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';
import UpdateForm from './UpdateForm';
import { deleteProjectAndFetch, updateProjectAndFetch } from '../../../store';
import { useDispatch } from 'react-redux';
import { getDate } from '../../../utils/helper';
import DeleteProjectDialog from './DeleteProject';
import ProjectUsers from './Users';
import { getUsers } from '../../../service/user';
import { useProjectUsers } from '../../../hooks/useProjectUsers';


function SettingsDialog({
  currentProject,
  setProject
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [allUsers, setUsers] = useState([]);
  const { createInvite } = useProjectUsers(currentProject?.id, setProject);

  useEffect(async () => {
    const { data } = await getUsers();
    setUsers(data);
  }, []);

  const handleClose = () => {
    setProject(null);
    setCurrent(0);
  };

  const handleChange = (event, newValue) => {
    setCurrent(newValue);
  };

  const handleUpdateProject = async (value) => {
    const obj = { ...value };
    obj.id = currentProject.id;
    obj.startDate = getDate(value.startDate);
    obj.endDate = getDate(value.endDate);
    const { payload } = await dispatch(updateProjectAndFetch(obj));
    setProject(payload);
  };

  const handleDeleteUser = async (userId) => {
    const obj = {
      id: currentProject.id,
      userIds: currentProject.users.reduce(
        (acc, val) => {
          if (val.id !== userId) {
            acc.push(val.id);
          }
          return acc;
        }, []),
    };
    const { payload } = await dispatch(updateProjectAndFetch(obj));
    setProject(payload);
  };

  const handleDeleteProject = async () => {
    setProject(null);
    await dispatch(deleteProjectAndFetch(currentProject.id));
  };

  const updateProject = () => {
    return (
      <>
        <DialogContentText>
          {t("update_project")}
        </DialogContentText>
        <UpdateForm
          submit={handleUpdateProject}
          project={currentProject}
        />
      </>
    )
  };

  const users = () => {
    return (
      <>
        <ProjectUsers
          project={currentProject}
          users={allUsers}
          handleDeleteUser={handleDeleteUser}
          createInvite={createInvite}
        />
      </>
    )
  };

  const deleteProject = () => {
    return (
      <>
        <DialogContentText>{t("delete_project_text")}</DialogContentText>
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
          {current === 1 && users()}
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