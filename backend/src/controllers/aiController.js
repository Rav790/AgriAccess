const { GoogleGenerativeAI } = require('@google/generative-ai');
const AILog = require('../models/AILog');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Initialize Gemini AI
let genAI = null;
let isGeminiAvailable = false;

try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    isGeminiAvailable = true;
    console.log('✅ Gemini AI initialized successfully');
  } else {
    console.warn('⚠️ Gemini API key not configured. Using mock responses.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Gemini AI:', error.message);
  isGeminiAvailable = false;
}

// Mock response generator for when Gemini is unavailable
const generateMockSummary = (dataContext, region) => {
  return {
    summary: `## Agricultural Data Summary for ${region || 'Selected Region'}

Based on the available agricultural data, we observe **diverse farming patterns** with a mix of traditional and modern practices.

### Key Findings:
- **Land Holdings**: Varied distribution across different size categories
- **Irrigation**: Multiple water sources with opportunities for optimization
- **Crop Patterns**: Seasonal variations showing potential for diversification

The data indicates **opportunities for sustainable growth** through data-driven decision making and modern agricultural techniques.`,
    recommendations: [
      'Implement precision irrigation systems to optimize water usage and reduce waste',
      'Diversify crop selection based on seasonal trends, market demand, and climate resilience',
      'Invest in soil health monitoring programs and adopt sustainable farming practices'
    ],
    trends: '**Positive**: Increasing adoption of modern techniques\n**Concerning**: Need for better water management infrastructure',
    confidence: 75
  };
};

const generateMockPrediction = (historicalData, region) => {
  return {
    predictions: `## Future Agricultural Forecast (2025-2030)

### Crop Yield Projections
Expected **moderate increase of 5-8%** based on historical trends and assuming stable climate conditions.

### Water Resource Management
- Irrigation demand: **Stable to slightly increasing**
- Groundwater levels: Requires monitoring and conservation
- Recommendation: Invest in water-efficient technologies

### Soil Health Outlook
- Current practices showing **positive results**
- Focus needed on **organic matter enrichment**
- Crop rotation benefits becoming more evident

### Climate Adaptation
Prepare for increased **climate variability** with:
- Drought-resistant crop varieties
- Improved water storage infrastructure
- Weather-based crop insurance`,
    challenges: [
      'Climate variability increasing unpredictability in rainfall patterns',
      'Groundwater depletion requiring investment in water conservation',
      'Market price fluctuations affecting farmer profitability',
      'Need for infrastructure upgrades for modern farming equipment'
    ],
    opportunities: [
      'Growing demand for organic and sustainable produce in urban markets',
      'Government subsidies available for drip irrigation and solar pumps',
      'Technology adoption potential through mobile apps and IoT sensors',
      'Crop insurance and climate-based financial instruments becoming accessible'
    ],
    recommendations: [
      'Diversify crop portfolio to reduce climate and market risks',
      'Invest in water conservation infrastructure (drip irrigation, rainwater harvesting)',
      'Adopt soil testing and precision farming for better yields',
      'Form farmer producer organizations for better market access'
    ],
    confidence: 70,
    timeframe: '2025-2030'
  };
};

const generateMockChatResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('bihar') || lowerMessage.includes('best crop')) {
    return `## Best Crops for Bihar

Bihar's fertile Gangetic plains are ideal for various crops. Here are the **top recommendations**:

### Kharif Season (Monsoon)
- **Rice (Paddy)**: #1 crop, thrives in Bihar's climate
- **Maize**: Good alternative, growing demand
- **Vegetables**: Cauliflower, cabbage, tomato

### Rabi Season (Winter)
- **Wheat**: Major winter crop
- **Potato**: High value crop
- **Mustard**: Good for oil production

### Year-round/Perennial
- **Sugarcane**: Commercial crop
- **Pulses**: Lentils, chickpea

**Pro tip**: Consider crop rotation between rice-wheat or maize-potato for better soil health!`;
  } else if (lowerMessage.includes('crop') || lowerMessage.includes('yield')) {
    return `## Crop Yield Optimization

Maximizing crop yields depends on **multiple critical factors**:

### Key Success Factors:
1. **Soil Quality**
   - Regular soil testing every 2-3 years
   - Maintain optimal pH levels (6-7 for most crops)
   - Add organic matter (compost, manure)

2. **Water Management**
   - Right amount at right time
   - Avoid over-irrigation (leads to root rot)
   - Consider drip irrigation for 30-40% water savings

3. **Climate Conditions**
   - Monitor weather forecasts
   - Plan sowing based on monsoon predictions
   - Use climate-resilient varieties

**Recommendation**: Analyze historical yield data for your specific crop and region to make data-driven decisions.`;
  } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
    return `## Smart Water Management for Agriculture

Efficient irrigation is **crucial for sustainable farming**. Here's how to optimize:

### Modern Irrigation Methods:
- **Drip Irrigation**: 90% efficiency, saves 30-70% water
- **Sprinkler Systems**: Good for large fields
- **Micro-sprinklers**: Ideal for orchards

### Best Practices:
✓ Schedule irrigation based on soil moisture, not calendar
✓ Water early morning or evening (reduced evaporation)
✓ Mulching reduces water loss by 50%
✓ Monitor weather forecasts to avoid unnecessary irrigation

### Government Support:
Many states offer **50-70% subsidy** on drip irrigation systems. Check with your local agriculture office!

**Quick tip**: Install soil moisture sensors (₹2000-5000) to know exactly when crops need water.`;
  } else if (lowerMessage.includes('soil')) {
    return `## Soil Health Management

Healthy soil = Healthy crops! Here's your **soil health guide**:

### Essential Soil Practices:
1. **Regular Testing**
   - Test NPK levels annually
   - Check pH every 2 years
   - Micronutrient analysis recommended

2. **Organic Matter Addition**
   - Compost: 5-10 tonnes/hectare
   - Green manure crops (dhaincha, sunhemp)
   - Farmyard manure before main crop

3. **Crop Rotation**
   - Prevents nutrient depletion
   - Breaks pest/disease cycles
   - Include legumes (add nitrogen naturally)

### Improve Soil Quality:
- Avoid excessive chemical fertilizers
- Use bio-fertilizers (Rhizobium, Azospirillum)
- Practice minimum tillage
- Maintain soil cover with mulch

**Long-term benefit**: Good soil management increases yields by 20-30% over 3-5 years!`;
  } else if (lowerMessage.includes('predict') || lowerMessage.includes('forecast') || lowerMessage.includes('rainfall')) {
    return `## Agricultural Predictions & Forecasting

I can help predict trends, but for **accurate rainfall forecasts**, rely on official sources:

### Rainfall Prediction Sources:
- **IMD (India Meteorological Department)**: mausam.imd.gov.in
- **Meghdoot App**: Free app by IMD
- **Agro-meteorological advisories**: District-wise predictions

### What I Can Predict:
✓ Crop yield trends based on historical data
✓ Water requirement patterns
✓ Soil degradation risks
✓ Market price trends

### Climate Preparedness:
- Diversify crops for climate resilience
- Invest in water storage (farm ponds)
- Use weather-indexed crop insurance
- Choose drought/flood resistant varieties

**Tip**: Combine AI predictions with local farmer knowledge for best results!`;
  } else {
    return `## How I Can Help You

I'm here to assist with **agricultural insights and recommendations**!

### What I Can Do:
📊 **Analyze agricultural data** (land holdings, irrigation, crops, well depths)
🌾 **Crop recommendations** based on region, season, and soil
💧 **Irrigation planning** and water management advice
🔮 **Trend predictions** using historical data
🌍 **Location-specific advice** (enable location for personalized tips)

### Sample Questions:
- "What crops are best for Bihar?"
- "How to improve soil health?"
- "Analyze irrigation patterns in my region"
- "Predict crop yield for next season"
- "Water conservation techniques"

**Ask me anything specific** and I'll provide detailed, actionable advice!`;
  }
};

// @desc    Generate AI summary
// @route   POST /api/ai/summary
// @access  Private
exports.generateSummary = async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { dataContext, region, dataType, userLocation } = req.body;

    // More lenient validation - accept any truthy value
    if (!dataContext && !region) {
      return res.status(400).json({
        success: false,
        message: 'Either data context or region is required'
      });
    }

    let aiInsights;

    // Build location context if available
    const locationContext = userLocation 
      ? `\nUser Location: Latitude ${userLocation.latitude}, Longitude ${userLocation.longitude}
         Provide location-specific recommendations based on these coordinates.`
      : '';

    // Use Gemini AI if available
    if (isGeminiAvailable) {
      try {
        // Create structured prompt with location
        const prompt = `
You are an expert agricultural data analyst and agronomist with deep knowledge of Indian farming practices.

Region: ${region || 'India'}
Data Type: ${dataType || 'General Agricultural Data'}${locationContext}

Agricultural Data:
${JSON.stringify(dataContext || {}, null, 2)}

Provide a comprehensive analysis with:
1. **Executive Summary** (3-4 sentences highlighting key findings)
2. **Top 3 Actionable Recommendations** specifically for farmers in this region
3. **Trends Analysis** (positive developments and concerning patterns)
4. **Confidence Level** (0-100%) in your analysis

${userLocation ? 'Consider local soil types, climate patterns, water availability, and traditional crops for this specific location when making recommendations.' : ''}

Format as JSON: {
  "summary": "detailed markdown text with headings and bullet points",
  "recommendations": ["rec1", "rec2", "rec3"],
  "trends": "markdown formatted trends analysis",
  "confidence": 85
}
`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response (with fallback)
        try {
          // Extract JSON from markdown code blocks if present
          const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
          aiInsights = JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
        } catch {
          aiInsights = {
            summary: text,
            recommendations: ['Review the full analysis for detailed insights'],
            trends: 'Analysis completed',
            confidence: 75
          };
        }
      } catch (geminiError) {
        console.error('Gemini API error, using mock response:', geminiError.message);
        aiInsights = generateMockSummary(dataContext, region);
      }
    } else {
      // Use mock response
      aiInsights = generateMockSummary(dataContext, region);
    }

    const responseTime = Date.now() - startTime;

    // Log to MongoDB (with error handling)
    try {
      await AILog.create({
        userId: req.userId,
        queryType: 'summary',
        prompt: 'Agricultural data summary request',
        inputData: dataContext,
        response: aiInsights,
        model: isGeminiAvailable ? 'gemini-2.5-pro' : 'mock-ai',
        responseTime,
        success: true,
        ipAddress: req.ip
      });
    } catch (logError) {
      console.error('Failed to log AI query:', logError.message);
    }

    res.json({
      success: true,
      data: aiInsights,
      metadata: {
        responseTime,
        model: isGeminiAvailable ? 'gemini-2.5-pro' : 'mock-ai',
        usingMock: !isGeminiAvailable
      }
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    // Log error (with error handling)
    try {
      await AILog.create({
        userId: req.userId,
        queryType: 'summary',
        prompt: 'Agricultural data summary request',
        success: false,
        errorMessage: error.message,
        responseTime,
        ipAddress: req.ip
      });
    } catch (logError) {
      console.error('Failed to log AI error:', logError.message);
    }

    next(error);
  }
};

// @desc    Generate predictions
// @route   POST /api/ai/predict
// @access  Private
exports.generatePrediction = async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { historicalData, region, predictionType, userLocation } = req.body;

    if (!historicalData) {
      return res.status(400).json({
        success: false,
        message: 'Historical data is required'
      });
    }

    let predictions;

    // Build location context
    const locationContext = userLocation 
      ? `\nUser Location: Latitude ${userLocation.latitude}, Longitude ${userLocation.longitude}
         Consider local climate patterns, seasonal rainfall, and regional agricultural practices for these coordinates.`
      : '';

    // Use Gemini AI if available
    if (isGeminiAvailable) {
      try {
        const prompt = `
You are an agricultural forecasting expert with deep knowledge of climate patterns, crop science, and Indian farming trends.

Region: ${region || 'India'}
Prediction Focus: ${predictionType || 'General Agricultural Trends'}${locationContext}

Historical Agricultural Data (past 5-10 years):
${JSON.stringify(historicalData, null, 2)}

Provide detailed predictions for the next 3-5 years:

1. **Future Trends Forecast**
   - Crop yield projections
   - Water availability and irrigation needs
   - Soil health indicators
   - Climate impact assessment

2. **Potential Challenges**
   - List 3-5 major challenges farmers may face
   - Consider water scarcity, climate variability, market fluctuations

3. **Growth Opportunities**
   - Identify 3-5 opportunities for farmers to capitalize on
   - New crop varieties, sustainable practices, market demands

4. **Actionable Recommendations**
   - Specific steps farmers can take to prepare
   - Investment priorities (infrastructure, technology, training)

${userLocation ? 'Tailor all predictions and recommendations to the specific latitude/longitude coordinates provided, considering local micro-climate, soil types, and traditional farming practices in that area.' : ''}

Format as JSON: {
  "predictions": "detailed markdown formatted forecast with headings, bullet points, and numbers",
  "challenges": ["challenge1", "challenge2", "challenge3"],
  "opportunities": ["opp1", "opp2", "opp3"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "confidence": 80,
  "timeframe": "2025-2030"
}

IMPORTANT: Do NOT use markdown formatting (like ** or ##) inside the array items for challenges and opportunities. Use plain text only in arrays.
`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        try {
          const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
          predictions = JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
        } catch {
          predictions = {
            predictions: text,
            challenges: ['Climate variability', 'Water scarcity'],
            opportunities: ['Technology adoption', 'Crop diversification'],
            recommendations: ['Monitor water levels', 'Invest in efficient irrigation'],
            confidence: 70,
            timeframe: '3-5 years'
          };
        }
      } catch (geminiError) {
        console.error('Gemini API error, using mock response:', geminiError.message);
        predictions = generateMockPrediction(historicalData, region);
      }
    } else {
      // Use mock response
      predictions = generateMockPrediction(historicalData, region);
    }

    const responseTime = Date.now() - startTime;

    // Log to MongoDB (with error handling)
    try {
      await AILog.create({
        userId: req.userId,
        queryType: 'prediction',
        prompt: 'Agricultural prediction request',
        inputData: historicalData,
        response: predictions,
        model: isGeminiAvailable ? 'gemini-2.5-pro' : 'mock-ai',
        responseTime,
        success: true,
        ipAddress: req.ip
      });
    } catch (logError) {
      console.error('Failed to log AI query:', logError.message);
    }

    res.json({
      success: true,
      data: predictions,
      metadata: {
        responseTime,
        model: isGeminiAvailable ? 'gemini-2.5-pro' : 'mock-ai',
        usingMock: !isGeminiAvailable
      }
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    // Log error (with error handling)
    try {
      await AILog.create({
        userId: req.userId,
        queryType: 'prediction',
        success: false,
        errorMessage: error.message,
        responseTime,
        ipAddress: req.ip
      });
    } catch (logError) {
      console.error('Failed to log AI error:', logError.message);
    }

    next(error);
  }
};

// @desc    AI Chat interface
// @route   POST /api/ai/chat
// @access  Private
exports.chat = async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { message, context, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    let reply;

    // Extract location from context if available
    const userLocation = context?.userLocation;
    const locationInfo = userLocation 
      ? `\nUser's Location: Latitude ${userLocation.latitude}, Longitude ${userLocation.longitude}`
      : '';

    // Use Gemini AI if available
    if (isGeminiAvailable) {
      try {
        // Build conversation context
        let conversationContext = '';
        if (conversationHistory && conversationHistory.length > 0) {
          conversationContext = conversationHistory
            .slice(-5) // Only use last 5 messages for context
            .map(msg => `${msg.role}: ${msg.content}`)
            .join('\n');
        }

        const prompt = `
You are an expert AI assistant specialized in Indian agriculture with deep knowledge of:
- Crop cultivation practices and recommendations
- Irrigation systems and water management
- Soil health and fertilization
- Climate patterns and seasonal planning
- Pest and disease management
- Market trends and pricing
- Government schemes and subsidies for farmers

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ''}

${context ? `Agricultural Data Context:\n${JSON.stringify(context, null, 2)}\n` : ''}

${locationInfo}

User's Question: ${message}

Guidelines for your response:
- Provide practical, actionable advice
- Use markdown formatting with **bold** for emphasis, bullet points for lists
- If location is available, give location-specific recommendations
- Cite specific data points when referencing statistics
- If uncertain, acknowledge limitations
- Use simple, clear language suitable for farmers
- Format responses with headings (##) for different sections when appropriate

Respond in markdown format.
`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        reply = response.text();
      } catch (geminiError) {
        console.error('Gemini API error, using mock response:', geminiError.message);
        reply = generateMockChatResponse(message);
      }
    } else {
      // Use mock response
      reply = generateMockChatResponse(message);
    }

    const responseTime = Date.now() - startTime;

    // Log to MongoDB (with error handling)
    try {
      await AILog.create({
        userId: req.userId,
        queryType: 'chat',
        prompt: message,
        inputData: { context, conversationHistory },
        response: { reply },
        model: isGeminiAvailable ? 'gemini-2.5-pro' : 'mock-ai',
        responseTime,
        success: true,
        ipAddress: req.ip
      });
    } catch (logError) {
      console.error('Failed to log AI query:', logError.message);
    }

    res.json({
      success: true,
      data: {
        reply,
        timestamp: new Date()
      },
      metadata: {
        responseTime,
        model: isGeminiAvailable ? 'gemini-2.5-pro' : 'mock-ai',
        usingMock: !isGeminiAvailable
      }
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    // Log error (with error handling)
    try {
      await AILog.create({
        userId: req.userId,
        queryType: 'chat',
        prompt: req.body.message,
        success: false,
        errorMessage: error.message,
        responseTime,
        ipAddress: req.ip
      });
    } catch (logError) {
      console.error('Failed to log AI error:', logError.message);
    }

    next(error);
  }
};

// @desc    Generate PDF report
// @route   POST /api/ai/report
// @access  Private
exports.generateReport = async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { title, data, insights, region, dateRange } = req.body;

    // First, get AI to analyze and summarize the report
    const prompt = `
Create an executive summary for an agricultural assessment report:

Title: ${title || 'Agricultural Assessment Report'}
Region: ${region || 'India'}
Period: ${dateRange || '2023'}

Data Summary:
${JSON.stringify(data, null, 2)}

${insights ? `Existing Insights:\n${JSON.stringify(insights, null, 2)}` : ''}

Provide:
1. Executive Summary (3-4 paragraphs)
2. Key Findings (bullet points)
3. Critical Recommendations
4. Risk Assessment
5. Future Outlook

Format as JSON with keys: executiveSummary, keyFindings (array), recommendations (array), risks (array), outlook
`;

    const model = getModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let reportContent;
    try {
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
      reportContent = JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
    } catch {
      reportContent = {
        executiveSummary: text,
        keyFindings: ['Analysis completed'],
        recommendations: ['Review detailed data'],
        risks: ['Monitor trends regularly'],
        outlook: 'Positive with adaptations'
      };
    }

    // Create PDF
    const doc = new PDFDocument();
    const filename = `report-${Date.now()}.pdf`;
    const filepath = path.join(__dirname, '../../uploads', filename);

    // Ensure uploads directory exists
    if (!fs.existsSync(path.join(__dirname, '../../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../../uploads'), { recursive: true });
    }

    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Add content to PDF
    doc.fontSize(20).text(title || 'AgriAssess Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Region: ${region || 'India'}`, { align: 'center' });
    doc.text(`Period: ${dateRange || '2023'}`, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(16).text('Executive Summary');
    doc.fontSize(10).text(reportContent.executiveSummary);
    doc.moveDown();

    doc.fontSize(16).text('Key Findings');
    reportContent.keyFindings.forEach((finding, i) => {
      doc.fontSize(10).text(`${i + 1}. ${finding}`);
    });
    doc.moveDown();

    doc.fontSize(16).text('Recommendations');
    reportContent.recommendations.forEach((rec, i) => {
      doc.fontSize(10).text(`${i + 1}. ${rec}`);
    });
    doc.moveDown();

    doc.fontSize(16).text('Risk Assessment');
    reportContent.risks.forEach((risk, i) => {
      doc.fontSize(10).text(`${i + 1}. ${risk}`);
    });
    doc.moveDown();

    doc.fontSize(16).text('Future Outlook');
    doc.fontSize(10).text(reportContent.outlook);

    doc.end();

    // Wait for PDF to be written
    await new Promise((resolve) => stream.on('finish', resolve));

    const responseTime = Date.now() - startTime;

    await AILog.create({
      userId: req.userId,
      queryType: 'report',
      prompt,
      inputData: { title, region, dateRange },
      response: reportContent,
      model: 'gemini-2.5-pro',
      responseTime,
      success: true,
      ipAddress: req.ip
    });

    res.json({
      success: true,
      data: {
        reportContent,
        pdfUrl: `/uploads/${filename}`,
        filename
      },
      metadata: {
        responseTime,
        model: 'gemini-2.5-pro'
      }
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    await AILog.create({
      userId: req.userId,
      queryType: 'report',
      success: false,
      errorMessage: error.message,
      responseTime,
      ipAddress: req.ip
    });

    next(error);
  }
};

// @desc    Get AI usage statistics
// @route   GET /api/ai/stats
// @access  Private
exports.getAIStats = async (req, res, next) => {
  try {
    const stats = await AILog.aggregate([
      {
        $match: { userId: req.userId }
      },
      {
        $group: {
          _id: '$queryType',
          count: { $sum: 1 },
          avgResponseTime: { $avg: '$responseTime' },
          successRate: {
            $avg: { $cond: ['$success', 1, 0] }
          }
        }
      }
    ]);

    const totalQueries = await AILog.countDocuments({ userId: req.userId });

    res.json({
      success: true,
      data: {
        totalQueries,
        byType: stats,
        overall: {
          successRate: stats.reduce((acc, s) => acc + s.successRate, 0) / stats.length || 0,
          avgResponseTime: stats.reduce((acc, s) => acc + s.avgResponseTime, 0) / stats.length || 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
