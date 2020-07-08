const axios = require("axios")
const { Pool } = require('pg')
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'
const query = 'INSERT INTO babies(list_id, baby_name) VALUES($1, $2) RETURNING'
const pool = new Pool({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = (event, context) => {
    const form = JSON.parse(event.body)
    let babyRequest = [parseInt(form.payload.data['list-id']), form.payload.data['baby-name']]
    // let babyRequest = {
    //     "baby":{
    //         "list_id": parseInt(form.payload.data['list-id']),
    //         "baby_name": form.payload.data['baby-name']
    //     }
    // };
    let babyResponse;
    try {
        pool.connect((error, client, done) => {
            if(error) throw error
            client.query(query, babyRequest, (error, response) => {
                done()
                if(error) console.log(error.stack)
                else babyResponse = response  
            })
        })

        console.log(babyResponse)

        return{
            statusCode: 200,
            body: JSON.stringify(babyResponse)
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}