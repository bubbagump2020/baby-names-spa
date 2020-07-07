import { get } from 'axios'
import { ROOT_URL } from '../components/Constants'

export const handler = async (event, context, callback) => {
    try{
        const response = await get(`${ROOT_URL}/babies`)
        const data = response.data
        console.log(data)
        // return{
        //     statusCode: 200,
        //     body: await data.json()
        // }
        console.log(response)
    } catch(err){
        // callback(err)
    }
}