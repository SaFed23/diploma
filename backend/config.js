const PORT = 2000;

const DB_CONNECTION = 'mongodb://localhost:27017';

const DB_NAME = 'diploma';

const ROUTES = {
  comments: "/comments",
  factors: "/factors",
  features: "/features",
  invites: "/invites",
  locations: "/locations",
  projects: "/projects",
  reports: "/reports",
  roles: "/roles",
  tasks: "/tasks",
  taskStatuses: "/taskStatuses",
  users: "/users",
};

const NAMES = {
  comments: "comments",
  factors: "factors",
  features: "features",
  invites: "invites",
  locations: "locations",
  projects: "projects",
  reports: "reports",
  roles: "roles",
  tasks: "tasks",
  taskStatuses: "taskStatuses",
  users: "users",
};

module.exports = {
  PORT,
  DB_CONNECTION,
  DB_NAME,
  ROUTES,
  NAMES,
}