/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ChromePicker } from 'react-color';


function UpdateTaskStatus({
  status,
  handleClose,
  submit,
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(status?.title);
  const [color, setColor] = useState(status?.color);

  useEffect(() => {
    if (status) {
      setTitle(status?.title);
      setColor(status?.color);
    }
  }, [status])

  const close = () => {
    setColor("#fff");
    setTitle('');
    handleClose();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newStatus = { title, color: color.hex, id: status.id };
    submit(newStatus);
    handleClose();
  };

  return (
    <Dialog open={!!status} onClose={close}>
      <DialogTitle>
        {t("update_task_status")}
      </DialogTitle>
      <DialogContent>
        <>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label={t("title")}
              variant="outlined"
              margin="normal"
              autoFocus
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            {t("color")}:
            <div style={{ margin: 15 }}>
              <ChromePicker
                color={color}
                onChange={(color) => setColor(color)}
                disableAlpha={true}
              />
            </div>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("update")}
            </Button>
          </form>
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          {t("exit")}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default UpdateTaskStatus;