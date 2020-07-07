import React from 'react';
import { useHistory } from 'react-router-dom'
import { post } from 'axios'
import randomstring from 'randomstring'
import { ROOT_URL } from './Constants'
import { data } from '../functions/babies-index'

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
            // let response = null

            console.log(data)

            // try {
            //     response = await post(`${ROOT_URL}/lists`, request)
            //     if (response.status === 200) {
            //         unique_id = response.data.list.unique_id;
            //         history.push(`/lists/${unique_id}`);
            //     }
            //     console.log(response)
            // } catch {

            // }
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
            <h1>SplashPageComponent</h1>
        </div>
    )
}

export default SplashPage;