import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { post } from 'axios'
import { listID } from '../redux/actions/baby-actions';

const SplashPage = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    React.useEffect(() => {
        let unique_id;
        const makeList = async () => {
            try {
                const response = await post('http://localhost:8888/.netlify/functions/new-list')
                // const response = await post("https://baby-maker-2000.netlify.app/.netlify/functions/new-list")
                if (response.status === 200) {
                    dispatch(listID(response.data.list.id))
                    unique_id = response.data.list.unique_id;
                    history.push(`/lists/${unique_id}`);
                }
            } catch (err) {
                console.log(err)
            }
        }
        makeList();
    }, [history]);

    return(
        <div>

        </div>
    )
}

export default SplashPage;