const client = require("./client")
const bcrypt = require("bcrypt")
const salt_count = 10

async function getAllCustomers(){
    try{
        const {rows} = await client.query("select * from customers")
        return rows
    }catch(error){
        console.log("oh nose!", error)
        throw error
    }
}

async function getCustomerByUsername(username){
    try{
        const {rows} = await client.query(`
        select * from customers where username = $1
        `,[username])
        return rows
    }catch(error){
        console.log("oh nose!", error)
        throw error
    }
}

async function createCustomer({username,password}){
    try{
        let hashedPassword = await bcrypt.hash(password, salt_count)
        await client.query(`
            insert into customers(username, password)
            values ($1, $2)
        `,[username, hashedPassword])
    } catch(error){
        console.log("oh nose", error)
        throw error
    }
}

module.exports = {
    getAllCustomers,
    createCustomer,
    getCustomerByUsername
}