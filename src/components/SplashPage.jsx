import React from 'react';
import { useHistory } from 'react-router-dom'
import { post } from 'axios'


const SplashPage = () => {

    const history = useHistory();

    React.useEffect(() => {
        let unique_id;
        let list_id;
        const makeList = async () => {
            try {
                // const response = await post("http://localhost:8888/.netlify/functions/new-list")
                const response = await post("https://baby-maker-2000.netlify.app/.netlify/functions/new-list")
                if (response.status === 200) {
                    console.log(response)
                    list_id = response.data.list.id
                    localStorage.setItem('user_id', list_id)
                    unique_id = response.data.list.unique_id;
                    localStorage.setItem('unique_id', unique_id)
                    history.push(`/lists/${unique_id}`);
                }
            } catch (err) {
                console.log(err)
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