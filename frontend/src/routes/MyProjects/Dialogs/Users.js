import React, { useState } from 'react';
import {
  List,
  ListItem,
  Typography,
  Divider,
  Grid,
  IconButton,
  TextField,
  Chip,
  DialogContentText
} from '@material-ui/core';
import { Delete, Send } from '@material-ui/icons';
import { useUserData } from '../../../store';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import CreateInvite from './CreateInvite';

function ProjectUsers({
  project,
  users,
  handleDeleteUser,
  createInvite,
}) {
  const { t } = useTranslation();
  const currentUser = useUserData();
  const [selectedUsers, setUsers] = useState([]);
  const [send, setSend] = useState(false);

  const sendInvite = (value) => {
    selectedUsers.forEach(user => {
      const invite = { ...value };
      invite.date = new Date();
      invite.projectId = project.id;
      invite.userId = user.id;
      createInvite(invite);
    })
  };

  return (
    <>
      <DialogContentText>
        {t("invite_users")}
      </DialogContentText>
      <Grid container>
        <Grid item xs={11}>
          <Autocomplete
            size="small"
            multiple
            limitTags={2}
            options={users}
            getOptionLabel={(option) => option.username}
            getOptionDisabled={(option) => !!project.users.filter(user => user.id === option.id).length}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip size="small" color="primary" label={option.username} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={t("users")} color="primary" />
            )}
            onChange={(e, value) => setUsers(value)}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => setSend(true)}>
            <Send color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <DialogContentText style={{ marginTop: 10 }}>
        {t("current_users")}:
      </DialogContentText>
      <List style={{ maxHeight: 350, overflow: "auto", marginTop: -10 }}>
        {project?.users.map(user => {
          return (
            <div key={user.id}>
              <ListItem>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography variant="body1">{user.username}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body1">{user.email}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {user.id !== currentUser.id && (
                      <IconButton
                        style={{ marginTop: -10 }}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </div>
          )
        })}
        <CreateInvite
          open={send}
          handleClose={() => setSend(false)}
          submit={sendInvite}
          users={selectedUsers}
        />
      </List>
    </>
  )
};

export default ProjectUsers;