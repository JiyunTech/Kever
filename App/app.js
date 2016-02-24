'use strict'
var koa = require('koa');
var app = koa();

// app configs
//app.env = "NODE_ENV";

// static file setup
var staticServer = require('koa-static');
app.use(staticServer(__dirname + '/../Public'));
// compress
var compress = require('koa-compress');
app.use(compress());

// setup engine
let engine = require("../lib/run.js");
engine(app);

app.listen(3000);