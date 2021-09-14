const { Model, DataTypes } = require('sequelize')

class Behavior extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'behaviors',
        })
    }

    static associate(models) {
        this.belongsToMany(models.Dog, { foreignKey: 'behaviorId', through: 'behaviorDog', as: 'dogs' })
    }
}

module.exports = Behavior