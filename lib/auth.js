'use strict'
let minimatch = require('minimatch');
let tokenHelper = require("../Helper/token.js");

let options = {
        ignorePaths: ["/", "/user/login", "/user/register", "/admin/user/login"],
        verbose: true
};
let headerKey = "Authorization", queryKey = "token", bodyKey = "token";
function fetchToken() {
    return this.get(headerKey) || (this.query && this.query[queryKey]) || (this.request.body && this.request.body[bodyKey]) || "";
}

function validate(token) {
    //This should go to a DB etc to get your user based on token
    return tokenHelper.decode(token);
}

module.exports = function(app) {
    app.use(function* (next) {      //401 process
        try {
            yield next;
        } catch (err) {
            if (401 == err.status) {
                this.status = 401;
                this.body.status = false;
                this.body.data = {};
                this.body.marks = 'Plase login and do continue!\n';
            } else {
                throw err;
            }
        }
    });
    app.use(function* (next) {      //auth process
        if (options && options.ignorePaths) {
            var ignorePathMatched = false;
            var path = this.path;
            options.ignorePaths.some(function (element) {
                var match = minimatch(path, element);
                if (match) {
                    options.verbose && console.log("path=" + path);
                    options.verbose && console.log("matched");
                    ignorePathMatched = true;
                    return true;
                }
                return false;
            });
            //Can't yield from normal function
            if (ignorePathMatched) {
                yield next;
                return;
            }
        }

        var token = fetchToken.call(this);
        if (token === undefined) {
            this.throw(401, "no token");
        }

        if (token === '') {
            this.throw(401, "empty token");
        }

        var user = validate(token);
        if (!user) {
            this.throw(401, "invalid token");
        }
        this.user = user;
        yield next;
    });
};
