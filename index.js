const express = require('express');

const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')) // this changes the cwd to the directory where index is located

app.get('/', (request, response) => {
    console.log("home page");
    response.render('home.ejs');
});

app.get('/random', (request, response) => {
    const number = Math.floor(Math.random() * 10) + 1;
    response.render('random.ejs', { randomNumber: number });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});