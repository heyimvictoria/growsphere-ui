const express = require('express');
const app = express();

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin',
'https://localhost:3000');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.header('Access-Control-Allow-Credentials', true);
if (req.method === 'OPTIONS') {
    res.sendStatus(200);
} else { next();
} 
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});