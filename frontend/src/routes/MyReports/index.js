/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './Calendar.css';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { fetchUserProjects, setMonthAndFetch, useProjectData, useReportData } from '../../store';
import { getDate } from '../../utils/helper';
import Report from './Report';

function MyReports() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reports = useReportData();
  const projects = useProjectData();
  const [day, setDay] = useState(null);

  console.log(reports.map(report => new Date(report.date)));

  useEffect(() => {
    handleChangeMonth(new Date());
    dispatch(fetchUserProjects());
  }, []);

  const handleChangeMonth = (date) => {
    dispatch(setMonthAndFetch(getDate(date)));
    setDay(null);
  };

  const handleChooseDay = (newDay) => {
    if (day?.toJSON() === newDay.toJSON()) {
      setDay(null);
    } else {
      setDay(newDay);
    }
  };

  return (
    <>
      <Typography variant="h5">
        {t("my_reports")}
      </Typography>
      <Grid container>
        <Grid item xs={5}>
          <Calendar
            locale={localStorage.getItem('lng')}
            minDetail="month"
            value={reports[0] ? reports?.map(report => new Date(report.date)) : new Date()}
            onActiveStartDateChange={(e) => handleChangeMonth(new Date(e.activeStartDate))}
            onClickDay={(e) => handleChooseDay(new Date(e))}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={6}>
          <Report
            date={day}
            reports={reports.filter(r => new Date(r.date).toLocaleDateString() === day?.toLocaleDateString())}
            projects={projects}
          />
        </Grid>
      </Grid>
    </>
  )
};

export default MyReports;