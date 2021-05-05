/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { AUTH } from '../service/config'
import { fetchUserProjects, inviteAction, useInviteData } from '../store'

const SERVER_URL = 'http://localhost:8080'

export const useInvite = (userId) => {

  const invites = useInviteData();
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (userId) {
      socketRef.current = io(SERVER_URL, {
        extraHeaders: { ...AUTH.headers }
      })

      socketRef.current.emit('invite:get', userId);

      socketRef.current.on('invites', ({ data, userId: uId }) => {
        if (uId === userId) {
          dispatch(inviteAction.setInviteData(data));
        }
      });

      socketRef.current.on('projects', ({ userId: uId }) => {
        if (uId === userId) {
          dispatch(fetchUserProjects(userId));
        }
      });

    }

    return () => {
      dispatch(inviteAction.clearInviteState());
      socketRef.current?.disconnect()
    }
  }, [userId]);

  const rejectInvite = (invite) => {
    socketRef.current.emit('invite:reject', invite);
  };

  const acceptInvite = (invite) => {
    socketRef.current.emit('invite:accept', invite)
  };

  return { invites, rejectInvite, acceptInvite };
}
