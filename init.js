const mongoose = require('mongoose');
const Movie = require('./models/movieSchema');
const connectDB = require('./config/mongodb');
// main().then(() => {
//     console.log("Connection Successfull");
// }).catch((err) => {
//     console.log(err);
// })

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/movie");
// }

// connectDB();

const movies = [
{
    movieName: "Avengers Endgame",
    releaseDate: new Date("2019-04-26"),
    cast: ["Robert Downey Jr.", "Chris Evans"],
    desc: "After the devastating snap by Thanos, the remaining Avengers unite for a final, high-stakes mission to reverse the destruction and restore balance to the universe in an epic conclusion to over a decade of storytelling.",
    img: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    rating: 8.6
},

{
    movieName: "Inception",
    releaseDate: new Date("2010-07-16"),
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    desc: "A skilled thief who specializes in stealing secrets from deep within dreams is given a rare chance at redemption if he can successfully perform inception—planting an idea into someone’s subconscious mind.",
    img: "https://image.tmdb.org/t/p/w1280/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    rating: 8.8
},

{
    movieName: "The Dark Knight",
    releaseDate: new Date("2008-07-18"),
    cast: ["Christian Bale", "Heath Ledger"],
    desc: "Batman faces his greatest psychological and physical challenge as the Joker unleashes chaos upon Gotham, pushing the hero to his limits and redefining the line between justice and vengeance.",
    img: "https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0
},

{
    movieName: "Interstellar",
    releaseDate: new Date("2014-11-07"),
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    desc: "A group of explorers embark on a daring journey through a wormhole in space, seeking a new habitable planet as Earth faces environmental collapse, blending science, emotion, and survival.",
    img: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    rating: 8.6
},

{
    movieName: "Joker",
    releaseDate: new Date("2019-10-04"),
    cast: ["Joaquin Phoenix"],
    desc: "A deeply troubled man struggling with mental illness and societal rejection gradually descends into madness, transforming into the infamous Joker in this dark and character-driven origin story.",
    img: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
    rating: 8.5
},

{
    movieName: "Titanic",
    releaseDate: new Date("1997-12-19"),
    cast: ["Leonardo DiCaprio", "Kate Winslet"],
    desc: "A timeless romantic tragedy set aboard the ill-fated Titanic, where two lovers from different social classes fall deeply in love as disaster strikes on its maiden voyage.",
    img: "https://image.tmdb.org/t/p/w1280/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    rating: 7.9
},

{
    movieName: "Avatar",
    releaseDate: new Date("2009-12-18"),
    cast: ["Sam Worthington", "Zoe Saldana"],
    desc: "A paraplegic marine is sent to the alien world of Pandora, where he becomes torn between following orders and protecting a vibrant ecosystem and its indigenous people.",
    img: "https://image.tmdb.org/t/p/w1280/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg",
    rating: 7.8
},

{
    movieName: "Gladiator",
    releaseDate: new Date("2000-05-05"),
    cast: ["Russell Crowe"],
    desc: "A betrayed Roman general is forced into slavery and rises through the ranks of gladiators, seeking revenge against the corrupt emperor who murdered his family.",
    img: "https://image.tmdb.org/t/p/w1280/wN2xWp1eIwCKOD0BHTcErTBv1Uq.jpg",
    rating: 8.5
},

{
    movieName: "Forrest Gump",
    releaseDate: new Date("1994-07-06"),
    cast: ["Tom Hanks"],
    desc: "The extraordinary life journey of a kind-hearted man with a low IQ, whose innocence and optimism lead him to witness and influence key historical moments in America.",
    img: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    rating: 8.8
},

{
    movieName: "Spider-Man: No Way Home",
    releaseDate: new Date("2021-12-17"),
    cast: ["Tom Holland", "Zendaya"],
    desc: "When Spider-Man’s identity is revealed, he seeks help from Doctor Strange, triggering multiverse chaos that brings villains from alternate realities into his world.",
    img: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    rating: 8.2
},

{
    movieName: "Doctor Strange",
    releaseDate: new Date("2016-11-04"),
    cast: ["Benedict Cumberbatch"],
    desc: "After a career-ending accident, a brilliant surgeon discovers the mystic arts and learns to protect the world from interdimensional threats.",
    img: "https://image.tmdb.org/t/p/w1280/xf8PbyQcR5ucXErmZNzdKR0s8ya.jpg",
    rating: 7.9
},

{
    movieName: "Iron Man",
    releaseDate: new Date("2008-05-02"),
    cast: ["Robert Downey Jr."],
    desc: "A genius billionaire industrialist builds a powerful armored suit to escape captivity and later uses it to fight evil, becoming the iconic superhero Iron Man.",
    img: "https://image.tmdb.org/t/p/w1280/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    rating: 7.9
},

{
    movieName: "Black Panther",
    releaseDate: new Date("2018-02-16"),
    cast: ["Chadwick Boseman"],
    desc: "T’Challa returns to Wakanda to take his rightful place as king but faces challenges from a powerful enemy with a hidden past tied to his nation.",
    img: "https://upload.wikimedia.org/wikipedia/en/d/d6/Black_Panther_%28film%29_poster.jpg",
    rating: 7.8
},

{
    movieName: "Thor: Ragnarok",
    releaseDate: new Date("2017-11-03"),
    cast: ["Chris Hemsworth"],
    desc: "Thor must escape imprisonment on an alien planet and race against time to stop the destruction of Asgard at the hands of the powerful Hela.",
    img: "https://upload.wikimedia.org/wikipedia/en/7/7d/Thor_Ragnarok_poster.jpg",
    rating: 8.0
},

{
    movieName: "The Matrix",
    releaseDate: new Date("1999-03-31"),
    cast: ["Keanu Reeves"],
    desc: "A computer hacker discovers that reality as he knows it is a simulation controlled by machines, and joins a rebellion to free humanity.",
    img: "https://image.tmdb.org/t/p/w1280/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg",
    rating: 8.7
},

{
    movieName: "Fight Club",
    releaseDate: new Date("1999-10-15"),
    cast: ["Brad Pitt"],
    desc: "An insomniac office worker forms an underground fight club with a charismatic soap maker, leading to a radical anti-consumerist movement.",
    img: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
    rating: 8.8
},

{
    movieName: "The Shawshank Redemption",
    releaseDate: new Date("1994-09-23"),
    cast: ["Tim Robbins"],
    desc: "A wrongly imprisoned banker builds a meaningful friendship and finds hope while enduring decades inside Shawshank prison.",
    img: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    rating: 9.3
},

{
    movieName: "The Godfather",
    releaseDate: new Date("1972-03-24"),
    cast: ["Marlon Brando"],
    desc: "The aging patriarch of a powerful crime family transfers control of his empire to his reluctant son, leading to a transformation into a ruthless leader.",
    img: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    rating: 9.2
},

{
    movieName: "Pulp Fiction",
    releaseDate: new Date("1994-10-14"),
    cast: ["John Travolta"],
    desc: "A series of interconnected stories involving crime, violence, and redemption unfold in a nonlinear narrative set in Los Angeles.",
    img: "https://image.tmdb.org/t/p/w1280/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    rating: 8.9
},

{
    movieName: "Dune",
    releaseDate: new Date("2021-10-22"),
    cast: ["Timothée Chalamet"],
    desc: "A young nobleman must navigate political intrigue and war on a desert planet that holds the universe’s most valuable resource.",
    img: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
    rating: 8.1
}
];


function insertTheMovie() {
    Movie.insertMany(movies).then((res) => {
        console.log("Data inserted Successfully");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = {insertTheMovie, movies};