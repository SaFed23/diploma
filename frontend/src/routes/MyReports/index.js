import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateFilter from './DateFilter';
import './Calendar.css';
import Calendar from 'react-calendar';

function MyReports() {
  const { t } = useTranslation();


  return (
    <>
      <Typography variant="h5">
        {t("my_reports")}
      </Typography>
      <Calendar
        locale={localStorage.getItem('lng')}
        minDetail="month"
        value={[new Date("2021-05-01"), new Date("2021-05-02")]}
        onActiveStartDateChange={(e) => console.log(e)}
      />
    </>
  )
};

export default MyReports;