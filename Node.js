const axios = require('axios');

async function testAPI() {
    const response = await axios.post('http://localhost:3000/verify', {
        nid: "1234567890",
        dob: "1990-01-01"
    });
    console.log(response.data);
}

testAPI();
