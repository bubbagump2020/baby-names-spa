const { Pool } = require('pg')

const pool = new Pool({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = async (event, context) => {
    console.log(event)
    const path = event.headers.referer.split('/').pop()
    let searchResponse = null
    let listResponse = null
 
    try{
        const listQuery = `SELECT id FROM lists WHERE unique_id='${path}'`;
        const listClient = await pool.connect()
        try {
            listResponse = await listClient.query(listQuery)
            listResponse = parseInt(listResponse.rows[0].id)
        } finally {
            listClient.release()
        }
        const searchQuery = `SELECT id, baby_name, enabled FROM babies WHERE list_id=${listResponse}`
        const client = await pool.connect()
        try{
            searchResponse = await client.query(searchQuery)
 
        } finally{
            client.release()
        }
        console.log(searchResponse.rows)
        return{
            statusCode: 200,
            body: JSON.stringify(searchResponse.rows)
        }
    } catch(err){
        console.log(err)
        return{
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}