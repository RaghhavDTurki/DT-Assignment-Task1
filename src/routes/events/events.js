const dbConn = require("../../db/connection");
const validateEvent = require("../../middleware/validateEvent");
const mongodb = require("mongodb");
async function getEvent(req, res) {
	try {
		if (!req.query) {
			res.status(400).send({
				message: "Query paramters are required"
			});
			return;
		}
		const db = dbConn.getDb();
		if (req.query.id) {
			const id = mongodb.ObjectId(req.query.id)
			const events = await db.collection("events").find({ _id: id }).toArray();
			if (events.length === 0) {
				res.status(404).send({
					message: "Event not found"
				});
				return;
			}
			res.status(200).send({
				data: events
			});
		}
		else if (req.query.type && req.query.limit && req.query.page) {
			const limit = parseInt(req.query.limit);
			let page = parseInt(req.query.page);
			page -= 1; // MongoDB starts from 0
			let event;
			const events = await db.collection("events");
			if (req.query.type == "latest") {
				event = await events.find({}).sort({ schedule: -1 }).skip(page * limit).limit(limit).toArray();
			}
			else {
				res.status(400).send({
					message: "Invalid type"
				});
				return;
			}
			if (event.length === 0) {
				res.status(404).send({
					message: "No events found"
				})
				return;
			}
			res.status(200).send({
				data: event
			});
		}
		else{
			res.status(400).send({
				message: "Invalid query parameters"
			});
			return;
		}
	}
	catch (err) {
		console.log(err);
		throw err;
	}
}

async function createEvent(req, res) {
	try {
		if (!req.body) {
			res.status(400).send("Body cannot be empty");
			return;
		}
		const checkBody = validateEvent(req.body);
		if (checkBody.error) {
			res.status(400).send({
				message: checkBody.message
			});
			return;
		}
		const newEvent = {
			name: req.body.name,
			tagline: req.body.tagline,
			description: req.body.description,
			schedule: req.body.schedule,
			moderator: req.body.moderator,
			category: req.body.category,
			sub_category: req.body.sub_category,
			rigor_rank: req.body.rigor_rank
		}
		const db = dbConn.getDb();
		const event = await db.collection("events").insertOne(newEvent);
		res.status(200).send({
			message: `Event created successfully with id ${event.insertedId}`,
		});
	}
	catch (err) {
		console.log(err);
		throw err;
	}
}

async function updateEvent(req, res) {
	try {
		if (!req.params || !req.params.id) {
			res.status(400).send({
				message: "EventId is required"
			});
			return;
		}

		const db = dbConn.getDb();
		const event = await db.collection("events").updateOne(
			{
				_id: mongodb.ObjectId(req.params.id)
			},
			{
				$set: req.body
			}
		);
		if (event.modifiedCount === 0) {
			res.status(404).send({
				message: "Event not found"
			});
			return;
		}
		res.status(200).send({
			message: "Event updated successfully"
		});

	}
	catch (err) {
		console.log(err);
		throw err;
	}
}

async function deleteEvent(req, res) {
	try {
		const db = dbConn.getDb();
		const events = await db.collection("events");
		if (!req.params || !req.params.id) {
			res.status(400).send({
				message: "EventId is required"
			});
			return;
		}
		const event = await events.find({ _id: mongodb.ObjectId(req.params.id) }).toArray();
		if (event.length === 0) {
			res.status(404).send({
				message: "Event not found"
			});
			return;
		}
		await events.deleteOne({ _id: mongodb.ObjectId(req.params.id) });
		res.status(200).send({
			message: "Event deleted"
		});
	}
	catch (err) {
		console.log(err);
		throw err;
	}
}

module.exports = {
	getEvent,
	createEvent,
	updateEvent,
	deleteEvent
}