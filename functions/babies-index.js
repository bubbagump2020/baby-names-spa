const { Pool } = require('pg')
const ROOT_URL = 'http://baby-maker-2000.herokuapp.com'
const { axios } = require('axios')

const pool = new Pool({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = async (event, context) => {
    console.log(event)
    const path = event.headers.referer.split('/').pop()
    console.log(path)
    let searchResponse = null
    let listResponse = null
 
    try{
        const listQuery = `SELECT id FROM lists WHERE unique_id='${path}'`;
        console.log(listQuery)
        const listClient = await pool.connect()
        try {
            listResponse = await listClient.query(listQuery)
            listResponse = parseInt(listResponse.rows[0].id)
            console.log(listResponse)
        } finally {
            listClient.release()
        }
        const searchQuery = `SELECT id, baby_name, enabled FROM babies WHERE list_id=${listResponse}`
        console.log(searchQuery)
        const client = await pool.connect()
        try{
            searchResponse = await client.query(searchQuery)
 
        } finally{
            client.release()
        }
        console.log(axios)
        // const searchAxiosResponse = await axios.get(`${ROOT_URL}/babies`)
        // console.log(searchAxiosResponse)?
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