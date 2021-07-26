const { Model, DataTypes } = require('sequelize')

class Dog extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            weigth: DataTypes.FLOAT,
            age: DataTypes.INTEGER,
            behavior: DataTypes.STRING,
            entryDate: DataTypes.STRING,
            inKennel: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'dogs'
        })
    }

    static associate(models) {
        this.belongsTo(models.Kennel, { foreignKey: 'kennelId', as: 'Kennel' })
    }
}

module.exports = Dog