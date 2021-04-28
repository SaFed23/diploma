/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { AUTH } from '../service/config'
import { setTaskIdAndFetch, useCommentData } from '../store'
// hooks
// import { useBeforeUnload } from 'hooks'

const SERVER_URL = 'http://localhost:8080'

export const useComment = (taskId) => {

  const comments = useCommentData();
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (taskId) {
      dispatch(setTaskIdAndFetch(taskId));
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      socketRef.current = io(SERVER_URL, {
        query: { taskId },
        extraHeaders: { ...AUTH.headers }
      })

      // socketRef.current.emit('user:add', { username, userId })

      // socketRef.current.on('users', (users) => {
      //   setUsers(users)
      // })

      socketRef.current.emit('comment:get')

      // socketRef.current.on('messages', (messages) => {
      //   const newMessages = messages.map((msg) =>
      //     msg.userId === userId ? { ...msg, currentUser: true } : msg
      //   )
      //   setMessages(newMessages)
      // })

    }

    return () => {
      socketRef.current?.disconnect()
    }
  }, [taskId])

  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit('message:add', {
      // userId,
      messageText,
      senderName
    })
  }

  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  // useBeforeUnload(() => {
  //   socketRef.current.emit('user:leave', userId)
  // })

  return { comments, sendMessage, removeMessage }
}
