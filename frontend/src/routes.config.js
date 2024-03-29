import AppSettings from "./routes/AppSettings";
import CheckWork from "./routes/CheckWork";
import CurrentTask from "./routes/CurrentTask";
import MyProjects from "./routes/MyProjects";
import MyReports from "./routes/MyReports";
import Profile from "./routes/Profile";
import ProjectTasks from "./routes/ProjectTasks";
import Users from "./routes/Users";
import { ROLES } from "./utils/constants";

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
  {
    path: '/my-reports',
    component: <MyReports />,
    exact: false
  },
  {
    path: '/task/:taskId',
    component: <CurrentTask />,
    exact: false
  },
  {
    path: '/app-settings',
    component: <AppSettings />,
    exact: false,
    role: ROLES.ADMIN,
  },
  {
    path: '/users',
    component: <Users />,
    exact: false,
    role: ROLES.ADMIN,
  },
  {
    path: '/check-work',
    component: <CheckWork />,
    exact: false,
    role: ROLES.ADMIN,
  },
  {
    path: '/profile',
    component: <Profile />,
    exact: false,
  },
]