/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { columns, localeText } from './config';
import { createUserAndFetch, deleteUserAndFetch, fetchAllUsersData, useAllUsersData } from '../../store';
import { useDispatch } from 'react-redux';
import { getRoles } from '../../service/roles';
import useConfirm from '../../hooks/useConfirm'
import CreateUserDialog from './Dialogs/CreateUser';

function Users() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allUsers = useAllUsersData();
  const { setOpen, setAction } = useConfirm();
  const [roles, setRoles] = useState([]);
  const [create, setCreate] = useState(false);

  useEffect(async () => {
    dispatch(fetchAllUsersData());
    const { data } = await getRoles();
    setRoles(data);
  }, []);

  const handleDeleteUser = (userId) => {
    setOpen(true);
    setAction(() => () => dispatch(deleteUserAndFetch(userId)));
  };

  const openCreatingDialog = () => {
    setCreate(true);
  };

  const handleCreateUser = (value) => {
    dispatch(createUserAndFetch(value));
  };

  return (
    <div style={{ height: '90%' }}>
      <DataGrid
        disableColumnMenu
        hideFooter
        columns={columns(t, handleDeleteUser, openCreatingDialog)}
        rows={allUsers}
        localeText={localeText(t)}
        density="compact"
      />
      <CreateUserDialog
        open={create}
        handleClose={() => setCreate(false)}
        submit={handleCreateUser}
        roles={roles}
      />
    </div>
  );
};

export default Users;