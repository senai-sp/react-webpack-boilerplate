process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const fs = require('fs-extra');
const paths = require('../config/paths');


fs.emptyDirSync(paths.appServer);
require('../server/index');


