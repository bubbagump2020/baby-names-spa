const axios = require("axios")
const { Client } = require('pg')
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'
const query = 'INSERT INTO babies(list_id, baby_name) VALUES($1, $2) RETURNING'
const client = new Client({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})
console.log('beginning client connection')
client.connect()

exports.handler = (event, context) => {
    const form = JSON.parse(event.body)
    let babyRequest = {
        "baby":{
            "list_id": parseInt(form.payload.data['list-id']),
            "baby_name": form.payload.data['baby-name']
        }
    };
    let babyResponse;
    try {
        console.log(babyRequest)
        client
            .query('SELECT * FROM BABIES')
            .then(response => babyResponse = response)
            .catch(error => console.error(error.stack))
        console.log('ending client connection')
        client.end()
        // axios.post(`${ROOT_URL}/babies`, babyRequest)
        //     .then(function(response ){
        //         console.log(response)
        //     })
        //     .catch(function(error) {
        //         console.log(error)
        //     })
        // xhr.open('POST', `${ROOT_URL}/babies`)
        // xhr.setRequestHeader('Content-Type', 'application/json')
        // xhr.send(JSON.stringify(form))
        // xhr.onload = function(e) {
        //     if (xhr.readyState === 4){
        //         if (xhr.status === 200){
        //             response = JSON.parse(xhr.responseText)
        //         } else {
        //             console.log(xhr.statusText)
        //         }
        //     }
        // }
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