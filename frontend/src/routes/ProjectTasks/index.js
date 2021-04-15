import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchFeaturesByProjectId, useFeatureData, useProjectData } from '../../store';
import { fetchTasksByFeatureId, useTaskData } from '../../store';
import FeatureSelect from './FeatureSelect';
import TaskCard from './TaskCards';

function ProjectTasks() {
  const projectId = window.location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const features = useFeatureData();
  const tasks = useTaskData();
  const projects = useProjectData();
  const [currentFeature, setCurrentFeature] = useState({});

  useEffect(() => {
    dispatch(fetchFeaturesByProjectId(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    setCurrentFeature(features?.[0]);
  }, [features]);

  useEffect(() => {
    if (currentFeature?.id) {
      dispatch(fetchTasksByFeatureId(currentFeature.id));
    }
  }, [currentFeature, dispatch]);

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