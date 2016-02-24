'use strict';

var request = require("supertest");
request = request("http://127.0.0.1:3000");
var should = require("should");
var crypto = require('crypto');
var Microdb = require('nodejs-microdb');
var myDB = new Microdb({ file: "./test/tmpDB.db" });
let token_key = "token";

function MD5(str) {
    var md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
}

describe("TEST BEGIN", function () {
    this.timeout(500);
    this.slow(100);
    it.skip("login", (done) => {
        request
            .post("/user/login")
            .type("json")
            .send({ name: "mboss", password: MD5("04140906") })
            .expect(200)
            .end((err, res) => {
                if (err) { done(err); return; }
                try {
                    let jsonBody = JSON.parse(res.text);
                    jsonBody.should.have.property('status', true);
                    myDB.add(jsonBody.data, token_key);
                    myDB.flush(); myDB.load();
                }
                catch (e) {
                    if (e.name == "AssertionError") throw e;
                }
                done();
            });
    });
    it("index", (done) => {
        myDB.load();
        request.get("/")
        //.set("Authorization", myDB.data[token_key])
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err); return;
                }
                try {
                    let jsonBody = JSON.parse(res.text);
                    jsonBody.should.have.property('status', true);
                }
                catch (e) {
                    if (e.name == "AssertionError") throw e;
                }
                done();
            });
    });
    describe("user testing...", function () {
        it("user index", (done) => {
            myDB.load();
            request.get("/user/")
                .set("Authorization", myDB.data[token_key])
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        if (res.status == 401) {
                            //login("user index");
                        }
                        console.log();
                        done(err); return;
                    }
                    try {
                        let jsonBody = JSON.parse(res.text);
                        jsonBody.should.have.property('status', true);
                    }
                    catch (e) {
                        if (e.name == "AssertionError") throw e;
                    }
                    done();
                });
        });
    });
});