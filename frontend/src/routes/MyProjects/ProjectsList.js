import React, { useState } from 'react';
import {
  List,
  ListItem,
  Collapse,
  ListItemText,
  Divider,
  IconButton,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Settings from './Dialogs/Settings';

const classes = {
  addInfo: {
    fontSize: 14,
  }
}

function ProjectsList({
  data,
  user,
}) {
  const [open, setOpen] = useState('');
  const [currentProject, setProject] = useState(null);
  const { t } = useTranslation();

  const handleOpen = (id) => {
    if (id === open) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  const generateColor = (val) => {
    const currentDate = new Date();
    const startDate = new Date(val.startDate);
    const endDate = new Date(val.endDate);
    if (startDate > currentDate) {
      return "yellow";
    } else if (endDate < currentDate) {
      return "red";
    }
    return "green";
  }

  return (
    <List style={{ overflow: 'auto', height: 'calc(100vh - 140px)' }}>
      {data.map(val => {
        const startDate = new Date(val.startDate).toLocaleDateString();
        const endDate = new Date(val.endDate).toLocaleDateString();
        return (
          <div key={val.id}>
            <ListItem>
              <ListItemText>
                <Link
                  to={`/my-projects/${val.id}`}
                  style={{ color: "black", fontWeight: "bold", fontSize: 18 }}
                >
                  {val.title}
                </Link>
              </ListItemText>

              <ListItemText primary={`${startDate} - ${endDate}`} />
              <IconButton onClick={() => handleOpen(val.id)}>
                {open === val.id ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={open === val.id} timeout="auto" unmountOnExit>
              <Grid container style={{ paddingLeft: 20, paddingTop: 10, marginBottom: 5 }}>
                <Grid item xs={2}>
                  <Typography style={classes.addInfo}>
                    {t('owner')}: {val.owner.username}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography style={classes.addInfo}>
                    {t('users_count')}: {val.users.length}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography style={{ ...classes.addInfo, whiteSpace: 'pre-wrap' }}>
                    {t('description')}: {val.description}
                  </Typography>
                </Grid>
                {user.id === val.owner.id && (
                  <Grid container justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => setProject(val)}
                    >
                      {t('settings')}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Collapse>
            <Divider style={{ background: generateColor(val) }} />
          </div>
        )
      })}
      <Settings
        projects={data}
        currentProject={currentProject}
        setProject={setProject}
      />

    </List >
  )
};

export default ProjectsList;