const mongoose = require('mongoose');

// connectDB().then(() => {
//     console.log("Connection Successfull");
// }).catch((err) => {
//     console.log(err);
// })

async function connectDB() {
    // await mongoose.connect("mongodb://127.0.0.1:27017/movie");
    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/movie`)
}


module.exports = connectDB;