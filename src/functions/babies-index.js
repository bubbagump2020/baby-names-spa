import { get } from 'axios'
import { ROOT_URL } from '../components/Constants'

export let data = {}

const netlifyGetBabies = async () => {
    exports.handler = async (event, context, callback) => {
        let response = null;
        try{
            response = await get(`${ROOT_URL}/babies`)
            data = callback(null, {
                statusCode: 200,
                body: response.data
            })
            console.log(response)
        } catch(err){
            callback(err)
        }
    }
}
