const express = require('express');

const app = express();

// app.use((req, res) => {
//     console.log('Hello World');
//     console.dir(req);
//     res.send('<h1>Hello World</h1>');
// });

app.get('/', (req, res) => {
    console.log('GET request to /');
    res.send('<h1>Hello World</h1>');
});

app.get('/cats', (req, res) => {
    console.log('GET request to /cats');
    res.send('Meow');
});

app.get('/dogs', (req, res) => {
    console.log('GET request to /dogs');
    res.send('Woof');
});

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});