/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SelectComponent from '../../components/common/Select';
import { featureAction, setFeatureIdAndFetch, setProjectIdAndFetch, taskAction, useAllTasks, useFeatureData } from '../../store';
import { useDispatch } from 'react-redux';

const isWeekend = (day) => {
  const dayOfWeek = new Date(day).getDay();
  return (dayOfWeek === 6) || (dayOfWeek === 0);
};

function ReportForm({
  date,
  report,
  user,
  projects,
  factors,
  locations,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentReport, setReport] = useState({});
  const features = useFeatureData();
  const tasks = useAllTasks();

  useEffect(() => () => {
    dispatch(taskAction.clearTaskData());
    dispatch(featureAction.clearFeatureData());
  }, []);

  useEffect(() => {
    const { projectId } = currentReport;
    if (projectId) {
      dispatch(setProjectIdAndFetch(projectId));
    }
  }, [currentReport.projectId]);

  useEffect(() => {
    const { featureId } = currentReport;
    if (featureId) {
      dispatch(setFeatureIdAndFetch(featureId));
    }
  }, [currentReport.featureId]);

  useEffect(() => {
    const obj = {
      id: report?.id || '',
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
            currentValue={currentReport.projectId || ''}
            fullWidth
            title={t("project")}
            values={projects}
            onChange={({ target }) => handleChange('projectId', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={currentReport.featureId || ''}
            fullWidth
            title={t("feature")}
            values={features}
            onChange={({ target }) => handleChange('featureId', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={currentReport.taskId || ''}
            fullWidth
            title={t("task")}
            values={tasks.reduce((acc, val) => {
              acc.push(...val.tasks);
              return acc;
            }, [])}
            onChange={({ target }) => handleChange('taskId', target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("hours")}
            fullWidth
            variant="outlined"
            value={currentReport.hours || 0}
            onChange={(target) => handleChange('hours', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={currentReport.factorId || ''}
            fullWidth
            title={t("factor")}
            values={factors}
            onChange={({ target }) => handleChange('factorId', target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={currentReport.locationId || ''}
            fullWidth
            title={t("location")}
            values={locations}
            onChange={({ target }) => handleChange('locationId', target.value)}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={3}>
          <Button
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
            style={{ marginTop: 20 }}
          >
            {report?.id ? t("update") : t("save")}
          </Button>
        </Grid>
        <Grid item xs={3}>
          {report?.id && (
            <Button
              fullWidth
              color="secondary"
              type="submit"
              variant="contained"
              style={{ marginTop: 20 }}
            >
              {t("delete")}
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 20 }} />
    </form>
  )
};

export default ReportForm;