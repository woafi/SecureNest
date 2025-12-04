// Vercel serverless handler that uses the Express app compiled to dist/app.js
// Build command (in package.json): "vercel-build": "prisma generate && tsc"
// ensures dist/app.js exists before deployment.

/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('../dist/app.js').default;

module.exports = app;



