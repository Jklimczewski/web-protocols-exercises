const {MongoClient} = require("mongodb");
const Db = "mongodb+srv://" + process.env.CREDENTIALS + process.env.MONGO_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function (err, db) {
            if (err || !db) {
              return callback(err);
            }
            dbConnection = db.db("project");
            console.log("Successfully connected to MongoDB.");
            return callback();
        });
    },
    getDb: function() {
        return dbConnection;
    },
};