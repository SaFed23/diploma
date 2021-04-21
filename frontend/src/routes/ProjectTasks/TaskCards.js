import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  IconButton
} from '@material-ui/core';
import Draggable from 'react-draggable';
import { VisibilityOff, AddCircle } from '@material-ui/icons';
import { useUserData } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TaskCard({
  tasks,
  onAdd,
}) {
  const { t } = useTranslation();
  const user = useUserData();

  const handleDrag = (id, { x, y }) => {
    const taskCards = JSON.parse(localStorage.getItem(`taskCards_${user.id}`)) || {};
    taskCards[id] = { x, y };
    localStorage.setItem(`taskCards_${user.id}`, JSON.stringify(taskCards));
  }

  const generateCard = (list) => {
    if (list.length) {
      return list.map(task => {
        return (
          <div key={task.id}>
            <Link
              to={`/task/${task.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button>
                <ListItemText primary={task.title} />
              </ListItem>
            </Link>
            <Divider />
          </div >
        )
      });
    } else {
      return (
        <ListItem>
          <ListItemIcon>
            <VisibilityOff fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("no_content")} />
        </ListItem>
      )
    }
  }

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {tasks.map(taskStatus => {
        return (
          <Draggable
            key={taskStatus.id}
            defaultPosition={JSON.parse(localStorage.getItem(`taskCards_${user.id}`))?.[taskStatus.id]}
            onDrag={(event, coord) => handleDrag(taskStatus.id, coord)}
          >
            <Grid item xs={3}>
              <Card style={{ maxHeight: '50vh', overflow: 'auto' }}>
                <ListSubheader>
                  <Grid container justify="space-between">
                    <Grid item xs={9}>
                      <Typography variant="inherit">{taskStatus.title} ({taskStatus.tasks.length})</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{ textAlign: "right" }}
                    >
                      <IconButton onClick={() => onAdd(taskStatus)}>
                        <AddCircle style={{ color: taskStatus.color }} fontSize="medium" />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider />
                </ListSubheader>
                <CardContent>
                  <List>
                    {generateCard(taskStatus.tasks)}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Draggable>
        )
      })}
    </Grid >
  );
};

export default TaskCard;