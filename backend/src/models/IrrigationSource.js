const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');
const Region = require('./Region');

const IrrigationSource = sequelize.define('IrrigationSource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Region,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 2000,
      max: 2030
    }
  },
  source: {
    type: DataTypes.ENUM('canal', 'well', 'tubewell', 'tank', 'rainfed', 'other'),
    allowNull: false
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  area_irrigated_ha: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'irrigation_sources',
  timestamps: true,
  indexes: [
    {
      fields: ['region_id', 'year', 'source']
    }
  ]
});

// Associations
IrrigationSource.belongsTo(Region, { foreignKey: 'region_id', as: 'region' });
Region.hasMany(IrrigationSource, { foreignKey: 'region_id', as: 'irrigationSources' });

module.exports = IrrigationSource;
