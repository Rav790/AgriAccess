require('dotenv').config();
const { sequelize } = require('./src/config/postgres');
const User = require('./src/models/User');

const checkUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'is_verified']
    });

    console.log('\n📊 Users in database:');
    console.log('Total users:', users.length);
    
    users.forEach(user => {
      console.log(`\n- ID: ${user.id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Verified: ${user.is_verified}`);
    });

    // Test password for admin
    const admin = await User.findOne({ where: { email: 'admin@agriassess.com' } });
    if (admin) {
      const testPassword = await admin.comparePassword('admin123');
      console.log('\n🔐 Password Test for admin@agriassess.com:');
      console.log('Password "admin123" matches:', testPassword);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkUsers();
