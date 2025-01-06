const express = require('express');
const saiditData = require('./data.json');

const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')) // this changes the cwd to the directory where index is located
app.use('/static', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.urlencoded({ extended: true })); // this is needed to parse the form data
app.use(express.json()); // this is needed to parse the form data
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8rBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
    {
        id: uuid(),
        username: 'Alice',
        comment: 'This is a great post!'
    },
    {
        id: uuid(),
        username: 'Bob',
        comment: 'I totally agree with Alice.'
    },
    {
        id: uuid(),
        username: 'Charlie',
        comment: 'Interesting perspective.'
    },
    {
        id: uuid(),
        username: 'Dave',
        comment: 'Thanks for sharing!'
    },
    {
        id: uuid(),
        username: 'Eve',
        comment: 'I learned something new today.'
    },
    {
        id: uuid(),
        username: 'Frank',
        comment: 'Can you elaborate more on this topic?'
    },
    {
        id: uuid(),
        username: 'Grace',
        comment: 'I have a different opinion.'
    },
    {
        id: uuid(),
        username: 'Heidi',
        comment: 'Well written!'
    },
    {
        id: uuid(),
        username: 'Ivan',
        comment: 'I found this very helpful.'
    },
    {
        id: uuid(),
        username: 'Judy',
        comment: 'Looking forward to more posts like this.'
    }
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
    comments.push({ id: uuid(), username, comment });
    response.redirect('/comments');
});

// This route will display a specific comment, READ
app.get('/comments/:id', (request, response) => {
    const { id } = request.params;
    const comment = comments.find(c => c.id === id);
    response.render('comments/show.ejs', { comment });
});

app.get('/comments/:id/edit', (request, response) => {
    const { id } = request.params;
    const comment = comments.find(c => c.id === id);
    response.render('comments/edit.ejs', { comment });
});

app.patch('/comments/:id', (request, response) => {
    const { id } = request.params;
    const newCommentText = request.body.comment;
    console.log(newCommentText);
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    console.log(foundComment);
    response.redirect('/comments');
});

app.delete('/comments/:id', (request, response) => {
    const { id } = request.params;
    comments = comments.filter(c => c.id !== id);
    response.redirect('/comments');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});