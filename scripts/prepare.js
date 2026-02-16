/* eslint-disable no-console */
const { spawnSync } = require('child_process');

const shouldSkipHusky =
  process.env.CI === 'true' ||
  Boolean(process.env.RENDER) ||
  process.env.HUSKY === '0' ||
  process.env.HUSKY_SKIP_INSTALL === '1';

if (shouldSkipHusky) {
  console.log('Skipping husky install in CI/Render environment.');
  process.exit(0);
}

const result = spawnSync('npx', ['--no-install', 'husky'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(result.status || 0);
