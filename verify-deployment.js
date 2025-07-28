#!/usr/bin/env node

/**
 * Deployment Verification Script for NeoRide
 * This script checks if all requirements are met for successful Vercel deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 NeoRide Deployment Verification\n');

let allChecksPass = true;

// Check 1: Required files
console.log('📁 Checking required files...');
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'vercel.json',
  'src/App.tsx',
  'src/main.tsx',
  'index.html'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 2: Package.json configuration
console.log('\n📋 Checking package.json...');
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log(`✅ Build script: ${packageJson.scripts.build}`);
  } else {
    console.log('❌ Build script missing');
    allChecksPass = false;
  }
  
  if (packageJson.dependencies) {
    const criticalDeps = ['react', 'react-dom', '@supabase/supabase-js', 'vite'];
    criticalDeps.forEach(dep => {
      if (packageJson.dependencies[dep] || (packageJson.devDependencies && packageJson.devDependencies[dep])) {
        console.log(`✅ ${dep} dependency found`);
      } else {
        console.log(`❌ ${dep} dependency missing`);
        allChecksPass = false;
      }
    });
  }
}

// Check 3: Vercel configuration
console.log('\n🚀 Checking Vercel configuration...');
if (fs.existsSync('vercel.json')) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    if (vercelConfig.builds) {
      console.log('✅ Build configuration found');
    } else {
      console.log('❌ Build configuration missing');
      allChecksPass = false;
    }
    
    if (vercelConfig.routes) {
      console.log('✅ Route configuration found');
    } else {
      console.log('❌ Route configuration missing');
      allChecksPass = false;
    }
  } catch (e) {
    console.log('❌ vercel.json - Invalid JSON');
    allChecksPass = false;
  }
} else {
  console.log('❌ vercel.json missing');
  allChecksPass = false;
}

// Check 4: Environment variables template
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
      console.log(`✅ ${envVar} found in .env`);
    } else {
      console.log(`❌ ${envVar} missing from .env`);
      allChecksPass = false;
    }
  });
} else {
  console.log('⚠️  .env file not found (this is OK if using Vercel environment variables)');
}

// Check 5: TypeScript configuration
console.log('\n📝 Checking TypeScript configuration...');
if (fs.existsSync('tsconfig.json')) {
  console.log('✅ tsconfig.json found');
} else {
  console.log('❌ tsconfig.json missing');
  allChecksPass = false;
}

// Check 6: Critical source files
console.log('\n📦 Checking critical source files...');
const criticalFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/lib/supabase.ts',
  'src/components/Pages/PackagesPage.tsx'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 7: Import statements
console.log('\n🔗 Checking for problematic imports...');
if (fs.existsSync('src/App.tsx')) {
  const appContent = fs.readFileSync('src/App.tsx', 'utf8');
  
  // Check for PackagesPage import
  if (appContent.includes('PackagesPage')) {
    if (fs.existsSync('src/components/Pages/PackagesPage.tsx')) {
      console.log('✅ PackagesPage import and file match');
    } else {
      console.log('❌ PackagesPage imported but file missing');
      allChecksPass = false;
    }
  }
  
  // Check for other potential issues
  const lines = appContent.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('import') && line.includes('./') && !line.includes('//')) {
      const match = line.match(/from\s+['"](.*?)['"]/);
      if (match) {
        const importPath = match[1];
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          // This is a simplified check
          console.log(`ℹ️  Relative import found: ${importPath} (line ${index + 1})`);
        }
      }
    }
  });
}

// Final summary
console.log('\n' + '='.repeat(50));
if (allChecksPass) {
  console.log('🎉 ALL CHECKS PASSED!');
  console.log('\n✅ Your project is ready for Vercel deployment');
  console.log('\n📋 Next steps:');
  console.log('1. Set environment variables in Vercel Dashboard');
  console.log('2. Push changes to GitHub');
  console.log('3. Monitor deployment in Vercel Dashboard');
} else {
  console.log('❌ SOME CHECKS FAILED!');
  console.log('\n🔧 Please fix the issues marked with ❌ above');
  console.log('\n📋 Common fixes:');
  console.log('1. Install missing dependencies: npm install');
  console.log('2. Create missing files');
  console.log('3. Fix configuration files');
  console.log('4. Set environment variables');
}

console.log('\n🚀 For detailed troubleshooting, see DEPLOYMENT_TROUBLESHOOTING.md');

// Environment variables reminder
console.log('\n' + '='.repeat(50));
console.log('🔧 CRITICAL: Set these in Vercel Dashboard:');
console.log('');
console.log('VITE_GOOGLE_MAPS_API_KEY = AIzaSyBijSpKeKls2NnnAV-S9BRIay897AIBGyg');
console.log('VITE_SUPABASE_URL = https://dkvuzzenlogcmcithurs.supabase.co');
console.log('VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdnV6emVubG9nY21jaXRodXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1OTc2OTAsImV4cCI6MjA2OTE3MzY5MH0.pa_puSJdI6yUWmYvlMhzMRpXhoHacHde5u78gEoWJHo');
console.log('');
console.log('⚠️  Add these to ALL environments: Production, Preview, Development');
console.log('='.repeat(50));