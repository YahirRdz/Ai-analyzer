// Simple test script for formatSize function

// Import the formatSize function
// Note: This is a CommonJS-style import for a simple Node.js test
// In a real application, you would use proper testing frameworks
const { formatSize } = require('./app/lib/utils');

// Test cases
const testCases = [
  { bytes: 0, expected: '0 Bytes' },
  { bytes: 500, expected: '500 Bytes' },
  { bytes: 1023, expected: '1023 Bytes' },
  { bytes: 1024, expected: '1 KB' },
  { bytes: 1500, expected: '1.46 KB' },
  { bytes: 1024 * 1024, expected: '1 MB' },
  { bytes: 1024 * 1024 * 2.5, expected: '2.5 MB' },
  { bytes: 1024 * 1024 * 1024, expected: '1 GB' },
  { bytes: 1024 * 1024 * 1024 * 1.75, expected: '1.75 GB' },
  { bytes: 1024 * 1024 * 1024 * 1024, expected: '1 TB' },
  { bytes: 1024 * 1024 * 1024 * 1024 * 5.25, expected: '5.25 TB' },
];

// Run tests
console.log('Testing formatSize function:');
console.log('----------------------------');

testCases.forEach(({ bytes, expected }) => {
  const result = formatSize(bytes);
  const passed = result === expected;
  
  console.log(`Input: ${bytes} bytes`);
  console.log(`Expected: "${expected}"`);
  console.log(`Actual: "${result}"`);
  console.log(`Test ${passed ? 'PASSED' : 'FAILED'}`);
  console.log('----------------------------');
});

// Note: This test script won't run directly in the browser environment
// due to the CommonJS-style import. In a real application, you would use
// proper testing frameworks like Jest or Vitest.