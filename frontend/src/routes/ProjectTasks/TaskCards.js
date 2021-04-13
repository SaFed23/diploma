import React, { useState } from 'react';
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
  Typography
} from '@material-ui/core';
import Draggable from 'react-draggable';
import { VisibilityOff } from '@material-ui/icons';
import { useUserData } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TaskCard({
  tasks,
}) {
  const { t } = useTranslation();
  const user = useUserData();
  const [current, setCurrent] = useState('');
  console.log(current)

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
        console.log(JSON.parse(localStorage.getItem(`taskCards_${user.id}`))?.[taskStatus.id])
        return (
          <Draggable
            key={taskStatus.id}
            style={{ zIndex: taskStatus.id === current ? 9999 : 1 }}
            defaultPosition={JSON.parse(localStorage.getItem(`taskCards_${user.id}`))?.[taskStatus.id]}
            onDrag={(event, coord) => handleDrag(taskStatus.id, coord)}
            onStart={() => setCurrent(taskStatus.id)}
          >
            <Grid item xs={3}>
              <Card style={{ maxHeight: '50vh', overflow: 'auto' }}>
                <ListSubheader>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant="h6">{taskStatus.title}</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      style={{ background: taskStatus.color || 'grey', borderRadius: 40, margin: 10 }}
                    />
                  </Grid>
                  <Divider />
                </ListSubheader>
                <Typography
                  variant="h6"
                  style={{ background: taskStatus.color, textAlign: "center" }}
                >
                </Typography>
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