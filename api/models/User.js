const { DataTypes, Model } = require ('sequelize');
const sequelize = require ('../config/database');
const bcrypt = require ('bcrypt');

class User extends Model {

    authenticate (password) {

        return bcrypt.hash (password, this.salt)

            .then (hash => hash === this.password)
            .catch (console.error);
    }
}

User.init ({

    name: {
    
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
    
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
    
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
    
        type: DataTypes.TEXT,
        allowNull: false
    },

    salt: {
    
        type: DataTypes.TEXT
    }
    
}, {

    sequelize,
    modelName: "user"
});

User.addHook ("beforeCreate", user => {

    user.salt = bcrypt.genSaltSync (10); 

    return bcrypt.hash (user.password, user.salt)

        .then (hash => user.password = hash)
        .catch (console.error);
});

module.exports = User;