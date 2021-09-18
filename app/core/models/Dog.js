const { Model, DataTypes } = require('sequelize')

class Dog extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            weight: DataTypes.FLOAT,
            age: DataTypes.INTEGER,
            size: DataTypes.STRING,
            sex: DataTypes.STRING,
            entryDate: DataTypes.STRING,
            exitDate: DataTypes.STRING,
            adopted: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'dogs'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Behavior, { foreignKey: 'dogId', through: 'behaviorDog', as: 'behaviors' })
        this.belongsTo(models.Kennel, { foreignKey: 'kennelId', as: 'Kennel' })
    }
}

module.exports = Dog