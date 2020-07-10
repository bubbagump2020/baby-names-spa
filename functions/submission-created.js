const axios = require("axios")
const { Pool } = require('pg')
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'

const pool = new Pool({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = async (event, context) => {
    const url = event.headers.referer
    const pathname = new URL(url).pathname
    
    let form = JSON.parse(event.body).payload.data
    console.log(form)
    
    let duplicateMessage = null
    let searchResponse;
    let duplicateResponse;
    const listResponse = await axios.get(`${ROOT_URL + pathname}`)
    try {
        let babyRequest = [
            listResponse.data.list.id,
            form.baby_name
        ]
        console.log(listResponse)
        const duplicateClient = await pool.connect()
        const duplicateQuery = `SELECT baby_name FROM babies WHERE baby_name='${form.baby_name}' AND list_id=${listResponse.data.list.id}` 
        try{
            duplicateResponse = await duplicateClient.query(duplicateQuery)
        } finally {
            duplicateClient.release()
        }
        if (duplicateResponse.rows.length === 0){
            const babyClient = await pool.connect()
            const babyQuery = 'INSERT INTO babies(list_id, baby_name) VALUES($1, $2)'
            try{
                await babyClient.query(babyQuery, babyRequest)
            } finally{
                babyClient.release()
            }
        } else {
            duplicateMessage = {
                message: 'That name already exists for this list'
            }
        }

        const searchClient = await pool.connect()
        const searchQuery = `SELECT id, baby_name, enabled FROM babies WHERE list_id=${listResponse.data.list.id}`
        try{
            searchResponse = await searchClient.query(searchQuery)
        } finally{
            searchClient.release()
        }

        return{
            statusCode: 200,
            body: JSON.stringify(duplicateMessage ? duplicateMessage : searchResponse.rows)         
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}