const { Pool } = require('pg')
const pool = new Pool({
    connectionString: "postgres://lpqbtrivtlrque:82902c27b34536fbf4c2db63aa18e3a591a154d770080c51988209927472ccab@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d2tqs2vejh2i12",
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = async (event, context) => {
    const path = JSON.parse(event.body).payload.data.referrer
    const pathname = path.split('/').pop()
    let form = JSON.parse(event.body).payload.data
    
    let listResponse;
    let duplicateMessage = null;
    let duplicateResponse;
    try {

        const listClient = await pool.connect()
        const listQuery = `SELECT id FROM lists WHERE unique_id='${pathname}'`

        try{
            listResponse = await listClient.query(listQuery)
            listResponse = listResponse.rows[0].id
        } finally {
            listClient.release()
        }

        const duplicateClient = await pool.connect()
        const duplicateQuery = `SELECT baby_name FROM babies WHERE baby_name='${form['baby-name']}' AND list_id=${listResponse}` 
        
        try{
            duplicateResponse = await duplicateClient.query(duplicateQuery)
        } finally {
            duplicateClient.release()
        }

        console.log(duplicateResponse)

        if (duplicateResponse.rows.length === 0){
            
            const babyClient = await pool.connect()
            const babyQuery = 'INSERT INTO babies(list_id, baby_name) VALUES($1, $2)'
            try{
                await babyClient.query(babyQuery, [listResponse, form['baby-name']])
            } finally{
                babyClient.release()
            }
        } else {
            duplicateMessage = {
                message: 'That name already exists for this list'
            }
        }

        return{
            statusCode: 200,
            body: "Request successfully made"
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}