var express = require("express");
var router = express.Router();
var pool = require("./database");

//get all messages
router.get("/", function (req, res, next) {

	pool.query("SELECT * FROM messages ORDER BY timestamp desc", function (
		err,
		result
	) {
		if (err) throw err;
		res.send(result);
	});
});


//create a new message
router.post("/", function (req, res, next) {

	var text = req.body.text;
	var timestamp = new Date();

	pool.query(
		"INSERT INTO messages (text, timestamp) VALUES (?, ?)",
		[text, timestamp],
		function (err, result) {
			if (err) throw err;
			res.send(result);
		}
	);
});

//Delete a photo
router.delete("/:message_id", function (req, res, next) {

	var message_id = req.params.message_id;

	pool.query("DELETE FROM messages WHERE message_id=?", message_id, function (
		err,
		result
	) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: "Unknown Error",
			});
		}
		res.send(result);
	});
});

module.exports = router;
