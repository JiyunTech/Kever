'use strict'
let tokenHelper = require('../Helper/token.js');

module.exports = {
	index: function* (next) {
		this.body.marks += "this is user index page\n";
        this.body.status = true;
		yield next;
	},
    login: function* (next) {
        let paras = this.request.body;
        if (paras.name && paras.password) {
            this.body.marks += "user " + paras.name + " is comming!\n";

	        let stuff = yield this.model.stuff.login(paras.name, paras.password);
	        if(stuff){
	     	   this.body.marks += `user ${stuff.name} had login!\n`;
               this.body.data = tokenHelper.encode({id: stuff.id, name: stuff.name, description: stuff.description});
	     	   this.body.status = true;
	    	}
        }
        yield next;
    },
    register: function* (next) {
        let paras = this.request.body;
        if (paras.a) {
            this.body.data += "admin register " + "\n";
            this.body.status = true;
        }
        yield next;
    }
}