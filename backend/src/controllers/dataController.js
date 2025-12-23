const { Op } = require('sequelize');
const Region = require('../models/Region');
const LandHolding = require('../models/LandHolding');
const IrrigationSource = require('../models/IrrigationSource');
const CroppingPattern = require('../models/CroppingPattern');
const WellDepth = require('../models/WellDepth');
const Analytics = require('../models/Analytics');
const csv = require('csv-parser');
const fs = require('fs');

// @desc    Get all regions
// @route   GET /api/data/regions
// @access  Public
exports.getRegions = async (req, res, next) => {
  try {
    const { state, search, limit = 100, offset = 0 } = req.query;

    const where = {};
    if (state) where.state = state;
    if (search) {
      where[Op.or] = [
        { state: { [Op.iLike]: `%${search}%` } },
        { district: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const regions = await Region.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['state', 'ASC'], ['district', 'ASC']]
    });

    // Get unique states
    const states = await Region.findAll({
      attributes: [[Region.sequelize.fn('DISTINCT', Region.sequelize.col('state')), 'state']],
      raw: true,
      order: [['state', 'ASC']]
    });

    res.json({
      success: true,
      data: regions.rows,
      pagination: {
        total: regions.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      },
      states: states.map(s => s.state)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get land holdings
// @route   GET /api/data/landholdings
// @access  Public
exports.getLandHoldings = async (req, res, next) => {
  try {
    const { state, district, year, sizeCategory, limit = 100, offset = 0 } = req.query;

    const where = {};
    if (year) where.year = parseInt(year);
    if (sizeCategory) where.size_category = sizeCategory;

    const include = [{
      model: Region,
      as: 'region',
      where: {}
    }];

    if (state) include[0].where.state = state;
    if (district) include[0].where.district = district;

    const landHoldings = await LandHolding.findAndCountAll({
      where,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC']]
    });

    res.json({
      success: true,
      data: landHoldings.rows,
      pagination: {
        total: landHoldings.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get irrigation sources
// @route   GET /api/data/irrigation
// @access  Public
exports.getIrrigationSources = async (req, res, next) => {
  try {
    const { state, district, year, source, limit = 100, offset = 0 } = req.query;

    const where = {};
    if (year) where.year = parseInt(year);
    if (source) where.source = source;

    const include = [{
      model: Region,
      as: 'region',
      where: {}
    }];

    if (state) include[0].where.state = state;
    if (district) include[0].where.district = district;

    const irrigationSources = await IrrigationSource.findAndCountAll({
      where,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC']]
    });

    res.json({
      success: true,
      data: irrigationSources.rows,
      pagination: {
        total: irrigationSources.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get cropping patterns
// @route   GET /api/data/cropping
// @access  Public
exports.getCroppingPatterns = async (req, res, next) => {
  try {
    const { state, district, year, crop, season, minYield, limit = 100, offset = 0 } = req.query;

    const where = {};
    if (year) where.year = parseInt(year);
    if (crop) where.crop_type = { [Op.iLike]: `%${crop}%` };
    if (season) where.season = season;
    if (minYield) where.yield_tonnes_ha = { [Op.gte]: parseFloat(minYield) };

    const include = [{
      model: Region,
      as: 'region',
      where: {}
    }];

    if (state) include[0].where.state = state;
    if (district) include[0].where.district = district;

    const croppingPatterns = await CroppingPattern.findAndCountAll({
      where,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC'], ['crop_type', 'ASC']]
    });

    res.json({
      success: true,
      data: croppingPatterns.rows,
      pagination: {
        total: croppingPatterns.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get well depths
// @route   GET /api/data/wells
// @access  Public
exports.getWellDepths = async (req, res, next) => {
  try {
    const { state, district, year, minDepth, maxDepth, limit = 100, offset = 0 } = req.query;

    const where = {};
    if (year) where.year = parseInt(year);
    if (minDepth || maxDepth) {
      where.avg_depth_meters = {};
      if (minDepth) where.avg_depth_meters[Op.gte] = parseFloat(minDepth);
      if (maxDepth) where.avg_depth_meters[Op.lte] = parseFloat(maxDepth);
    }

    const include = [{
      model: Region,
      as: 'region',
      where: {}
    }];

    if (state) include[0].where.state = state;
    if (district) include[0].where.district = district;

    const wellDepths = await WellDepth.findAndCountAll({
      where,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC']]
    });

    res.json({
      success: true,
      data: wellDepths.rows,
      pagination: {
        total: wellDepths.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/data/stats
// @access  Public
exports.getStatistics = async (req, res, next) => {
  try {
    const { state, year = 2023 } = req.query;

    const regionWhere = state ? { state } : {};

    // Get regions for the filter
    const regions = await Region.findAll({
      where: regionWhere,
      attributes: ['id']
    });
    const regionIds = regions.map(r => r.id);

    // Average land holding
    const avgLandHolding = await LandHolding.findOne({
      where: { 
        region_id: { [Op.in]: regionIds },
        year: parseInt(year)
      },
      attributes: [
        [LandHolding.sequelize.fn('AVG', LandHolding.sequelize.col('avg_size_ha')), 'avg']
      ],
      raw: true
    });

    // Irrigation breakdown
    const irrigationBreakdown = await IrrigationSource.findAll({
      where: { 
        region_id: { [Op.in]: regionIds },
        year: parseInt(year)
      },
      attributes: [
        'source',
        [IrrigationSource.sequelize.fn('AVG', IrrigationSource.sequelize.col('percentage')), 'avg_percentage']
      ],
      group: ['source'],
      raw: true
    });

    // Top crops
    const topCrops = await CroppingPattern.findAll({
      where: { 
        region_id: { [Op.in]: regionIds },
        year: parseInt(year)
      },
      attributes: [
        'crop_type',
        [CroppingPattern.sequelize.fn('SUM', CroppingPattern.sequelize.col('production_tonnes')), 'total_production']
      ],
      group: ['crop_type'],
      order: [[CroppingPattern.sequelize.fn('SUM', CroppingPattern.sequelize.col('production_tonnes')), 'DESC']],
      limit: 5,
      raw: true
    });

    // Average well depth
    const avgWellDepth = await WellDepth.findOne({
      where: { 
        region_id: { [Op.in]: regionIds },
        year: parseInt(year)
      },
      attributes: [
        [WellDepth.sequelize.fn('AVG', WellDepth.sequelize.col('avg_depth_meters')), 'avg']
      ],
      raw: true
    });

    res.json({
      success: true,
      data: {
        avgLandHolding: parseFloat(avgLandHolding?.avg || 0).toFixed(2),
        irrigationBreakdown,
        topCrops,
        avgWellDepth: parseFloat(avgWellDepth?.avg || 0).toFixed(2),
        year: parseInt(year),
        state: state || 'All India'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload data (CSV/JSON)
// @route   POST /api/data/upload
// @access  Private (Admin only)
exports.uploadData = async (req, res, next) => {
  try {
    const { dataType } = req.body; // 'regions', 'landholdings', 'irrigation', 'cropping', 'wells'
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Process CSV file based on dataType
    // This is a simplified version - expand based on your needs
    const results = [];
    
    res.json({
      success: true,
      message: `Data uploaded successfully for ${dataType}`,
      recordsProcessed: results.length
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
