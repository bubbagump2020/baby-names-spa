import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { get, post } from 'axios'
import { getBabies } from '../redux/actions/baby-actions'

const BabyNameForm = (props) => {

    const dispatch = useDispatch();
    const {babiesList} = useSelector(state => ({ babiesList: state.babiesList }))
    const { user } = useSelector(state => ({ user: state.myList.list_id }))



    React.useEffect(() => {
        const gettingBabies = async () => {
           let response = null;
           let babies = [];
           try {
               response = await get('http://localhost:3001/babies')
               if (response.status === 200){
                    babies = response.data
                    dispatch(getBabies(babies))
               }
           } catch{
                //error catching
           }
        }
        gettingBabies()
    }, [])

    const showBabies = () => {
        return babiesList.babies.map(baby => {
            return(
                <div key={baby.id}>
                    {baby.baby_name}
                </div>
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const babyName = document.getElementById('name').value
        const request = {
            "baby": {
                list_id: user.id,
                baby_name: babyName.trim()
            }
        }
        let response = null
        try{
            response = await post('http://localhost:3001/babies', request)
            if(response.status === 200){
                let newResponse = null
                let babies = []
                try{
                    newResponse = await get('http://localhost:3001/babies')
                    if (response.status === 200){
                        babies = newResponse.data
                        dispatch(getBabies(babies))
                    }
                } catch {
                    //error catching
                }
            }
        } catch{
            //error catching
        }
    }

    return(
        <div>
            
            <div>
                <h1>Baby Name Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Baby Name: </label>
                        <input type="text" name="name" id="name"/>
                    </div>
                    <div>
                        <button type="submit">Make a baby!</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Babies List</h2>
                {showBabies()}
            </div>

        </div>
    )
}

export default BabyNameForm;