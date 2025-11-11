// Simple script to create PNG icons from SVG
// Run with: node create-icons.js
// Requires: npm install sharp

import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('./public/icon.svg');

async function createIcons() {
  // Create 192x192 icon
  await sharp(svg)
    .resize(192, 192)
    .png()
    .toFile('./public/icon-192.png');

  // Create 512x512 icon
  await sharp(svg)
    .resize(512, 512)
    .png()
    .toFile('./public/icon-512.png');

  console.log('✓ Icons created successfully!');
}

createIcons().catch(console.error);

