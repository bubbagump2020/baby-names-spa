const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'

exports.handler = async (event, context) => {
    const form = JSON.parse(event.body)
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhr = new XMLHttpRequest()
    let response;

    try {

        xhr.open('POST', `${ROOT_URL}/babies`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(form))
        xhr.onload = function(e) {
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    response = JSON.parse(xhr.responseText)
                } else {
                    console.log(xhr.statusText)
                }
            }
        }
        return{
            statusCode: 200,
            body: response
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}