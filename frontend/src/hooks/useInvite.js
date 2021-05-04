/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { AUTH } from '../service/config'
import { inviteAction, useInviteData } from '../store'

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

      socketRef.current.on('invites', (invites) => {
        dispatch(inviteAction.setInviteData(invites));
      });

    }

    return () => {
      dispatch(inviteAction.clearInviteState());
      socketRef.current?.disconnect()
    }
  }, [userId]);

  // const addComment = (comment) => {
  //   socketRef.current.emit('comment:add', comment);
  // };

  return { invites };
}
