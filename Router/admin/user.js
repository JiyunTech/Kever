'use strict'

module.exports = {
    login: function* (next) {
        let paras = this.request.body;
        if (paras.name && paras.password) {
            this.body.marks += "admin " + paras.name + " is comming!\n";

            let admin = yield this.model.stuff.adminlogin(paras.name, paras.password);
            if(admin){
               this.body.marks += `admin ${admin.name == paras.name ? admin.name : paras.name} had login!\n`;
               this.body.data = admin;
               this.body.status = true;
            }
        }
        yield next;
    }
}