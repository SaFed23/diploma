import React from 'react';
import { Redirect } from 'react-router';
import { useUserState } from '../store';

function BaseComponent({
  component
}) {
  const user = useUserState();

  console.log(!user.token);

  if (!user.token) {
    return <Redirect to='/login' />
  }

  return component;
};

export default BaseComponent;