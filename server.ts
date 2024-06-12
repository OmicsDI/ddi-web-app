import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import {join} from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

const domino = require('domino');
const fs = require('fs');
const template = fs.readFileSync('dist/browser/index.html').toString();
const win = domino.createWindow(template);
global['window'] = win;
global['document'] = win.document;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;

/* https://github.com/angular/universal/issues/1159 - start 
This code fixes 'ReferenceError: requestAnimationFrame is not defined' */
global['requestAnimationFrame'] = function(callback, element) {
  let lastTime = 0;
  const currTime = new Date().getTime();
  const timeToCall = Math.max(0, 16 - (currTime - lastTime));
  const id = setTimeout(function() { callback(currTime + timeToCall); },
    timeToCall);
  lastTime = currTime + timeToCall;
  return id;
};

global['cancelAnimationFrame'] = function(id) {
  clearTimeout(id);
};
/* https://github.com/angular/universal/issues/1159 - end */

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('/', (req, res) => {
    res.render('index', { req });
});

app.get('*', (req, res) => {
    res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
    // tslint:disable-next-line
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
