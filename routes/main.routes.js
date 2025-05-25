const router = require("express").Router();
const mainController = require("../controllers/main.controller");

router.get("/search", mainController.searchRecord);

module.exports = router;