const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');
const Region = require('./Region');

const LandHolding = sequelize.define('LandHolding', {
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
  size_category: {
    type: DataTypes.ENUM('marginal', 'small', 'medium', 'large'),
    allowNull: false
    
  },
  avg_size_ha: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  num_holdings: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 100
    }
  }
}, {
  tableName: 'land_holdings',
  timestamps: true,
  indexes: [
    {
      fields: ['region_id', 'year', 'size_category']
    }
  ]
});

LandHolding.belongsTo(Region, { foreignKey: 'region_id', as: 'region' });
Region.hasMany(LandHolding, { foreignKey: 'region_id', as: 'landHoldings' });

module.exports = LandHolding;
