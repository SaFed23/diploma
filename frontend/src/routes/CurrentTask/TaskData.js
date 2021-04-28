import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Input,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons'
import { useTranslation } from 'react-i18next';
import useConfirm from '../../hooks/useConfirm';
import { useDispatch } from 'react-redux';
import { deleteTaskAndFetch } from '../../store';
import { Redirect } from 'react-router';


function TaskData({
  user,
  currentTask,
  handleChangeStatus,
  taskStatuses,
  currentProject,
  taskUserIds,
  handleChangeUsers,
  handleDeleteUser,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setOpen, setAction } = useConfirm();
  const [isDelete, setDelete] = useState(false);

  const handleDeleteTask = () => {
    setOpen(true);
    setAction(() => () => {
      dispatch(deleteTaskAndFetch(currentTask.id));
      setDelete(true);
    });
  };

  if (isDelete) {
    return <Redirect to={`/my-projects/${currentProject.id}`} />
  }

  return (
    <div style={{ marginRight: 5 }}>
      <Grid container>
        <Grid item xs={8}>
          <Grid container justify="flex-start">
            <Typography variant="h6">{currentTask.title}</Typography>
            {currentProject.owner.id === user.id && (
              <IconButton
                style={{ paddingTop: 6 }}
                onClick={handleDeleteTask}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="demo-mutiple-chip-label">{t('status')}</InputLabel>
            {currentTask.taskStatus && <Select
              value={currentTask.taskStatus?.id}
              onChange={handleChangeStatus}
              fullWidth
              label={t("status")}
            >
              {taskStatuses.map((status) => (
                <MenuItem
                  key={status.id}
                  value={status.id}
                >
                  {status.title}
                </MenuItem>
              ))}
            </Select>}
          </FormControl>
        </Grid>
      </Grid>
      <FormControl style={{ width: "100%" }}>
        <InputLabel>{t("users")}</InputLabel>
        <Select
          multiple
          value={taskUserIds}
          onChange={handleChangeUsers}
          input={<Input />}
        >
          {currentProject.users.map((user) => (
            <MenuItem key={user.id} value={user.id}
            >
              {user.username}
            </MenuItem>
          ))}
        </Select>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {currentTask.users?.map((user) => (
            <Chip
              key={user.id}
              label={user.username}
              style={{
                margin: 2,
              }}
              color="primary"
              onDelete={() => handleDeleteUser(user.id)} />
          ))}
        </div>
      </FormControl>
      <Typography variant="body1" style={{ marginTop: "5%" }}>
        {t('description')}:
          </Typography>
      <Typography variant="body2" style={{ marginTop: "2%", marginLeft: "2%" }}>
        {currentTask.description}
      </Typography>
    </div>
  )
};

export default TaskData;