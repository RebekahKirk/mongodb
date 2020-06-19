const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/user');
const Movies = require('./models/movies');
mongoose.connect(`${process.env.databaseURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: false })); //take everything as a string
app.use(bodyParser.json()); // get it as json format
app.use(express.static(path.join(__dirname, 'public'))); //style.css
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));
app.set('view engine', '.hbs');
app.get('/', async (req, res) => {
    res.render('index');
});
app.post('/', async (req, res) => {
    let { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password
    })
    await user.save();
    res.redirect('/');
});
app.get('/movies', async (req, res) => {
    let data = await Movies.find({});
    let allMovies = data.map((data) => data.toObject());
    res.render('movies', {allMovies});
});
app.post('/movies', async (req, res) => {
    let { movieName, actor, releaseDate, rating, stream } = req.body;
    const movie = new Movies({
        movieName,
        actor,
        releaseDate,
        rating,
        stream
    })
    await movie.save();
    res.redirect('movies')
});
app.get('/search', async(req, res) => {
    res.render('search')
});
app.post('/search', async (req, res) => {
   let {movieName} = req.body;
   let existingMovie = await Movies.findOne({ movieName })
   console.log(existingMovie);
   data = {
       movieName: existingMovie.movieName,
       actor: existingMovie.actor,
       releaseDate: existingMovie.releaseDate,
   }
   res.render('search', {data})
});
app.listen( 3005, () => {
    console.log('I am listening on 3005');
});