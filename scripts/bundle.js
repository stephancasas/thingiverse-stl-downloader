const { execSync } = require('child_process');
const { resolve: path } = require('path');

const buildDir = path(__dirname, '..', 'build');

execSync(`cd ${buildDir}; zip -r bundle.zip .`);

const distDir = path(__dirname, '..', 'dist');
execSync(`mkdir ${distDir}`);

execSync(
  `mv ${path(
    buildDir,
    'bundle.zip',
  )} ${distDir}/thingiverse-stl-downloader.zip`,
);
