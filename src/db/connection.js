const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://raghhav:raghhav10@cluster0.r7swz7v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);

let dbConnection;

function connectToServer(callback) {
	try{
		client.connect(function (err, db) {
			if (err || !db) {
				return callback(err);
			}
	
			dbConnection = db.db("sample_airbnb");
			console.log("Successfully connected to MongoDB.");
	
			return callback();
		});
	}
	catch(err){
		console.log(err);
		throw err;
	}
}
function getDb() {
	try{
		return dbConnection;
	}
	catch(err){
		console.log(err);
		throw err;
	}
}

module.exports = {
	  connectToServer,
	  getDb
}