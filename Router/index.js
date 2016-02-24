'use strict'

module.exports = {
    index: function* (next){
        this.body.marks += "This is index page\n";
        this.body.status = true;
        yield next;
    }
};