const { Pool } = require('pg')
// const ROOT_URL = 'https://baby-maker-2000-api.herokuapp.com'
// const ROOT_URL = 'http://localhost:3001'
const axios = require('axios')

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

        // console.log(axios)
        // const searchAxiosResponse = await axios.get(`${ROOT_URL}/babies`)

        // searchAxiosResponse.data.map(baby => {
        //     if(baby.list_id === listResponse){
        //         searchResponse.push(baby)
        //     }
        // })
        // console.log(searchResponse)
        return{
            statusCode: 200,
            body: JSON.stringify(searchResponse)
        }
    } catch(err){
        console.log(err)
        return{
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}