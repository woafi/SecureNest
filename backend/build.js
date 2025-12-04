// build.js
const fs = require('fs-extra');

fs.copySync('dist/index.js', 'api/index.js');
console.log('Copied dist/index.js → api/index.js');