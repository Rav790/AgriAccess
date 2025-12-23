const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');
const Region = require('./Region');

const WellDepth = sequelize.define('WellDepth', {
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
  avg_depth_meters: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  water_table_level_meters: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  num_wells_sampled: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  well_type: {
    type: DataTypes.ENUM('dug_well', 'borewell', 'tubewell'),
    allowNull: true
  }
}, {
  tableName: 'well_depths',
  timestamps: true,
  indexes: [
    {
      fields: ['region_id', 'year']
    }
  ]
});

// Associations
WellDepth.belongsTo(Region, { foreignKey: 'region_id', as: 'region' });
Region.hasMany(WellDepth, { foreignKey: 'region_id', as: 'wellDepths' });

module.exports = WellDepth;
