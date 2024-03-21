const client = require("./client")
const {createCustomer} = require("./")

async function dropTables(){
    try{
        await client.query("drop table if exists orders")
        await client.query("drop table if exists customers")
    }catch(error){
        console.log("oh nose, failed dropping tables!", error)
        throw error
    }
}

async function createTables(){
    try{
        await client.query(`
        create table customers (
            id serial primary key,
            username varchar(255),
            password varchar(255)
        )
        `)
        await client.query(`
        create table orders (
            id serial primary key,
            item varchar(255),
            quantity integer,
            customerid integer references customers(id)
        )
        `)
    }catch(error){
        console.log("oh nose! Couldn't create tables", error)
        throw error
    }
}

async function createInitialData(){
    try{
        await createCustomer({
            username: "ana1s",
            password: "pass123"
        })
        await createCustomer({
            username: "Mark",
            password: "passabc"
        })

    } catch(error){
        console.log("oh nose! Couldn't create data", error)
        throw error
    }
}

// call the function!!
async function rebuild() {
    try{
        client.connect()
        await dropTables()
        await createTables()
        await createInitialData()
    }catch(error){
        console.log("oh nose! failed rebuilding database")
    }
}

rebuild().finally(()=>client.end())