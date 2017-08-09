import React from 'react';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from '../src/App';


export default ({ clientStatus }) => (req, res) => {
  const chunkNames = flushChunkNames();
  const app = renderToString(<App />);

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStatus, { chunkNames });

  console.log('PATH', req.path);
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
  console.log('SCRIPTS SERVED', scripts);
  console.log('STYLESHEETS SERVED', stylesheets);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>react-universal-component-boilerplate</title>
        ${styles}
      </head>
      <body>
        <div id="root">${app}</div>
        ${cssHash}
        ${js}
      </body>
    </html>
  `);
};
