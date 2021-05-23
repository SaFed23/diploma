import React, { useState } from 'react';
import { Button, Drawer } from '@material-ui/core';
import Filter from './Filter';

function CheckWork() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>11111</Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Filter />
      </Drawer>
    </>
  );
};

export default CheckWork;