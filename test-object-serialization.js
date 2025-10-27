// Test script to verify object serialization with ID
const fabric = require('fabric').fabric;

// Create a simple rectangle object
const rect = new fabric.Rect({
  left: 100,
  top: 100,
  width: 50,
  height: 50,
  fill: 'red',
  stroke: '#000000',
  strokeWidth: 2
});

// Assign an ID to the object
rect.id = 'test-object-id-123';

console.log('Object with ID:', rect.id);
console.log('Object keys before toJSON:', Object.keys(rect));

// Serialize the object with ID included
const serialized = rect.toJSON(['id']);
console.log('Serialized object:', serialized);
console.log('Serialized object keys:', Object.keys(serialized));
console.log('Serialized object ID:', serialized.id);

// Check if ID is preserved
if (serialized.id) {
  console.log('SUCCESS: ID is preserved in serialization');
} else {
  console.log('ERROR: ID is NOT preserved in serialization');
}