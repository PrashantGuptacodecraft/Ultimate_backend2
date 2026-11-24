const mongo =require('mongodb');
const MongoClient = mongo.MongoClient;
const MONGO_URL = 'mongodb+srv://w47223812_db_user:GLDbEla2eVqO5QxQ@cluster0.9b7ukuc.mongodb.net/';

const mongoConnect = (callback)=>{

MongoClient.connect(MONGO_URL).then((client) => {
    console.log('Connected to MongoDB');
    return client;

}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
})
}
module.exports = mongoConnect;