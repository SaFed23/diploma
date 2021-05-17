/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useConfirm from '../../hooks/useConfirm';
import { fetchLocations, useLocationData, useUserData, updateUserData, changeUserPassword } from '../../store';
import DataForm from './DataForm';

function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useUserData();
  const locations = useLocationData();
  const { setOpen, setAction } = useConfirm();

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  const handleUpdate = (user) => {
    const update = { ...user };
    update.locationId = user.locationId || null;
    setOpen(true);
    setAction(() => () => dispatch(updateUserData(update)));
  };

  const handleChangePassword = ({ password, oldPassword }, cb) => {
    const obj = {
      id: user.id,
      password,
      oldPassword,
    };
    dispatch(changeUserPassword(obj, cb));
  };

  return (
    <>
      <Typography variant="h5">
        {t("profile")}
      </Typography>
      <DataForm
        user={user}
        locations={locations}
        submit={handleUpdate}
        handleChangePassword={handleChangePassword}
      />
    </>
  )

};

export default Profile;