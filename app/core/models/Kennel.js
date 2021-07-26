const { Model, DataTypes } = require('sequelize')

class Kennel extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'kennels'
        })
    }

    static associate(models) {
        this.hasMany(models.Dog, { foreignKey: 'kennelId', as: 'Dogs' })
    }
}

module.exports = Kennel