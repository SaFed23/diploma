import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TaskStatuses from './TaskStatuses';

function AppSettings() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5">{t("app_settings")}</Typography>
      <div style={{ height: "85%", overflow: "auto" }}>
        <TaskStatuses />
      </div>
    </>
  )
};

export default AppSettings;