const express = require("express");

const router = express.Router();

router.route("/")
	.get((req, res) => { res.json({ msg: "response to '/' GET" }) })
	.post((req, res) => { res.json({ msg: "response to '/' POST" }) });

router.route("/:id")
	.get((req, res) => { res.json({ msg: "response to '/:id' GET" }) })
	.delete((req, res) => { res.json({ msg: "response to '/:id' DELETE" }) })
	.patch((req, res) => { res.json({ msg: "response to '/:id' PATCH" }) });

module.exports = router;