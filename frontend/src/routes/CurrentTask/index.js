/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  fetchTaskById,
  useCurrentTask,
  taskAction,
  updateTaskAndFetch,
  fetchTaskStatuses,
  useTaskStatusData,
  useCurrentProject
} from '../../store';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import TaskData from './TaskData';

function CurrentTask() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentTask = useCurrentTask();
  const taskStatuses = useTaskStatusData();
  const currentProject = useCurrentProject();


  useEffect(() => {
    const taskId = window.location.pathname.split('/')[2];
    dispatch(fetchTaskStatuses());
    dispatch(fetchTaskById(taskId));

    return () => {
      dispatch(taskAction.clearCurrentTask())
    }
  }, []);

  const handleChangeStatus = (event) => {
    const updateTask = {
      id: currentTask.id,
      taskStatusId: event.target.value,
    }
    dispatch(updateTaskAndFetch(updateTask));
  };

  const handleChangeUsers = (event) => {
    const updateTask = {
      id: currentTask.id,
      userIds: event.target.value,
    }
    dispatch(updateTaskAndFetch(updateTask));
  };

  const handleDeleteUser = (userId) => {
    const newUserIds = currentTask.users.reduce((acc, { id }) => {
      if (id !== userId) {
        acc.push(id);
      }
      return acc;
    }, []);
    const updateTask = {
      id: currentTask.id,
      userIds: newUserIds,
    }
    dispatch(updateTaskAndFetch(updateTask));
  };

  if (!currentProject.id) {
    return <Redirect to='my-projects' />;
  }

  return (
    <>
      <Grid container justify="space-between">
        <Grid item xs={7}>
          <TaskData
            currentTask={currentTask}
            handleChangeStatus={handleChangeStatus}
            taskStatuses={taskStatuses}
            currentProject={currentProject}
            taskUserIds={currentTask?.users?.map(user => user.id) || []}
            handleChangeUsers={handleChangeUsers}
            handleDeleteUser={handleDeleteUser}
          />
        </Grid>

        <Grid item xs={5}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="subtitle1">{t("comments")}:</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CurrentTask;