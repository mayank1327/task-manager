const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Task = require('./models/Task');

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', password: 'password123' },
  { name: 'Bob Smith', email: 'bob@example.com', password: 'password123' },
  { name: 'Charlie Brown', email: 'charlie@example.com', password: 'password123' },
  { name: 'Diana Prince', email: 'diana@example.com', password: 'password123' },
  { name: 'Ethan Hunt', email: 'ethan@example.com', password: 'password123' },
  { name: 'Fiona Green', email: 'fiona@example.com', password: 'password123' }
];

const taskTemplates = [
  { title: 'Complete project documentation', description: 'Write comprehensive documentation for the project including API endpoints and usage examples', priority: 'high' },
  { title: 'Fix bug in login system', description: 'Users are experiencing issues with password reset functionality', priority: 'high' },
  { title: 'Update dependencies', description: 'Update all npm packages to latest stable versions', priority: 'medium' },
  { title: 'Design new landing page', description: 'Create mockups for the new marketing landing page', priority: 'medium' },
  { title: 'Review pull requests', description: 'Review and merge pending pull requests from team members', priority: 'low' },
  { title: 'Setup CI/CD pipeline', description: 'Configure automated testing and deployment pipeline', priority: 'high' },
  { title: 'Write unit tests', description: 'Add test coverage for authentication module', priority: 'medium' },
  { title: 'Database optimization', description: 'Optimize slow queries and add missing indexes', priority: 'high' },
  { title: 'Team meeting preparation', description: 'Prepare slides and agenda for weekly team sync', priority: 'low' },
  { title: 'Customer feedback analysis', description: 'Analyze recent customer feedback and create action items', priority: 'medium' },
  { title: 'Security audit', description: 'Perform security audit and fix vulnerabilities', priority: 'high' },
  { title: 'Mobile app testing', description: 'Test mobile app on different devices and screen sizes', priority: 'medium' },
  { title: 'API documentation update', description: 'Update API documentation with new endpoints', priority: 'low' },
  { title: 'Performance monitoring', description: 'Set up performance monitoring and alerting', priority: 'medium' },
  { title: 'Code refactoring', description: 'Refactor legacy code in user management module', priority: 'low' }
];

const getRandomDate = (daysAhead) => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead));
  return date;
};

const getRandomStatus = () => {
  return Math.random() > 0.3 ? 'pending' : 'completed';
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      });
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.name}`);
    }

    // Create tasks for each user
    let totalTasks = 0;
    for (const user of createdUsers) {
      const numTasks = Math.floor(Math.random() * 8) + 8; // 8-15 tasks per user
      
      for (let i = 0; i < numTasks; i++) {
        const template = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
        await Task.create({
          title: template.title,
          description: template.description,
          dueDate: getRandomDate(30),
          status: getRandomStatus(),
          priority: template.priority,
          assignedTo: user._id
        });
        totalTasks++;
      }
      console.log(`✅ Created ${numTasks} tasks for ${user.name}`);
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log(`📊 Total users: ${createdUsers.length}`);
    console.log(`📊 Total tasks: ${totalTasks}`);
    console.log('\n📝 Login credentials (all passwords: password123):');
    createdUsers.forEach(user => {
      console.log(`   ${user.email}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();