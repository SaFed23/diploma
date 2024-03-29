import React from 'react';
import {
  Grid,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  List,
  Badge,
  makeStyles
} from '@material-ui/core';
import {
  ChevronRight,
  ChevronLeft,
  VisibilityOff,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateTaskAndFetch, useUserData } from '../../store';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  badge: {
    fontSize: 10,
    height: 15,
    width: 15,
    transform: 'scale(1) translate(150%, -20%)',
  }
}));

function TasksList({
  list,
  previous,
  next,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useUserData();
  const classes = useStyles();

  const moveTo = (task, taskStatusId) => {
    const updateTask = {
      id: task.id,
      taskStatusId: taskStatusId,
    }
    dispatch(updateTaskAndFetch(updateTask));
  }

  const listWithoutTasks = () => {
    return (
      <ListItem>
        <ListItemIcon>
          <VisibilityOff fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("no_content")} />
      </ListItem>
    )
  };

  const listWithTasks = () => {
    return list.map(task => {
      return (
        <div key={task.id}>
          <Grid key={task.id} container>
            <Grid
              item
              xs={8}
              style={{
                borderRadius: 5,
                background: task?.users.find(u => u.id === user.id) && "#76baff",
              }}
            >
              <Link
                to={`/task/${task.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button>
                  <Badge classes={{ badge: classes.badge }} badgeContent={task?.users.length} color="primary">
                    <ListItemText primary={task.title} />
                  </Badge>
                </ListItem>
              </Link>
            </Grid>
            {previous !== next && (
              <>
                <Grid item xs={2}>
                  {previous && (
                    <IconButton
                      onClick={() => moveTo(task, previous)}
                    >
                      <ChevronLeft fontSize="small" />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={2}>
                  {next && (
                    <IconButton
                      onClick={() => moveTo(task, next)}
                    >
                      <ChevronRight fontSize="small" />
                    </IconButton>
                  )}
                </Grid>
              </>
            )}
          </Grid >
          <Divider />
        </div>
      )
    });
  }

  return (
    <List>
      {list.length ? listWithTasks() : listWithoutTasks()}
    </List>
  );
};

export default TasksList;