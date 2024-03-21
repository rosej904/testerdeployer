const express = require("express")
const apiRouter = express.Router()

apiRouter.use("/customers", require("./customers"))
module.exports = apiRouter