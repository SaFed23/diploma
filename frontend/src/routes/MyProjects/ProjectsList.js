import React, { useState } from 'react';
import { List, ListItem, Collapse, ListItemText, Divider, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function ProjectsList({
  data
}) {
  const [open, setOpen] = useState('');

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
                  to={`/my-project/${val.id}`}
                  style={{ color: "black" }}
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
              <List component="div" disablePadding>
                <ListItem button>
                  <ListItemText primary={val.description} />
                  <ListItemText primary={val.owner.username} />
                  <ListItemText primary={val.users.length} />
                </ListItem>
              </List>
            </Collapse>
            <Divider />
          </div>
        )
      })}
    </List>
  )
};

export default ProjectsList;