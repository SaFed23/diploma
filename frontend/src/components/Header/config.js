import { Computer, Description, ExitToApp, Person, Settings } from "@material-ui/icons";

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
  {
    path: '/settings',
    icon: <Settings />,
    label: 'settings',
  },
  {
    icon: <ExitToApp />,
    label: 'logout',
    func: () => console.log(111111),
  },
]