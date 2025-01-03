const express = require('express');

const app = express();

app.use((req, res) => {
    console.log('Hello World');
    console.dir(req);
    res.send('<h1>Hello World</h1>');
})

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});