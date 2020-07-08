const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'

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
        axios.post(`${ROOT_URL}/babies`, babyRequest)
            .then(function(response ){
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
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
            body: null
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}