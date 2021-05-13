import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  ListSubheader,
  Typography,
  IconButton,
} from '@material-ui/core';
import { AddCircle, } from '@material-ui/icons';
import TasksList from './TasksList';

function TaskCard({
  tasks,
  onAdd,
}) {

  return (
    <Grid container spacing={3} style={{ marginTop: 20, height: "80%", overflow: "auto" }}>
      {tasks.map((taskStatus, index) => {
        return (
          <Grid item xs={3} key={taskStatus.id}>
            <Card style={{ maxHeight: '50vh', overflow: 'auto' }} id={taskStatus.id}>
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
                      <AddCircle style={{ color: taskStatus.color }} />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
              </ListSubheader>
              <CardContent>
                <TasksList
                  list={taskStatus.tasks}
                  previous={index !== 0 ? tasks[index - 1].id : null}
                  next={index !== tasks.length - 1 ? tasks[index + 1].id : null}
                />
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid >
  );
};

export default TaskCard;