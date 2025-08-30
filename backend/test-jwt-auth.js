const axios = require('axios');

const BASE_URL = 'http://localhost:1000/api/students';

// Test credentials
const testCredentials = {
    studentID: 'test123',
    password: 'testpassword'
};

let authToken = null;

async function testLogin() {
    try {
        console.log('Testing login...');
        const response = await axios.post(`${BASE_URL}/login`, testCredentials);
        
        if (response.data.token) {
            authToken = response.data.token;
            console.log('✅ Login successful!');
            console.log('Token:', authToken);
            console.log('Response:', response.data);
            return true;
        } else {
            console.log('❌ Login failed - no token received');
            return false;
        }
    } catch (error) {
        console.log('❌ Login failed:', error.response?.data || error.message);
        return false;
    }
}

async function testProtectedRoute() {
    if (!authToken) {
        console.log('❌ No token available, skipping protected route test');
        return;
    }

    try {
        console.log('\nTesting protected route (profile)...');
        const response = await axios.get(`${BASE_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        console.log('✅ Protected route access successful!');
        console.log('Response:', response.data);
    } catch (error) {
        console.log('❌ Protected route access failed:', error.response?.data || error.message);
    }
}

async function testInvalidToken() {
    try {
        console.log('\nTesting with invalid token...');
        const response = await axios.get(`${BASE_URL}/profile`, {
            headers: {
                'Authorization': 'Bearer invalid-token-here'
            }
        });
        
        console.log('❌ Invalid token test failed - should have been rejected');
    } catch (error) {
        console.log('✅ Invalid token correctly rejected:', error.response?.data);
    }
}

async function testNoToken() {
    try {
        console.log('\nTesting without token...');
        const response = await axios.get(`${BASE_URL}/profile`);
        
        console.log('❌ No token test failed - should have been rejected');
    } catch (error) {
        console.log('✅ No token correctly rejected:', error.response?.data);
    }
}

async function testLogout() {
    try {
        console.log('\nTesting logout...');
        const response = await axios.post(`${BASE_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        console.log('✅ Logout successful!');
        console.log('Response:', response.data);
    } catch (error) {
        console.log('❌ Logout failed:', error.response?.data || error.message);
    }
}

// Run all tests
async function runTests() {
    console.log('Starting JWT Authentication Tests...\n');
    
    // Test login
    const loginSuccess = await testLogin();
    
    if (loginSuccess) {
        // Test protected routes
        await testProtectedRoute();
        
        // Test invalid scenarios
        await testInvalidToken();
        await testNoToken();
        
        // Test logout
        await testLogout();
    }
    
    console.log('\nTests completed!');
}

// Check if axios is installed
try {
    require.resolve('axios');
    runTests();
} catch (e) {
    console.log('Please install axios first: bun add axios');
    console.log('Then run: node test-jwt-auth.js');
}