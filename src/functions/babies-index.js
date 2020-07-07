import axios from "axios"
const ROOT_URL = 'baby-maker-2000-api.com'

export const handler = async (event, context, callback) => {
    try{
        const response = await axios.get(`${ROOT_URL}/babies`)
        const data = response.data
        console.log(data)
        return{
            statusCode: 200,
            body: 'hitting the handler'
        }
    } catch(err){
        console.log(err)
        // callback(err)
    }
}