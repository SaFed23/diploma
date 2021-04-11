import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { featuresByProjectId, useFeatureData } from '../../store/feature';
import { tasksByFeatureId, useTaskData } from '../../store/task';
import FeatureSelect from './FeatureSelect';
import TaskCard from './TaskCards';
import { fetchTaskStatuses, useTaskStatusData } from '../../store/taskStatus';

function ProjectTasks() {
  const projectId = window.location.pathname.split('/')[2];
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const features = useFeatureData();
  const tasks = useTaskData();
  const taskStatuses = useTaskStatusData();
  const [currentFeature, setCurrentFeature] = useState({});

  useEffect(() => {
    dispatch(featuresByProjectId(projectId, enqueueSnackbar));
    dispatch(fetchTaskStatuses(enqueueSnackbar))
  }, [dispatch, enqueueSnackbar, projectId]);

  useEffect(() => {
    setCurrentFeature(features?.[0]);
  }, [features]);

  useEffect(() => {
    if (currentFeature?.id) {
      dispatch(tasksByFeatureId(currentFeature.id, enqueueSnackbar));
    }
  }, [currentFeature, dispatch, enqueueSnackbar]);

  console.log(currentFeature);

  return (
    <>
      <FeatureSelect
        values={features}
        currentValue={currentFeature}
        setCurrentValue={setCurrentFeature}
      />
      <TaskCard
        tasks={tasks}
        taskStatuses={taskStatuses}
      />
    </>
  )
};

export default ProjectTasks;