import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../src/App';

const server = createServer((req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      location: context.url,
    });

    res.end();
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `);

    res.end();
  }
}).listen(4000);


export default server;