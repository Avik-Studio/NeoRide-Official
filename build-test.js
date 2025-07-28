#!/usr/bin/env node

/**
 * Build Test Script for NeoRide Vercel Deployment
 * This script checks for common issues that cause deployment failures
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 NeoRide Build Test - Checking for deployment issues...\n');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'src/App.tsx',
  'src/main.tsx',
  'index.html',
  '.env'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

// Check environment variables
console.log('\n🔧 Checking environment variables...');
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const requiredEnvVars = [
    'VITE_GOOGLE_MAPS_API_KEY',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (envContent.includes(envVar)) {
      console.log(`✅ ${envVar} - Found`);
    } else {
      console.log(`❌ ${envVar} - Missing`);
    }
  });
} else {
  console.log('❌ .env file not found');
}

// Check for common import issues
console.log('\n📦 Checking for import issues...');
const srcDir = 'src';
if (fs.existsSync(srcDir)) {
  const checkImports = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkImports(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for potential problematic imports
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('import') && line.includes('PackagesPage')) {
            console.log(`⚠️  Found PackagesPage import in ${filePath}:${index + 1}`);
          }
          if (line.includes('import') && line.includes('./') && !fs.existsSync(path.resolve(path.dirname(filePath), line.match(/['"](.*?)['"]/)?.[1] || ''))) {
            // This is a simplified check - might have false positives
          }
        });
      }
    });
  };
  
  checkImports(srcDir);
  console.log('✅ Import check completed');
} else {
  console.log('❌ src directory not found');
}

// Check package.json scripts
console.log('\n📋 Checking package.json scripts...');
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  
  if (scripts.build) {
    console.log(`✅ Build script: ${scripts.build}`);
  } else {
    console.log('❌ Build script missing');
  }
  
  if (scripts.dev) {
    console.log(`✅ Dev script: ${scripts.dev}`);
  } else {
    console.log('❌ Dev script missing');
  }
}

// Check vercel.json
console.log('\n🚀 Checking Vercel configuration...');
if (fs.existsSync('vercel.json')) {
  console.log('✅ vercel.json - Found');
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    if (vercelConfig.builds) {
      console.log('✅ Build configuration - Found');
    }
    if (vercelConfig.routes) {
      console.log('✅ Route configuration - Found');
    }
  } catch (e) {
    console.log('❌ vercel.json - Invalid JSON');
  }
} else {
  console.log('❌ vercel.json - Missing');
}

console.log('\n🎯 Build test completed!');
console.log('\n📝 Next steps:');
console.log('1. Fix any ❌ issues shown above');
console.log('2. Set environment variables in Vercel Dashboard');
console.log('3. Commit and push changes to trigger new deployment');
console.log('4. Check Vercel deployment logs for specific errors');