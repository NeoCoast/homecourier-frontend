const webpackMerge = require('webpack-merge');

const applyPresets = (env = { presets: [] }) => {
  const presets = env.presets || [];

  const mergedPresets = [].concat(...[presets]);
  // eslint-disable-next-line global-require
  const mergedConfigs = mergedPresets.map((presetName) => require(`./presets/webpack.${presetName}`)(env));

  return webpackMerge({}, ...mergedConfigs);
};

module.exports = applyPresets;
