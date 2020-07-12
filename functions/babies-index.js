const { Pool } = require('pg')
const pool = new Pool({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = async (event, context) => {
    const path = event.headers.referer.split('/').pop()
    let searchResponse = []
    let listResponse = null
 
    try{
        const listQuery = `SELECT id FROM lists WHERE unique_id='${path}'`;
        const listClient = await pool.connect()
        try {
            listResponse = await listClient.query(listQuery)
            listResponse = parseInt(listResponse.rows[0].id)
            console.log(`This listResponse id is ${listResponse}`)
        } finally {
            listClient.release()
        }
        const searchQuery = `SELECT list_id, baby_name, enabled FROM babies WHERE list_id=${listResponse} ORDER BY baby_name ASC`
        const searchClient = await pool.connect()
        try{
            searchResponse = await searchClient.query(searchQuery)
            console.log(searchResponse)
        } finally {
            searchClient.release()
        }

        console.log(searchResponse)
        
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