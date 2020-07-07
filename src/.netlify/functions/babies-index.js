import { get } from 'axios'
import { ROOT_URL } from '../../components/Constants'

exports.handler = function(event, contxt, callback){
    callback(null, {
        statusCode: 200,
        body: "Hello World!"
    })
}

export const netlifyGetBabies = async () => {
    exports.handler = function(event, context, callback){
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