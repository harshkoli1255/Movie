const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
        trim: true
    },

    cast: {
        type: [String],
        required: true,
    },

    desc: {
        type: String,
        required: true,
        trim: true
    },

    img: {
        type: String,
        required: true
    },

    releaseDate: {
        type: Date,
        required: true
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },

    ratings: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                    lowercase: true
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 10
                }
            }
        ],
        default: []
    },

    comments: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true
                },
                text: {
                    type: String,
                    required: true,
                    trim: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    }

}, {
    timestamps: true
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;