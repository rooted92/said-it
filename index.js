const express = require('express');
const saiditData = require('./data.json');

const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')) // this changes the cwd to the directory where index is located
app.use('/static', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.urlencoded({ extended: true })); // this is needed to parse the form data
app.use(express.json()); // this is needed to parse the form data


app.get('/', (request, response) => {
    console.log("home page");
    response.render('home.ejs');
});

app.get('/cats', (request, response) => {
    console.log("cats page");
    const cats = ['Blue', 'Rocket', 'Monty', 'Steph', 'Winston'];
    response.render('cats.ejs', { cats });
});

app.get('/r/:saidit', (request, response) => {
    const { saidit } = request.params;
    const data = saiditData[saidit];
    if (!data) {
        response.status(404);
        response.render('notfound.ejs', { saidit });
    } else {
        response.render('saidit.ejs', { ...data }); // spread the data object so that we can access the properties directly
    }
})

app.get('/random', (request, response) => {
    const number = Math.floor(Math.random() * 10) + 1;
    response.render('random.ejs', { randomNumber: number });
})

app.get('/tacos', (request, response) => {
    response.render('tacos.ejs');
});

app.post('/tacos', (request, response) => {
    const { meat, qty } = request.body;
    response.send(`Here are your ${qty} ${meat} tacos!`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});