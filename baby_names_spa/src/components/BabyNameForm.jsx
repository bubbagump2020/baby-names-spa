import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { get, post } from 'axios'
import { getBabies } from '../redux/actions/baby-actions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';
import { listID } from '../redux/actions/list-actions';


const BabyNameForm = (props) => {

    const dispatch = useDispatch();
    const {babiesList} = useSelector(state => ({ babiesList: state.babiesList }))
    const { user } = useSelector(state => ({ user: state.myList.list_id }))
    const [struck, setStruck] = React.useState(false)

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
                // Heavy duty error catching
           }

        }

        // necessary due to usage of redux-persist 
        const updatingUser = async () => {
            let response = null;
            let user = null;
            try {
                response = await get(`http://localhost:3001/${props.match.url}`)
                if (response.status === 200){
                    dispatch(listID(response.data.list))
                }
            } catch {
                // Heavy duty error catching   
            }
        }
        gettingBabies();
        updatingUser();
    }, [])

    const showBabies = () => {
        return babiesList.babies.map(baby => {
            if (user.id === baby.list_id){
                return(
                    <div key={baby.id} id="baby-name">
                        <Card  style={{width: '18rem'}} className="mb-2">
                            <Card.Body>
                                <Card.Title>{baby.baby_name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                )
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const babyName = document.getElementById('formBabyName').value
        const request = {
            "baby": {
                list_id: user.id,
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
        <Container >
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
                    <CardDeck id="cards" style={{'maxHeight': '50vh', 'overflowY': 'auto', 'border': 'black'}}>
                        {showBabies()}
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    )
}

export default BabyNameForm;