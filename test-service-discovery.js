const axios = require('axios');

async function testServiceDiscovery() {
  try {
    console.log('Testing Service Discovery...\n');

    // Wait for services to start
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Test discovery endpoints
    const response = await axios.get(
      'http://localhost:5000/api/discovery/services'
    );
    console.log('Registered Services:', JSON.stringify(response.data, null, 2));

    // Test health endpoint
    const healthResponse = await axios.get(
      'http://localhost:5000/api/discovery/services/health'
    );
    console.log(
      '\nService Health:',
      JSON.stringify(healthResponse.data, null, 2)
    );

    // Test product service through discovery
    const productsResponse = await axios.get(
      'http://localhost:5000/api/products'
    );
    console.log(
      '\nProducts (via discovery):',
      productsResponse.data.length,
      'products found'
    );
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testServiceDiscovery();
