import React from 'react';
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Input,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';


function TaskData({
  currentTask,
  handleChangeStatus,
  taskStatuses,
  currentProject,
  taskUserIds,
  handleChangeUsers,
  handleDeleteUser,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h6">{currentTask.title}</Typography>
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
    </>
  )
};

export default TaskData;