const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'

exports.handler = async (event, context) => {
    console.log(event.body)
    const form = JSON.parse(event.body)
    console.log(form.payload.data)
    console.log(form.payload.data['baby-name'])
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhr = new XMLHttpRequest()
    // let response;
    let babyResponse = {
        // "baby":{
            // "list_id": parseInt(form.payload.data.list-id),
            // "baby_name": form.bayload.data.baby-name
        // }
    };

    // console.log(babyResponse)

    try {

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
            body: babyResponse
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}