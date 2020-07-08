const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'

exports.handler = async (event, context) => {
    const form = JSON.parse(event.body)
    let babyResponse = {
        "baby":{
            "list_id": parseInt(form.payload.data['list-id']),
            "baby_name": form.payload.data['baby-name']
        }
    };

    // console.log(babyResponse)

    try {

        const response = axios.post(`${ROOT_URL}/babies`, babyResponse)
        console.log(response)
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
            body: JSON.parse(response)
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}