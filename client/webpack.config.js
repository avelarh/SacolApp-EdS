const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // urn off compression in dev mode.
  if (config.mode === 'development') {
    config.devServer.compress = false;
  }

  // prevent minimizing the bundle when you build.
  if (config.mode === 'production') {
    config.optimization.minimize = false;
  }
  
  return config;
};
