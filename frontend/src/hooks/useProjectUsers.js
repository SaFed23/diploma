/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { AUTH } from '../service/config'
import { snackbarAction } from '../store'

const SERVER_URL = 'http://localhost:8080'

export const useProjectUsers = (projectId, setProject) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      extraHeaders: { ...AUTH.headers },
    });

    socketRef.current.on('invite:created', ({ data }) => {
      if (data.id === projectId) {
        if (data.res) {
          dispatch(snackbarAction.addNotification({
            message: t("invite_is_sending"),
            variant: "success"
          }));
        } else {
          dispatch(snackbarAction.addNotification({
            message: t("error"),
            variant: "error"
          }));
        }
      }
    });

    return () => {
      socketRef.current?.disconnect()
    }
  }, [projectId]);

  const createInvite = (invite) => {
    socketRef.current.emit('invite:create', invite);
  };

  return { createInvite };
}
