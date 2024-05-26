// path/fs
console.log('CLEAR CACHE');

const fs = require('fs');
const { join: joinPath } = require('path');

const cacheDir = joinPath(__dirname, '..', 'node_modules/.cache');
fs.rmSync(cacheDir, { recursive: true, force: true });

// rimraf ./node_modules/.cache

// "postinstall": "node ./scripts/clear-cache.js"
