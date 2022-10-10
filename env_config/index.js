const env_state = {
  DEVELOPEMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
};

module.exports = {
  envConfig: env_state.PRODUCTION,
  env_state,
};
