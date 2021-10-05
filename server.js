/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const http = require('http');
const https = require('https');
const fs = require('fs');

const nextApp = next({ dev: false });
const handle = nextApp.getRequestHandler();

const HTTPS_PORT = 443;
const HTTP_PORT = 80;

const httpsOption = {
  cert: fs.readFileSync('/etc/ssl/mydomain.cert.key'),
  key: fs.readFileSync('/etc/ssl/mydomain.key'),
};

nextApp.prepare().then(() => {
  https
    .createServer(httpsOption, (req, res) => handle(req, res))
    .listen(HTTPS_PORT, () => {
      console.log('-=-=-=-=-= serving nextjs app -=-=-=-=-=-=-');
    });
});

const redirectServer = express();

redirectServer.get('/*', (req, res) => {
  res.redirect('https://' + req.headers.host + req.path);
});

http.createServer(redirectServer).listen(HTTP_PORT, () => {
  console.log('-=-=-=-=-= redirect server is runnning -=-=-=-=-=');
});
