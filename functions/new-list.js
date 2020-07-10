const axios = require('axios')
const randomstring = require('randomstring')
const ROOT_URL = 'https://baby-maker-2000-api.herokuapp.com'

exports.handler = async (event, context) => {
    // console.log(event)
    const request = {
        unique_id: randomstring.generate({
            length: 12,
            charset: 'alphanumeric'
        })
    }

    try {
        const response = await axios.post(`${ROOT_URL}/lists`, request)
        return{
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    } catch (err) {
        console.log(err)
        return{
            statusCode: 500,
            body: JSON.stringify({ msg: err.msg })
        }
    }
}