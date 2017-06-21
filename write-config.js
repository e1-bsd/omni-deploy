const path = require('path');
const fs = require('fs');

module.exports = (configKey) => {
  const configsDir = path.resolve('dist-configs');
  const distDir = path.resolve('dist');

  const confData = fs.readFileSync(
      path.join(configsDir, `${configKey}.js`), 'utf8');

  const indexFile = path.join(distDir, 'index.html');
  const indexData = fs.readFileSync(indexFile, 'utf8');

  const patchedIndexData = indexData.replace(
      /<script.+data-config-sentinel.*>.*<\/script>/,
      `<script data-config-sentinel>${confData}</script>`);

  fs.writeFile(indexFile, patchedIndexData, 'utf8');
};
