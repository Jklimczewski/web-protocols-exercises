const {MongoClient} = require("mongodb");
const Db = process.env.MONGO_URI;
console.log(Db);
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
            dbConnection = db.db("rest_api");
            console.log("Successfully connected to MongoDB.");
            return callback();
        });
    },
    getDb: function() {
        return dbConnection;
    },
};