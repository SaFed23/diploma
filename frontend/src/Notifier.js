import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { snackbarAction } from './store';
import { useTranslation } from 'react-i18next';

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.snackbar.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(({ key, message, variant, options = {}, dismissed = false }) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }
      if (displayed.includes(key)) return;
      enqueueSnackbar(t(message), {
        key,
        variant,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          dispatch(snackbarAction.removeNotification(myKey));
          removeDisplayed(myKey);
        },
      });
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch, t]);

  return null;
};

export default Notifier;
