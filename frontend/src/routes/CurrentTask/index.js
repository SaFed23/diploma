import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTaskById, useCurrentTask, taskAction } from '../../store';

function CurrentTask() {
  const dispatch = useDispatch();
  const currentTask = useCurrentTask();

  useEffect(() => {
    const taskId = window.location.pathname.split('/')[2];
    dispatch(fetchTaskById(taskId));

    return () => {
      dispatch(taskAction.clearCurrentTask())
    }
  }, [dispatch]);

  return (
    <>
      <Typography variant="h5">{currentTask.title}</Typography>
    </>
  );
};

export default CurrentTask;