import MyProjects from "./routes/MyProjects";
import ProjectTasks from "./routes/ProjectTasks";

export const routes = [
  {
    path: '/my-projects',
    component: <MyProjects />,
    exact: true
  },
  {
    path: '/my-projects/:projectId',
    component: <ProjectTasks />,
    exact: false
  },
]