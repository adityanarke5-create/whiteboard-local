// Test script to verify Fabric.js enlivenObjects function
// This would normally run in a browser environment, but we can test the concept here

// Mock the browser environment
global.window = {
  fabric: {
    util: {
      enlivenObjects: (objects, callback, reviver, errorCb) => {
        console.log('[Mock Fabric] enlivenObjects called with:', objects);
        
        // Simulate the actual Fabric.js behavior
        try {
          // In a real browser environment, this would convert JSON to actual Fabric objects
          const enlivenedObjects = objects.map(obj => {
            // Create a mock Fabric object
            return {
              type: obj.type,
              left: obj.left,
              top: obj.top,
              width: obj.width,
              height: obj.height,
              fill: obj.fill,
              stroke: obj.stroke,
              strokeWidth: obj.strokeWidth,
              id: obj.id || 'generated-id',
              remoteAction: true,
              set: function(props) {
                Object.assign(this, props);
              }
            };
          });
          
          console.log('[Mock Fabric] enlivenObjects success');
          callback(enlivenedObjects);
        } catch (error) {
          console.error('[Mock Fabric] enlivenObjects error:', error);
          if (errorCb) {
            errorCb(error);
          }
        }
      }
    },
    Rect: function(props) {
      this.type = 'rect';
      Object.assign(this, props);
    },
    Circle: function(props) {
      this.type = 'circle';
      Object.assign(this, props);
    }
  }
};

// Test data
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

// Simulate the applyRemoteAction function
const applyRemoteAction = (data) => {
  const { action, userId: actionUserId } = data;
  console.log('[Test] Applying remote action:', { action, actionUserId });
  
  // Mock canvas
  const canvas = {
    add: function(obj) {
      console.log('[Test] Adding object to canvas:', obj.type, obj.id);
    },
    renderAll: function() {
      console.log('[Test] Rendering canvas');
    }
  };
  
  switch (action.type) {
    case 'add':
      console.log('[Test] Processing add action');
      // Use enlivenObjects to properly deserialize Fabric objects
      window.fabric.util.enlivenObjects([action.object], (enlivenedObjects) => {
        console.log('[Test] Enlivened objects callback called');
        enlivenedObjects.forEach((obj) => {
          console.log('[Test] Processing enlivened object:', {
            objectType: obj.type,
            hasID: !!obj.id
          });
          // Ensure the object has a proper ID
          if (!obj.id && action.object.id) {
            obj.id = action.object.id;
          }
          // Mark as remote action to avoid infinite loop
          obj.remoteAction = true;
          canvas.add(obj);
        });
        canvas.renderAll();
        console.log('[Test] Remote add action applied');
      }, null, (error) => {
        console.error('[Test] Error enlivening objects:', error);
        // Fallback: try to create the object directly
        try {
          const objClass = window.fabric[action.object.type];
          if (objClass) {
            const obj = new objClass(action.object);
            obj.remoteAction = true;
            canvas.add(obj);
            canvas.renderAll();
            console.log('[Test] Remote add action applied (fallback method)');
          } else {
            console.error('[Test] Unknown object type:', action.object.type);
          }
        } catch (fallbackError) {
          console.error('[Test] Error creating object with fallback method:', fallbackError);
        }
      });
      break;
      
    default:
      console.warn('[Test] Unknown action type', { type: action.type });
  }
};

// Run the test
applyRemoteAction(testData);