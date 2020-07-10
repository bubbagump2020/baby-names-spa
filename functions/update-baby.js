const axios = require("axios")
// const ROOT_URL = 'https://baby-maker-2000-api.herokuapp.com'
const ROOT_URL = 'http://localhost:3001'

exports.handler = async(event, context) => {
    const babyInfo = JSON.parse(event.body)
    const baby = {
        "baby": {
            enabled: babyInfo.baby.enabled
        }
    }
   try{
        const response = await axios.patch(`${ROOT_URL}/babies/${babyInfo.baby.id}`, baby)
        const data = await response
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
   }catch (err) {
       console.log(err)
       return{
           statusCode: 500,
           body: JSON.stringify(err)
       }
   }
}