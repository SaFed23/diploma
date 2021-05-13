import {
  DialogContent,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function DeleteTaskStatus({
  open,
  setOpen,
  taskStatuses,
  handleDelete,
}) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const deleteStatus = () => {
    handleDelete(value);
  };

  const close = () => {
    setValue('');
    setOpen('');
  };

  return (
    <Dialog open={!!open} onClose={close}>
      <DialogTitle>
        {t("delete_task_status")}
      </DialogTitle>
      <DialogContent>
        {t("relocate_tasks")}
        <Select
          fullWidth
          value={value}
          onChange={({ target }) => setValue(target.value)}
        >
          <MenuItem value="">{t("no")}</MenuItem>
          {taskStatuses.map(status => (
            <MenuItem key={status.id} value={status.id}>{status.title}</MenuItem>
          ))}
        </Select>
        <Button
          fullWidth
          style={{ marginTop: 15 }}
          variant="contained"
          color="secondary"
          onClick={deleteStatus}
        >
          {t("delete")}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          {t("exit")}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default DeleteTaskStatus;