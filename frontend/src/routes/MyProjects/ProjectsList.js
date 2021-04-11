import React, { useState } from 'react';
import {
  List,
  ListItem,
  Collapse,
  ListItemText,
  Divider,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const classes = {
  addInfo: {
    fontSize: 14,
  }
}

function ProjectsList({
  data
}) {
  const [open, setOpen] = useState('');
  const { t } = useTranslation();

  const handleOpen = (id) => {
    if (id === open) {
      setOpen('');
    } else {
      setOpen(id);
    }
  }

  return (
    <List>
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
              <Grid container style={{ paddingLeft: 20, paddingTop: 10 }}>
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
                  <Typography style={classes.addInfo}>
                    {t('description')}: {val.description}
                  </Typography>
                </Grid>
              </Grid>
            </Collapse>
            <Divider />
          </div>
        )
      })}
    </List>
  )
};

export default ProjectsList;