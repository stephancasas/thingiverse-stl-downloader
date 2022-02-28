const { execSync } = require('child_process');
const { resolve: path } = require('path');

execSync(`rm -rf ${path(__dirname, '..', 'build')}`);
execSync(
  `cp -r ${path(__dirname, '..', 'src')} ${path(__dirname, '..', 'build')}`,
);
execSync(`rm ${path(__dirname, '..', 'build', 'style.css')}`);