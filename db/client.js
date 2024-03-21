const { Client } = require("pg")
require("dotenv").config()

let DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:5432/luigis_pizzeria"

// console.log(DATABASE_URL)
const client = new Client({ connectionString: DATABASE_URL, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined, })

// const client = new Client("postgres://localhost:5432/luigis_pizzeria" )


module.exports = client