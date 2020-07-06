import React from 'react';
import { useHistory } from 'react-router-dom'
import { post } from 'axios'
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
            try {
                response = await post('http://localhost:3001/lists', request)
                if (response.status === 200) {
                    unique_id = response.data.list.unique_id;
                    history.push(`/lists/${unique_id}`);
                }
            } catch {

            }
        }
        makeList();
    });

    return(
        <div>

        </div>
    )
}

export default SplashPage;