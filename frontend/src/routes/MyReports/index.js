import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateFilter from './DateFilter';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function MyReports() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5">
        {t("my_reports")}
      </Typography>
      <DateFilter />
      <Calendar />
    </>
  )
};

export default MyReports;