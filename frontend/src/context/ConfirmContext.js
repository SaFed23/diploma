import React, { useState, createContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const ConfirmContext = createContext()

function ConfirmProvider(props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(undefined);
  const [body, setBody] = useState('');

  const submit = () => {
    action();
    setOpen(false);
    setAction(undefined);
  }

  return (
    <ConfirmContext.Provider value={{ setOpen, setAction, setBody }} {...props}>
      {props.children}
      <Dialog open={open}>
        <DialogTitle>
          {t("are_you_sure")}
        </DialogTitle>
        {body}
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t("no")}
          </Button>
          <Button onClick={submit} color="primary" autoFocus>
            {t("yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  )
};

export default ConfirmProvider;