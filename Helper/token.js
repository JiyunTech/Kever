'use strict'
let jwt = require('jsonwebtoken');

let secret = "json_web_token_20160124102500125";
let token_life = 1800;   //30f

module.exports = {
    encode(user) {
        return jwt.sign(user, secret, {expiresIn: token_life});;
    },
    decode(token) {
        try {
            let user = jwt.verify(token, secret);
            return user;
        }
        catch (e) {
            if (e.name != "TokenExpiredError" && e.name != "JsonWebTokenError") {
                throw e;
            }
            //console.log(e);
        }
    }
}