'use strict'

let router = require('koa-router')();
let walk = require('walk');
let path = require("path");
let koaBody = require("koa-better-body");
let auth = require("./auth.js");

let Models = {};

function Route(app) {    
    function bind(path, func) {console.log(path);
        router.post(path, func);
        router.get(path, func);
    }

    let router_root = path.join(__dirname, "..", "Router");
    var walker = walk.walk(path.join(router_root), { followLinks: false });
    walker.on('file', function (root, stat, next) {
        var ctrl = root.substr(router_root.length) + "/";
        if(stat.name != "index.js"){
            ctrl = path.join(ctrl, stat.name.substr(0, stat.name.length - 3));
        }
        let m = require(path.join(router_root, ctrl));
        if(m){
            for (let i in m) {
                if (i == "Route" || typeof (m[i]) != "function") {
                    continue;
                }
                if(i == "index"){
                    bind(ctrl, m[i]);
                }else{
                    bind(path.join(ctrl, i), m[i]);
                }
            }
        }
        next();
    });
    walker.on('directory', function (root, stat, next) { 
        walk.walk(path.join(root, stat.name), { followLinks: false });
        next();
    });
    walker.on('end', function() {
        app.use(router.routes()).use(router.allowedMethods());
    });
}

(function WalkModels() {
    let model_root = path.join(__dirname, "..", "Model");
    var walker = walk.walk(model_root, { followLinks: false });
    walker.on('file', function (root, stat, next) {
        if (stat.name != "model.js") {
            var mf = path.join(root, stat.name);
            let m = require(path.join(mf));
            if (m) {
                Models[stat.name.substr(0, stat.name.length - 3)] = m;
            }
        }
        next();
    });
    walker.on('directory', function (root, stat, next) {
        walk.walk(path.join(root, stat.name), { followLinks: false });
        next();
    });
})();

function ModelBind(ctx) {
    ctx.model = Models;
}

module.exports = function (app) {
    app.use(function* (next) {      //init app
        //**********here is the process at begain**********
        this.body = {
            status: false,
            data: {},
            marks: ""
        };
        yield next;
        //**********and here is the process at end*********
        this.body = JSON.stringify(this.body);
    });
    app.use(koaBody({ fieldsKey: false })); // body
    auth(app);  // auth
    app.use(function* (next) {  // model
        ModelBind(this);
        yield next;
    });
    Route(app);     //router
}