/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SelectComponent from '../../components/common/Select';

const isWeekend = (day) => {
  const dayOfWeek = new Date(day).getDay();
  return (dayOfWeek === 6) || (dayOfWeek === 0);
};

function ReportForm({
  date,
  report,
  user,
  projects,
  features,
  tasks,
  factors,
  locations,
}) {
  const { t } = useTranslation();
  const [currentReport, setReport] = useState({})

  console.log(currentReport);

  useEffect(() => {
    const obj = {
      projectId: report?.project?.id || '',
      featureId: report?.feature?.id || '',
      taskId: report?.task?.id || '',
      hours: isWeekend(date) ? 0 : 8,
      factorId: report?.factor?.id || '',
      locationId: report?.location?.id || user?.location?.id || '',
    };

    setReport(obj);

  }, [date, report, user]);

  const handleChange = (field, value) => {
    const obj = { ...currentReport };
    obj[field] = value;
    setReport(obj);
  };

  return (
    <form style={{ marginTop: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectComponent
            currentValue={report?.project?.id || ''}
            fullWidth
            title={t("project")}
            values={projects}
            onChange={({ target }) => handleChange('projectId', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={report?.feature?.id || ''}
            fullWidth
            title={t("feature")}
            values={features}
            onChange={({ target }) => handleChange('featureId', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={report?.task?.id || ''}
            fullWidth
            title={t("task")}
            values={tasks}
            onChange={({ target }) => handleChange('taskId', target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("hours")}
            fullWidth
            variant="outlined"
            value={report.hours}
            onChange={(target) => handleChange('hours', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={report?.factor?.id || ''}
            fullWidth
            title={t("factor")}
            values={factors}
            onChange={({ target }) => handleChange('factorId', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={report?.location?.id || ''}
            fullWidth
            title={t("location")}
            values={locations}
            onChange={({ target }) => handleChange('locationId', target.value)}
          />
        </Grid>
      </Grid>
    </form>
  )
};

export default ReportForm;