#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up GT Estate Website...\n');

// Create .env.local if it doesn't exist
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `# Environment variables for local development
NEXT_PUBLIC_API_URL=https://gt-estate-server.vercel.app
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
}

console.log('📦 Installing dependencies...');
console.log('Run: npm install');
console.log('\n🎯 Starting development server...');
console.log('Run: npm run dev');
console.log('\n🌐 Open http://localhost:3000 in your browser');
console.log('\n✨ Setup complete! Happy coding!');

