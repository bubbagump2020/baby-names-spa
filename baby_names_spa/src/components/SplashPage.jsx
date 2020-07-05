import React from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import { post } from 'axios'
import randomstring from 'randomstring'

const SplashPage = () => {

    const history = useHistory();

    React.useEffect(() => {
        var list_id;
        const makeList = async () => {
            const request = {
                unique_id: randomstring.generate({
                    length: 12,
                    charset: 'alphanumeric'
                })
            }
            let response = null
            try {
                response = await post('http://localhost:3001/lists', request)
                if (response.status === 200) {
                    list_id = response.data.list_id;
                    history.push(`/lists/${list_id}`);
                }
            } catch {

            }
        }
        makeList();
    }, []);

    return(
        <div>

        </div>
    )
}

export default SplashPage;