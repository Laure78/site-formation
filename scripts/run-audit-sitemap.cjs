#!/usr/bin/env node
const path = require('node:path');
const { createJiti } = require('jiti');

const root = path.join(__dirname, '..');
const jiti = createJiti(__filename, {
  interopDefault: true,
  alias: {
    '@': root,
  },
});
jiti(path.join(__dirname, 'audit-sitemap-routes.ts'));
