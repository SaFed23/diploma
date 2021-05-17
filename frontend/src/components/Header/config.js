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
    path: '/check-reports',
    icon: <AssignmentTurnedIn />,
    label: 'check_reports',
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