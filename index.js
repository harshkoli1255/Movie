const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Movie = require("./models/movieSchema");
const connectDB = require('./config/mongodb');
const {movies, insertTheMovie} = require('./init');
require('dotenv').config();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")))

// main().then(() => {
//     console.log("Connection Successfull");
// }).catch((err) => {
//     console.log(err);
// })

// async function main() {
//     // await mongoose.connect("mongodb://127.0.0.1:27017/movie");
//     mongoose.connection.on('connected', () => {
//         console.log("DB Connected");
//     })
// }


connectDB();
app.get("/movies/:movieID", async (req, res) => {
    const {q: query} = req.query;
    const {movieID} = req.params;
    const movie = await Movie.findById(movieID)
    res.render('movieDetails', {movie, query});
})

app.post("/comment", (req, res) => {
    const {uName, uComment, movieID} = req.body;
    Movie.findByIdAndUpdate(movieID, {$addToSet: {
        comments: {
            name : uName,
            text: uComment,
        }
    }})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/rateMovie", async (req, res) => {
    const { movieID, movieRating, userName } = req.body;
    try {
        await Movie.findByIdAndUpdate(movieID, {
            $addToSet: {
                ratings: {
                    name: userName,
                    rating: Number(movieRating)
                }
            }
        });
        const movie = await Movie.findById(movieID);

        const total = movie.ratings.reduce((sum, r) => sum + r.rating, 0);
        const avg = (total / movie.ratings.length).toFixed(1);

        const updated = await Movie.findByIdAndUpdate(
            movieID,
            { rating: avg },
            { returnDocument: 'after' }
        );
        res.send(updated);

    } catch (err) {
        console.log(err);
        res.send("Error");
    }
});

app.post("/delete", async (req, res) => {
    const {currMovie} = req.body;
    Movie.findByIdAndDelete(currMovie).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/movies/update/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.render('updateMovie', { movie });
});

app.get("/addmovie", async(req, res) => {
    res.render("addmovie");
    console.log(req.body);
})

app.post("/addmovie", async(req, res) => {
    let movie = req.body;
    movie.cast = movie.cast.split(",").map((value) => value.trim());
    let newMovie = Movie.insertOne(movie).then((response) => {
        // console.log(response);
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    })
})

app.post("/updatemovie", async (req, res) => {
    let { movieId, movieName, releaseDate, cast, img, desc } = req.body;

    movieId = movieId.trim();
    movieName = movieName.trim();
    img = img.trim();
    desc = desc.trim();
    cast = cast.split(',').map(v => v.trim());
    releaseDate = new Date(releaseDate);
    
    await Movie.findByIdAndUpdate(movieId,
        {
            movieName,
            releaseDate,
            cast,
            img,
            desc
        }
    );
    
    return res.redirect("/");
});

app.get("/", async (req, res) => {
    let {q: query, topRated, page} = req.query;
    let movies;

    if(topRated) {
        movies = await Movie.find({rating: {$gte: 8}});
    }
    
    else if(typeof query === "string") {
        movies = await Movie.find({movieName: {$regex: query, $options: "i"}});
    }
    else if(query == undefined){
        movies = await Movie.find();
        if(movies.length == 0) {
            insertTheMovie();
        }
    }

    let subMovies = [];
    let temp = [];
    const batch = 4;
    let i;
    for(i = 0; i < movies.length; i++) {
        if(temp.length === batch) {
            subMovies.push(temp);
            temp = [];
        }
        temp.push(movies[i]);
    }

    while( i < movies.length) {
        temp.push(movies[i]);
    }
    subMovies.push(temp);
    temp = [];
    page = parseInt(page) || 1;
    
    movies = subMovies[page-1];

    res.render("index", {movies, query, subMovies, page, topRated});
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening at http://localhost:${port}/`);
});
