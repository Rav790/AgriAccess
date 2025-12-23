const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');

const Region = sequelize.define('Region', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  area_sq_km: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'regions',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['state', 'district']
    }
  ]
});

module.exports = Region;
