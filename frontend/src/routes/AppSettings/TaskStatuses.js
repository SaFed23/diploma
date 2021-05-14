/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, List, Typography, ListItem, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createTaskStatusAndFetch, deleteTaskStatusAndFetch, fetchTaskStatuses, updateLocationAndFetch, useTaskStatusData } from '../../store';
import { AddCircle, Delete, Edit } from '@material-ui/icons';
import CreateTaskStatus from './Dialog/CreateTaskStatus';
import UpdateTaskStatus from './Dialog/UpdateTaskStatus';
import DeleteTaskStatus from './Dialog/DeleteTaskStatus';

function TaskStatuses() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskStatuses = useTaskStatusData();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(null);
  const [deleteId, setDelete] = useState("");

  useEffect(() => {
    dispatch(fetchTaskStatuses());
  }, []);

  const handleCreateStatus = (value) => {
    dispatch(createTaskStatusAndFetch(value));
  };

  const handleUpdateStatus = (value) => {
    dispatch(updateLocationAndFetch(value));
  };

  const handleDeleteStatus = (statusId) => {
    const obj = {
      id: deleteId,
      relocateId: statusId,
    };

    dispatch(deleteTaskStatusAndFetch(obj));
  };

  return (
    <div style={{ marginTop: 15 }}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h6">{t("task_statuses")}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton style={{ marginLeft: 30 }} onClick={() => setCreate(true)}>
            <AddCircle color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <List style={{ borderRight: '1px solid #DBDBDB', borderLeft: '1px solid #DBDBDB' }}>
        {taskStatuses.map(taskStatus => (
          <ListItem key={taskStatus.id}>
            <Grid container justify="space-between">
              <Grid item xs={11} style={{ background: taskStatus.color, borderRadius: 5 }}>
                <Typography variant="button" style={{ fontWeight: "bold", margin: 15 }}>
                  {taskStatus.title}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => setUpdate(taskStatus)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton onClick={() => setDelete(taskStatus.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <CreateTaskStatus
        open={create}
        handleClose={() => setCreate(false)}
        submit={handleCreateStatus}
      />
      <UpdateTaskStatus
        status={update}
        handleClose={() => setUpdate(null)}
        submit={handleUpdateStatus}
      />
      <DeleteTaskStatus
        open={deleteId}
        setOpen={setDelete}
        taskStatuses={taskStatuses.filter(status => status.id !== deleteId)}
        handleDelete={handleDeleteStatus}
      />
    </div >
  )
}

export default TaskStatuses;