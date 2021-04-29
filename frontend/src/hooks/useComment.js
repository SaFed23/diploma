/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { AUTH } from '../service/config'
import { commentAction, useCommentData } from '../store'

const SERVER_URL = 'http://localhost:8080'

export const useComment = (taskId) => {

  const comments = useCommentData();
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (taskId) {
      dispatch(commentAction.setTaskId(taskId));

      socketRef.current = io(SERVER_URL, {
        query: { taskId },
        extraHeaders: { ...AUTH.headers }
      })

      socketRef.current.emit('comment:get');

      socketRef.current.on('comments', (comments) => {
        dispatch(commentAction.setCommentData(comments));
      });

    }

    return () => {
      dispatch(commentAction.clearCommentState());
      socketRef.current?.disconnect()
    }
  }, [taskId]);

  const addComment = (comment) => {
    socketRef.current.emit('comment:add', comment);
  };

  return { comments, addComment };
}
