const express = require('express');
const saiditData = require('./data.json');

const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')) // this changes the cwd to the directory where index is located
app.use('/static', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.urlencoded({ extended: true })); // this is needed to parse the form data
app.use(express.json()); // this is needed to parse the form data

const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        username: 'Sk8rBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        username: 'onlysayswoof',
        comment: 'woof woof woof'       
    },
];


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

// This is the route that will display the comments page, READ
app.get('/comments', (request, response) => {
    response.render('comments/comments.ejs', { comments });
});

// This is the route that will display the form to add a new comment, CREATE
app.get('/comments/new', (request, response) => {
    response.render('comments/new.ejs');
});

// This is the route that will create a new comment, CREATE
app.post('/comments', (request, response) => {
    const { username, comment } = request.body;
    comments.push({ username, comment });
    response.redirect('/comments');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});