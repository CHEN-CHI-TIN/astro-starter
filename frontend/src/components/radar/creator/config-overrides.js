/* config-overrides.js */

const version = require("./package.json").version;
const buildFileName = `eas-radar-creator-v${version}`;

module.exports = function override(config) {
  // Change the JS output file name and path, from 'static/js/[name].[contenthash:8].js' to `static/${buildFileName}.js`
  config.output = {
    ...config.output,
    filename: `static-eas-radar-creator/${buildFileName}.js`,
  };

  config.module.rules.push({
    test: /\.js$/,
    loader: "esbuild-loader",
    options: {
      loader: "jsx", // 將 .js 文件設置為 jsx loader
    },
  });

  // Change the CSS output file name and path, from 'static/css/[name].[contenthash:8].css' to `static/${buildFileName}.css`
  config.plugins.map((plugin, i) => {
    if (plugin.filename && plugin.filename.includes("static/css")) {
      config.plugins[i].filename = `static/${buildFileName}.css`;
    }
  });

  console.log("Additional config was applied through config-overrides.js");

  return config;
};
