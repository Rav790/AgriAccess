const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');
const Region = require('./Region');

const CroppingPattern = sequelize.define('CroppingPattern', {
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
  crop_type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  season: {
    type: DataTypes.ENUM('kharif', 'rabi', 'zaid', 'perennial'),
    allowNull: false
  },
  area_cultivated_ha: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  yield_tonnes_ha: {
    type: DataTypes.DECIMAL(10, 3),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  production_tonnes: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'cropping_patterns',
  timestamps: true,
  indexes: [
    {
      fields: ['region_id', 'year', 'crop_type', 'season']
    }
  ]
});

// Associations
CroppingPattern.belongsTo(Region, { foreignKey: 'region_id', as: 'region' });
Region.hasMany(CroppingPattern, { foreignKey: 'region_id', as: 'croppingPatterns' });

module.exports = CroppingPattern;
