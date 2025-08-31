const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:1000/api/admin';

// Test admin credentials (you should replace these with actual test credentials)
const testAdmin = {
    adminID: 'admin001', // Replace with actual admin ID
    password: 'adminpass123' // Replace with actual admin password
};

async function testAdminJWTAuth() {
    console.log('🧪 Testing Admin JWT Authentication...\n');

    try {
        // Test 1: Admin Login
        console.log('1️⃣ Testing Admin Login...');
        const loginResponse = await axios.post(`${BASE_URL}/login`, testAdmin);

        if (loginResponse.status === 200 && loginResponse.data.token) {
            console.log('✅ Admin login successful!');
            console.log('📋 Response:', {
                message: loginResponse.data.message,
                adminID: loginResponse.data.adminID,
                token: loginResponse.data.token.substring(0, 20) + '...', // Show partial token
                expiresIn: loginResponse.data.expiresIn
            });

            const token = loginResponse.data.token;

            // Test 2: Access protected route with valid token
            console.log('\n2️⃣ Testing Protected Route Access...');
            try {
                const protectedResponse = await axios.post(`${BASE_URL}/students/add-student`, {
                    studentID: 'test001',
                    firstName: 'Test',
                    lastName: 'Student',
                    fathersName: 'Test Father',
                    mothersName: 'Test Mother',
                    Address: 'Test Address',
                    grade: '10',
                    email: 'test@example.com',
                    password: 'testpass123'
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('✅ Protected route access successful!');
                console.log('📋 Response:', protectedResponse.data);

            } catch (error) {
                console.log('❌ Protected route access failed:');
                console.log('📋 Error:', error.response?.data || error.message);
            }

            // Test 3: Access protected route with invalid token
            console.log('\n3️⃣ Testing Invalid Token...');
            try {
                await axios.post(`${BASE_URL}/students/add-student`, {
                    studentID: 'test002',
                    firstName: 'Test2',
                    lastName: 'Student2',
                    fathersName: 'Test Father2',
                    mothersName: 'Test Mother2',
                    Address: 'Test Address2',
                    grade: '11',
                    email: 'test2@example.com',
                    password: 'testpass123'
                }, {
                    headers: {
                        'Authorization': 'Bearer invalid-token',
                        'Content-Type': 'application/json'
                    }
                });

                console.log('❌ Invalid token test failed - should have been rejected');

            } catch (error) {
                if (error.response?.status === 401) {
                    console.log('✅ Invalid token correctly rejected!');
                    console.log('📋 Error:', error.response.data);
                } else {
                    console.log('❌ Unexpected error with invalid token:');
                    console.log('📋 Error:', error.response?.data || error.message);
                }
            }

            // Test 4: Admin Logout
            console.log('\n4️⃣ Testing Admin Logout...');
            try {
                const logoutResponse = await axios.post(`${BASE_URL}/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('✅ Admin logout successful!');
                console.log('📋 Response:', logoutResponse.data);

            } catch (error) {
                console.log('❌ Admin logout failed:');
                console.log('📋 Error:', error.response?.data || error.message);
            }

        } else {
            console.log('❌ Admin login failed:');
            console.log('📋 Response:', loginResponse.data);
        }

    } catch (error) {
        console.log('❌ Admin login request failed:');
        console.log('📋 Error:', error.response?.data || error.message);
    }

    console.log('\n🎉 Admin JWT Authentication Test Complete!');
}

// Run the test
testAdminJWTAuth().catch(console.error);