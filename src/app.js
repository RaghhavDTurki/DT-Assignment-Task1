const express = require('express');
const errorHandlers = require('./middleware/errorHandlers');
const dbConn = require('./db/connection');
const router = require('./routes/router');
require('dotenv').config();

const port = process.env.PORT || 5000;
async function App() {
	await dbConn.connectToServer(function (err) {
		if (err) {
			console.error(err);
			process.exit();
		}
	});
	
	const app = express();
	app.use(express.json());
	app.use('/api/v3/app', router);
	app.use(errorHandlers.errorHandler);
	app.use(errorHandlers.notFound);
	app.listen(port, () => {
		console.log(`Listening: http://localhost:${port}`);
	});
} 

module.exports = App;