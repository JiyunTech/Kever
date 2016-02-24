var Sequelize = require('sequelize');
var sequelize = require("./model.js");

var Stuff = sequelize.define('stuff', {
    id: {type: Sequelize.INTEGER(11).UNSIGNED, primaryKey: true},
    name: {type: Sequelize.STRING, allowNull: false, unique: true},
    password: {type: Sequelize.STRING, allowNull: false},
    description: {type: Sequelize.STRING, allowNull: true},
    state: {type: Sequelize.INTEGER(1),defaultValue: 1},
    added: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    admin: {type: Sequelize.INTEGER(1),defaultValue: 0}
},{
    createdAt: false,
    updatedAt: false
});
Stuff.sync();

module.exports = {
	/*
	list user
	 */
    getAll: function() {
        return Stuff.findAll({
        	attributes: ['id', 'name', 'description', 'state', 'admin', 'added'],
            where:{
                state: 1
            }
        })
        .then(function(stuffs) {
            return stuffs;
        })
        .catch(function(){
        	return []
        });
    },
    /*
    user login
     */
    login: function(name_, password_) {
        return Stuff.findOne({
        	attributes: ['id', 'name', 'description', 'state', 'admin', 'added'],
            where:{
                name: name_,
                password: password_,
                state: 1
            }
        })
        .then(function(stuff) {
            return stuff;
        })
        .catch(function(){
        	return undefined
        });
    },
    /*
    admin login
     */
    adminlogin: function(name_, password_) {
        return Stuff.findOne({
        	attributes: ['id', 'name', 'description', 'state', 'admin', 'added'],
            where:{
                name: name_,
                password: password_,
                state: 1,
                admin: 1
            }
        })
        .then(function(admin_) {
            return admin_;
        })
        .catch(function(){
        	return undefined
        });
    }
};

