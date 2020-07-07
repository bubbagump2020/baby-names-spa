import { get } from 'axios'
import { ROOT_URL } from '../components/Constants'

exports.handler = async (event, context, callback) => {
    let response = null;
    try{
        response = await get(`${ROOT_URL}/babies`)
        callback(null, {
            statusCode: 200,
            body: response.data
        })
        console.log(response)
    } catch(err){
        callback(err)
    }
}