import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { get, post } from 'axios'
import { getBabies, addStrikeBaby, trueStrikeBaby, falseStrikeBaby } from '../redux/actions/baby-actions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';
import { listID } from '../redux/actions/list-actions';


const BabyNameForm = (props) => {

    const dispatch = useDispatch();
    const { babiesList } = useSelector(state => ({ babiesList: state.babiesList }))
    // const { user } = useSelector(state => ({ user: state.myList.list_id }))
    // const [ struck, setStruck ] = React.useState(false)

    React.useEffect(() => {
        const gettingBabies = async () => {
           let response = null;
           let babies = [];
           try {
               response = await get('http://localhost:3001/babies')
               if (response.status === 200){
                    babies = response.data
                    dispatch(getBabies(babies))
                    dispatch(addStrikeBaby(babiesList))
               }
           } catch{
                // Heavy duty error catching
           }

        }

        // necessary due to usage of redux-persist 
        const updatingUser = async () => {
            let response = null;
            try {
                response = await get(`http://localhost:3001/${props.match.url}`)
                if (response.status === 200){
                    localStorage.setItem('user_id', response.data.list.id)
                }
            } catch {
                // Heavy duty error catching   
            }
        }
        gettingBabies();
        updatingUser();
    }, [])

    const showBabies = () => {
        let user = localStorage.getItem('user_id')
        return babiesList.babies.map(baby => {
            if (parseInt(user) === baby.list_id){
                return(
                    <li
                        key={baby.id}
                        style={{
                            cursor: "pointer",
                            textDecorationLine: baby.strike ? "line-through" : "none"
                        }}
                        onClick={() => {
                            if(!baby.strike){
                                console.log('clicked!')
                                dispatch(trueStrikeBaby(baby.id))
                            } else {
                                dispatch(falseStrikeBaby(baby.id))
                            }
                        }}
                    >
                        {baby.baby_name}
                    </li>
                )
            }
        })
    }

    // const handleClick = () => {
    //     if (!struck){
    //         setStruck(true)
    //     } else {
    //         setStruck(false)
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const babyName = document.getElementById('formBabyName').value
        const request = {
            "baby": {
                list_id: localStorage.getItem('user_id'),
                baby_name: babyName.toLowerCase().trim()
            }
        }
        let response = null
        try{
            response = await post('http://localhost:3001/babies', request)
            if(response.status === 201){
                let newResponse = null
                let babies = []
                if(response.data.message !== undefined || response.data.message !== null){
                    try{
                        newResponse = await get('http://localhost:3001/babies')
                        if (newResponse.status === 200){
                            babies = newResponse.data
                            dispatch(getBabies(babies))
                            dispatch(addStrikeBaby(babies))
                            let element = document.getElementById('cards');
                            element.scrollTop = element.scrollHeight;
                        }
                    } catch {
                        //Heavy duty error catching
                    }
                }
            }
            if(response.status === 200){
                response.data.messages.map(message => {
                    toast.error(message,{
                        position: "top-center",
                        hideProgressBar: true,
                    })
                })
            }
        } catch(err){
            // Heavy duty error catching
        }
    }

    return(
        <Container style={{ margin: '10px'}}>
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>The Baby Maker 2000</h1>
                        <p>Simply put in a name and it'll be saved!</p>
                        <p>Note: To return to this list save your URL some where safe</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBabyName">
                                <Form.Label>Name!</Form.Label>
                                <Form.Control type="text" placeholder="Baby Name" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Make Baby!
                            </Button>
                        </Form>
                    </Jumbotron>
                </Col>
                <Col>
                    <ul>
                        {showBabies()}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default BabyNameForm;