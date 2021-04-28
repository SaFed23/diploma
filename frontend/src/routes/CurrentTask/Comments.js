import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useComment } from '../../hooks/useComment';
import { Send } from '@material-ui/icons';

function Comments({
  taskId,
  user
}) {
  const { t } = useTranslation();
  const { comments } = useComment(taskId);

  console.log(comments);

  return (
    <div style={{ marginLeft: 5, height: "100%" }}>
      <Typography variant="subtitle1">{t("comments")}:</Typography>
      <div style={{
        marginBottom: 20,
        height: "calc(70vh - 64px)",
        overflow: 'auto'
      }}>
        {comments.map(comment => {
          const isCurrent = user.id === comment.user.id;

          return (
            <Grid
              container
              justify={isCurrent ? "flex-end" : "flex-start"}
            >
              <Card
                style={{
                  marginTop: 10,
                  maxWidth: '80%',
                  background: isCurrent && '#3f51b5',
                  color: isCurrent && '#fff',
                }}
              >
                <CardContent>
                  {comment.description}
                </CardContent>
                <CardActions style={{ fontSize: 8, marginTop: -20 }}>
                  {new Date(comment.date).toLocaleString()}
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </div>
      <form>
        <Grid container>
          <Grid item lg={11}>
            <TextField
              label={t("add_comment")}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item lg={1}>
            <IconButton
              type="submit"
            >
              <Send color="primary" />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default Comments;