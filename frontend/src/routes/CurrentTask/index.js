/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  fetchTaskById,
  useCurrentTask,
  taskAction,
  updateTaskAndFetch,
  fetchTaskStatuses,
  useTaskStatusData,
  useCurrentProject,
  useUserData
} from '../../store';
import { Redirect } from 'react-router';
import TaskData from './TaskData';
import Comments from './Comments';

function CurrentTask() {
  const dispatch = useDispatch();
  const currentTask = useCurrentTask();
  const taskStatuses = useTaskStatusData();
  const currentProject = useCurrentProject();
  const user = useUserData();


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
      <Grid container justify="space-between" style={{ height: '100%' }}>
        <Grid item xs={7} style={{ borderRight: "1px solid #EDEDED" }}>
          <TaskData
            user={user}
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
          <Comments
            taskId={currentTask.id}
            user={user}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CurrentTask;