import React from 'react';
import { Box, Card, CardHeader, Grid } from '@material-ui/core';

function TaskCard({
  tasks,
  taskStatuses,
}) {
  console.log(taskStatuses);
  return (
    <Grid container spacing={3}>
      {taskStatuses.map(taskStatus => {
        return (
          <Grid item xs={2}>
            <Card>
              <CardHeader style={{ background: taskStatus.color }} title={taskStatus.title} />
            </Card>
          </Grid>
        )
      })}
    </Grid >
  );
};

export default TaskCard;