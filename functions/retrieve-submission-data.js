const axios = require('axios')

exports.handler = async (event, context) => {
    try{
        const response = await axios.get('https://baby-maker-2000.app/.netlify/functions/submission-created')
        console.log(response)
        return{
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    } catch (error){
        console.log(error)
        return{
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}