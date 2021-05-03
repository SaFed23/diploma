/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { AUTH } from '../service/config'
import { inviteAction, useInviteData } from '../store'

const SERVER_URL = 'http://localhost:8080'

export const useInvite = (taskId) => {

  const invites = useInviteData();
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (taskId) {
      socketRef.current = io(SERVER_URL, {
        query: { taskId },
        extraHeaders: { ...AUTH.headers }
      })

      socketRef.current.emit('comment:get');

      socketRef.current.on('comments', (invites) => {
        dispatch(inviteAction.setCommentData(invites));
      });

    }

    return () => {
      dispatch(inviteAction.clearInviteState());
      socketRef.current?.disconnect()
    }
  }, [taskId]);

  const addComment = (comment) => {
    socketRef.current.emit('comment:add', comment);
  };

  return { comments: invites, addComment };
}
