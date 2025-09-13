const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// মূল রাউট: হোম পেজ বা মূল URL এ দেখানোর জন্য
app.get('/', (req, res) => {
    res.send('স্বাগতম! আপনার NID যাচাই API চালু হয়েছে। /verify এ POST রিকোয়েস্ট পাঠান।');
});

// mock database data
const mockDatabase = {
    "1234567890": {
        name: "জন ডো",
        dob: "1990-01-01",
        nid: "1234567890"
    },
    "0987654321": {
        name: "জেনা স্মিথ",
        dob: "1985-05-15",
        nid: "0987654321"
    }
};

// API endpoint: /verify
app.post('/verify', (req, res) => {
    const { nid, dob } = req.body;

    if (!nid || !dob) {
        return res.status(400).json({ message: 'NID এবং জন্ম তারিখ প্রয়োজন' });
    }

    const userData = mockDatabase[nid];

    if (userData && userData.dob === dob) {
        res.json({
            success: true,
            message: 'তথ্য নিশ্চিত করা হয়েছে',
            data: userData
        });
    } else {
        res.json({
            success: false,
            message: 'তথ্য মিলছে না। দয়া করে আবার চেষ্টা করুন।'
        });
    }
});

app.listen(PORT, () => {
    console.log(`API চলছে http://localhost:${PORT}`);
});