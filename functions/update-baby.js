const {Pool} = require('pg')
const pool = new Pool({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = async(event, context) => {

    const baby_id = JSON.parse(event.body).baby.list_id
    const baby_name = JSON.parse(event.body).baby.baby_name
    const enabledBaby = JSON.parse(event.body).baby.enabled
    let getBabyResponse = null;

   try{
        const updateQuery = `UPDATE babies SET enabled=${enabledBaby} WHERE baby_name='${baby_name}' AND list_id=${baby_id}`
        const updateClient = await pool.connect()
        try {
            await updateClient.query(updateQuery)
        } finally {
            updateClient.release()
        }

        const getBabyQuery = `SELECT list_id, baby_name, enabled FROM babies WHERE baby_name='${baby_name}' AND list_id=${baby_id}`
        const getBabyClient = await pool.connect()
        try {
            getBabyResponse = await getBabyClient.query(getBabyQuery)
            getBabyResponse = getBabyResponse.rows[0]
        } finally {
            getBabyClient.release()
        }

        getBabyResponse.list_id = parseInt(getBabyResponse.list_id)
        return {
            statusCode: 200,
            body: JSON.stringify(getBabyResponse)
        }

   }catch (err) {
       console.log(err)
       return{
           statusCode: 500,
           body: JSON.stringify(err)
       }
   }
}