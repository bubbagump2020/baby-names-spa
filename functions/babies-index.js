const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokuapp.com'
// const ROOT_URL = 'http://localhost:3001'

exports.handler = async (event, context) => {
    try{
        const response = await axios.get(`${ROOT_URL}/babies`)
        return{
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    } catch(err){
        console.log(err)
        return{
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}