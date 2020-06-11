const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const User = require ('./models/user');
const Movies = require ('./models/movies');
mongoose.connect(`${process.env.databaseURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({extended: false})); //take everyhting as a string
app.use(bodyParser.json()); // get it as json format
app.use(express.static(path.join(__dirname, 'public'))); //style.css
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))
app.set('view engine', '.hbs');
app.get ('/', async (req, res) => {
    res.render('index');
});
app.get ('/movies', async (req, res) => {
    res.render('movies');
});
app.post('/', async (req,res)=> {
    let { name, email, password} = req.body;
    const user = new User ({
        name,
        email,
        password
    })
    await user.save();
    res.redirect('/');
})
app.post('/movies', async (req, res) => {
    let { movieName, actor, releaseDate, rating, stream } = req.body;
    const movies = new Movies({
    movieName,
    actor,
    releaseDate,
    rating,
    stream
    })
    await movies.save();
    res.redirect('movies');
})
app.listen(3005, () => {
    console.log('I am listening on 3005');
})