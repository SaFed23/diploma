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
import { Send } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useComment } from '../../hooks/useComment';
import useForm from '../../hooks/useForm';
import { defaultValues, validationSchema } from './Comments.form';

function Comments({
  taskId,
  user
}) {
  const { t } = useTranslation();
  const { comments, addComment } = useComment(taskId);
  const { handleSubmit, formState: { errors }, muiRegister, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleAddComment = (comment) => {
    comment.taskId = taskId;
    comment.userId = user.id;
    addComment(comment);
    reset();
  };

  return (
    <div style={{ marginLeft: 5, height: "100%" }}>
      <Typography variant="subtitle1">{t("comments")}:</Typography>
      <div style={{
        marginBottom: 20,
        height: "calc(100vh - 250px)",
        overflow: 'auto'
      }}>
        {comments.map(comment => {
          const isCurrent = user.id === comment.user.id;

          return (
            <Grid
              container
              justify={isCurrent ? "flex-end" : "flex-start"}
              key={comment.id}
            >
              <Card
                style={{
                  marginTop: 10,
                  maxWidth: '80%',
                  background: isCurrent && '#3f51b5',
                  color: isCurrent && '#fff',
                }}
              >
                <CardContent style={{ whiteSpace: 'pre-wrap' }}>
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
      <form onSubmit={handleSubmit(handleAddComment)}>
        <Grid container>
          <Grid item lg={11}>
            <TextField
              label={t("add_comment")}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              error={!!errors.username}
              helperText={t(errors.username?.message)}
              {...muiRegister('description')}
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