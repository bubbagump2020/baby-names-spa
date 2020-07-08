const axios = require("axios")
const ROOT_URL = 'https://baby-maker-2000-api.herokuapp.com'
// const ROOT_URL = 'http://localhost:3001'

exports.handler = async(event, context) => {
   const form = JSON.parse(event.body)
   const baby_id = form.baby.id
   try{
        const response = await axios.patch(`${ROOT_URL}/babies/${baby_id}`, form)
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