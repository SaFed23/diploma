/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import SelectComponent from '../../components/common/Select';
import { featureAction, taskAction, } from '../../store';
import { getDate } from '../../utils/helper';
import { getFeaturesByProjectId } from '../../service/feature';
import { getTasksByFeatureId } from '../../service/task';

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
  createRep,
  updateRep,
  deleteRep,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentReport, setReport] = useState({ hours: 0 });
  const [error, setError] = useState({});
  const [features, setFeatures] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => () => {
    dispatch(taskAction.clearTaskData());
    dispatch(featureAction.clearFeatureData());
  }, []);

  useEffect(async () => {
    const { projectId } = currentReport;
    if (projectId) {
      const { data } = await getFeaturesByProjectId(projectId);

      setFeatures(data);
      setTasks([]);
    }
  }, [currentReport.projectId]);

  useEffect(async () => {
    const { featureId } = currentReport;
    if (featureId) {
      const { data } = await getTasksByFeatureId(featureId);

      setTasks(data);
    }
  }, [currentReport.featureId]);

  useEffect(() => {
    const obj = {
      id: report?.id || '',
      projectId: report?.project?.id || '',
      featureId: report?.feature?.id || '',
      taskId: report?.task?.id || '',
      hours: report.id ? report.hours : isWeekend(date) ? 0 : 8,
      factorId: report?.factor?.id || '',
      locationId: report?.location?.id || user?.location?.id || '',
      userId: user.id,
      date: report?.date ? getDate(new Date(report.date)) : getDate(new Date(date)),
      comment: report?.comment || '',
    };

    setReport(obj);

  }, [date, report, user]);

  const handleChange = (field, value) => {
    const obj = { ...currentReport };
    obj[field] = value;
    setReport(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { ...currentReport };
    if (!obj.id) {
      delete obj.id;
    }

    const errObj = Object.entries(obj).reduce((acc, [key, value]) => {
      if (key === 'hours' && value < 0) {
        acc.hours = 'time_not_valid';
      } else if (key !== 'hours' && key !== 'comment' && !value) {
        acc[key] = 'required_field';
      }
      return acc;
    }, {});

    console.log(errObj);

    if (Object.keys(errObj).length) {
      setError(errObj);
    } else if (obj.id) {
      updateRep(obj);
    } else {
      createRep(obj);
    }
  };

  return (
    <form style={{ marginTop: 20 }} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectComponent
            currentValue={currentReport.projectId || ''}
            fullWidth
            title={t("project")}
            values={projects}
            onChange={({ target }) => handleChange('projectId', target.value)}
            error={error.projectId}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={currentReport.featureId || ''}
            fullWidth
            title={t("feature")}
            values={features}
            onChange={({ target }) => handleChange('featureId', target.value)}
            error={error.featureId}
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
            error={error.taskId}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("hours")}
            type="number"
            fullWidth
            variant="outlined"
            value={currentReport.hours}
            onChange={({ target }) => handleChange('hours', +target.value)}
            error={!!error.hours}
            helperText={t(error.hours)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={currentReport.factorId || ''}
            fullWidth
            title={t("factor")}
            values={factors}
            onChange={({ target }) => handleChange('factorId', target.value)}
            error={error.factorId}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectComponent
            currentValue={currentReport.locationId || ''}
            fullWidth
            title={t("location")}
            values={locations}
            onChange={({ target }) => handleChange('locationId', target.value)}
            error={error.locationId}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <TextField
          label={t("comment")}
          fullWidth
          multiline
          rowsMax={4}
          margin="normal"
          variant="outlined"
          value={currentReport.comment}
          onChange={({ target }) => handleChange('comment', target.value)}
        /> */}
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
              variant="contained"
              style={{ marginTop: 20 }}
              onClick={() => deleteRep(report.id)}
            >
              {t("delete")}
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 20 }} />
    </form >
  )
};

export default ReportForm;