import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { pageConfig } from './page.config';

function AppSettings() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5">{t("app_settings")}</Typography>
      <div style={{ height: "85%", overflow: "auto" }}>
        {pageConfig.map((Page, index) => (
          <div key={index}>
            <Page />
            <Divider />
          </div>
        ))}
      </div>
    </>
  )
};

export default AppSettings;