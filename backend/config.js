const PORT = 3000;

const DB_CONNECTION = 'mongodb://localhost:27017';

const DB_NAME = 'diploma';

const SALT = '123salt321';

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
  auth: "auth",
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
  SALT,
}