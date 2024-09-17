const TARGET = {
  target: "http://localhost:5208",
  secure: "false",
};

const PROXY_CONFIG = {
  "/api/**": TARGET,
  "/manage/info": TARGET,
  "/login": TARGET,
  "/logout": TARGET,
  "/register": TARGET,
};

module.exports = PROXY_CONFIG;
