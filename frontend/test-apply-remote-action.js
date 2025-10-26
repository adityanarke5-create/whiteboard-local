// Test script to verify applyRemoteAction function
const fs = require('fs');

// Simulate the data structure that would be received from WebSocket
const testData = {
  action: {
    type: 'add',
    object: {
      type: 'rect',
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      fill: 'red',
      stroke: '#000000',
      strokeWidth: 2
    }
  },
  userId: 'test-user'
};

console.log('Test data:', JSON.stringify(testData, null, 2));

// This would be called in the applyRemoteAction function
console.log('Simulating enlivenObjects call...');

// Mock the enlivenObjects function to see what it would do
const mockEnlivenObjects = (objects, callback, reviver, errorCb) => {
  console.log('enlivenObjects called with:', objects);
  
  // Simulate successful enlivening
  try {
    // In a real scenario, this would convert the JSON to actual Fabric objects
    const enlivenedObjects = objects.map(obj => {
      // This is a simplified simulation
      return {
        ...obj,
        id: obj.id || 'generated-id',
        remoteAction: true
      };
    });
    
    console.log('enlivenObjects success, calling callback with:', enlivenedObjects);
    callback(enlivenedObjects);
  } catch (error) {
    console.error('enlivenObjects error, calling error callback with:', error);
    if (errorCb) {
      errorCb(error);
    }
  }
};

// Test the enlivenObjects function
mockEnlivenObjects([testData.action.object], (enlivenedObjects) => {
  console.log('Callback received enlivened objects:', enlivenedObjects);
  
  enlivenedObjects.forEach((obj, index) => {
    console.log(`Processing object ${index}:`, {
      objectType: obj.type,
      hasID: !!obj.id,
      object: obj
    });
    
    // This is what would happen in the actual applyRemoteAction function
    console.log(`Would add object to canvas and render`);
  });
  
  console.log('All objects processed and canvas rendered');
}, null, (error) => {
  console.error('Error callback called:', error);
});