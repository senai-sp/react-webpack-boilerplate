const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const paths = require('../config/paths');
const serverConfig = require('../config/webpack.config.server.js');
const prodConfig = require('../config/webpack.config.prod.js');

const app = express();

const DEV = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 8088;

let isBuilt = false;

const liftServer = () => 
  !isBuilt &&
  app.listen(PORT, () => {
    isBuilt = true;
    console.log(`Server listening on port ${chalk.cyan(PORT)}`);
  })


if (DEV) {

} else {
  webpack([prodConfig, serverConfig]).run((err, stats) => {
    if(err) throw err;

    const clientStatus = stats.toJson().children[0];
    const serverRender = require('../buildServer/main.js').default;
    app.use('/static', express.static(paths.appBuild+'/static'));
    app.use(serverRender({ clientStatus }));

    liftServer();
  });
}