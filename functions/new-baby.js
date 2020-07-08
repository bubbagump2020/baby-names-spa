const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokapp.com'
// const ROOT_URL = 'http://localhost:3001'

exports.handler = async (event, context) => {
    const form = JSON.parse(event.body)
    try {
        const response = await axios.post(`${ROOT_URL}/babies`, form)
        console.log(response)
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}