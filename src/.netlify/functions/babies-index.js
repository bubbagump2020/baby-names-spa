import { get } from 'axios'
import { ROOT_URL } from '../../components/Constants'

export const netlifyGetBabies = async () => {
    exports.handler = async (event, context, callback) => {
        let response = null;
        try{
            response = await get(`${ROOT_URL}/babies`)
            callback(null, {
                statusCode: 200,
                body: response.data
            })
        } catch(err){
            callback(err)
        }
    }
    exports.handler()
}