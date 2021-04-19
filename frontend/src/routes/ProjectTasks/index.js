import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setProjectIdAndFetch,
  useFeatureData,
  useProjectData,
  taskAction,
  featureAction
} from '../../store';
import { setFeatureIdAndFetch, useAllTasks } from '../../store';
import FeatureSelect from './FeatureSelect';
import TaskCard from './TaskCards';

function ProjectTasks() {
  const projectId = window.location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const features = useFeatureData();
  const tasks = useAllTasks();
  const projects = useProjectData();
  const [currentFeature, setCurrentFeature] = useState({});

  useEffect(() => {
    dispatch(setProjectIdAndFetch(projectId));

    return () => {
      dispatch(featureAction.clearFeatureData());
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    setCurrentFeature(features?.[0]);
  }, [features]);

  useEffect(() => {
    if (currentFeature?.id) {
      dispatch(setFeatureIdAndFetch(currentFeature.id));
    }

    return () => {
      dispatch(taskAction.clearAllTasks());
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