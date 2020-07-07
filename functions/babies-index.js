const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokuapp.com'

exports.handler = async (event, context) => {
    try{
        const response = await axios.get(`${ROOT_URL}/babies`)
        const data = response.data
        console.log(data)
        return{
            statusCode: 200,
            body: data
        }
    } catch(err){
        console.log(err)
        // callback(err)
    }
}