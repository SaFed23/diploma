/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setProjectIdAndFetch,
  useFeatureData,
  taskAction,
  featureAction,
  projectAction,
  useProjectState,
  createTaskAndFetch,
  setFeatureIdAndFetch,
  useAllTasks,
  useUserData,
} from '../../store';
import FeatureSelect from './FeatureSelect';
import TaskCard from './TaskCards';
import AddTaskDialog from './Dialogs/AddTask';

function ProjectTasks() {
  const projectId = window.location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const features = useFeatureData();
  const tasks = useAllTasks();
  const user = useUserData();
  const projectState = useProjectState();
  const [currentFeature, setCurrentFeature] = useState({});
  const [openAddTask, setOpenAddTask] = useState(null);

  useEffect(() => {
    dispatch(setProjectIdAndFetch(projectId));
    dispatch(projectAction.setCurrentProject(projectState.data.find(p => p.id === projectId)))

    return () => {
      dispatch(featureAction.clearFeatureData());
    }
  }, []);

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
  }, [currentFeature]);

  const handleCreateTask = (value) => {
    value.featureId = currentFeature.id;
    value.taskStatusId = openAddTask.id;
    if (value.assign) {
      value.userIds = [user.id];
    }
    delete value.assign;
    console.log(value);
    dispatch(createTaskAndFetch(value));
    setOpenAddTask(null);
  };

  return (
    <>
      <FeatureSelect
        values={features}
        currentValue={currentFeature}
        setCurrentValue={setCurrentFeature}
        currentProject={projectState.current}
      />
      <TaskCard
        tasks={tasks}
        onAdd={setOpenAddTask}
      />
      <AddTaskDialog
        open={openAddTask}
        handleClose={() => setOpenAddTask(null)}
        submit={handleCreateTask}
      />
    </>
  )
};

export default ProjectTasks;