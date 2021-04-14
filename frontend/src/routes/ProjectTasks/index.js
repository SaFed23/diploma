import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import { featuresByProjectId, useFeatureData, useProjectData } from '../../store';
import { tasksByFeatureId, useTaskData } from '../../store';
import FeatureSelect from './FeatureSelect';
import TaskCard from './TaskCards';

function ProjectTasks() {
  const projectId = window.location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const features = useFeatureData();
  const tasks = useTaskData();
  const projects = useProjectData();
  const [currentFeature, setCurrentFeature] = useState({});

  useEffect(() => {
    dispatch(featuresByProjectId(projectId, enqueueSnackbar));
  }, [dispatch, enqueueSnackbar, projectId]);

  useEffect(() => {
    setCurrentFeature(features?.[0]);
  }, [features]);

  useEffect(() => {
    if (currentFeature?.id) {
      dispatch(tasksByFeatureId(currentFeature.id, enqueueSnackbar));
    }
  }, [currentFeature, dispatch, enqueueSnackbar]);

  return (
    <>
      <FeatureSelect
        values={features}
        currentValue={currentFeature}
        setCurrentValue={setCurrentFeature}
        currentProject={projects.find(p => p.id === projectId)}
      />
      <TaskCard
        tasks={tasks}
      />
    </>
  )
};

export default ProjectTasks;