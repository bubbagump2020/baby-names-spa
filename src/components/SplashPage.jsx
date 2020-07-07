import React from 'react';
import { useHistory } from 'react-router-dom'
import { post, get } from 'axios'
import randomstring from 'randomstring'


const SplashPage = () => {

    const history = useHistory();

    React.useEffect(() => {
        let unique_id;
        const makeList = async () => {
            const request = {
                unique_id: randomstring.generate({
                    length: 12,
                    charset: 'alphanumeric'
                })
            }
            let response = null
            

            // This try - catch block works
            // try{
            //     response = await get('https://baby-maker-2000.netlify.app/.netlify/functions/babies-index')
            //     console.log(response)
            // } catch (err) {
            //     console.log(err)
            // }
            // This try - catch block is a work in progress
            try {
                response = await post('https://baby-maker-2000.netlify.app/.netlify/functions/new-list')
                // if (response.status === 200) {
                //     unique_id = response.data.list.unique_id;
                //     history.push(`/lists/${unique_id}`);
                // }
                console.log(response)
            } catch (err) {
                console.log(err)
            }
            // const response = await fetch(`/lists`,{
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         unique_id: randomstring.generate({
            //             length: 12,
            //             charset: 'alphanumeric'
            //         })
            //     })
            // })

            // const data = await response.json()
            // console.log(data)

        }
        makeList();
    });

    return(
        <div>

        </div>
    )
}

export default SplashPage;