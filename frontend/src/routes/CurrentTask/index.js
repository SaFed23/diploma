import React, { useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, Input, Chip, MenuItem, useTheme, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchTaskById, useCurrentTask, taskAction } from '../../store';
import { fetchTaskStatuses, useTaskStatusData, useCurrentProject } from '../../store';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

function CurrentTask() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const currentTask = useCurrentTask();
  const taskStatuses = useTaskStatusData();
  const currentProject = useCurrentProject();
  const [personName, setPersonName] = React.useState([]);

  useEffect(() => {
    const taskId = window.location.pathname.split('/')[2];
    dispatch(fetchTaskStatuses());
    dispatch(fetchTaskById(taskId));

    return () => {
      dispatch(taskAction.clearCurrentTask())
    }
  }, [dispatch]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  if (!currentProject.id) {
    return <Redirect to='my-projects' />;
  }

  console.log(currentTask);

  return (
    <>
      <Grid container justify="space-between">
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h6">{currentTask.title}</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-mutiple-chip-label">{t('status')}</InputLabel>
                {currentTask.taskStatus && <Select
                  value={currentTask.taskStatus?.id}
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
              value={personName}
              onChange={handleChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {currentProject.users.map((user) => (
                <MenuItem key={user} value={user.id}
                // style={getStyles(user.id, theme)}
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
                  onDelete={() => console.log(111111)} />
              ))}
            </div>
          </FormControl>
        </Grid>
        <Grid item xs={5}>

        </Grid>
      </Grid>
    </>
  );
};

export default CurrentTask;