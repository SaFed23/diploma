import {
  AssignmentTurnedIn,
  Computer,
  Description,
  People,
  Person,
  Settings,
} from "@material-ui/icons";

export const listConfig = [
  {
    path: '/my-projects',
    icon: <Computer />,
    label: 'my_projects',
  },
  {
    path: '/my-reports',
    icon: <Description />,
    label: 'my_reports',
  }
];

export const userConfig = [
  {
    path: '/profile',
    icon: <Person />,
    label: 'profile',
  },
];

export const adminConfig = [
  {
    path: '/check-work',
    icon: <AssignmentTurnedIn />,
    label: 'check_working_time',
  },
  {
    path: '/users',
    icon: <People />,
    label: 'users',
  },
  {
    path: '/app-settings',
    icon: <Settings />,
    label: 'app_settings',
  },
]