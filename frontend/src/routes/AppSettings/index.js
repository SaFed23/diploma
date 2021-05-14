import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TaskStatuses from './TaskStatuses';
import Locations from './Locations';

function AppSettings() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5">{t("app_settings")}</Typography>
      <div style={{ height: "85%", overflow: "auto" }}>
        <TaskStatuses />
        <Divider />
        <Locations />
        <Divider />
      </div>
    </>
  )
};

export default AppSettings;