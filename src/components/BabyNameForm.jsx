import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { get, patch, post } from 'axios'
import { getBabies, enableBaby, disableBaby, addBaby } from '../redux/actions/baby-actions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';

const BabyNameForm = () => {

    const dispatch = useDispatch();
    const { babiesList } = useSelector(state => ({ babiesList: state.babiesList }))

    React.useEffect(() => {
        const gettingBabies = async () => {

           let babies = [];
           try {
                // const response = await get("http://localhost:8888/.netlify/functions/babies-index")
                const response = await get('https://baby-maker-2000.netlify.app/.netlify/functions/babies-index')
                if (response.status === 200){
                        babies = response.data
                        dispatch(getBabies(babies))
                }
           } catch (err){
                console.log(err)
           }

        }
        gettingBabies();
    }, [])

    const showBabies = () => {
        let user = parseInt(localStorage.getItem("user_id"))
        return babiesList.babies.map(baby => {
            if (user === baby.list_id){
                return(
                    <div key={baby.id} style={{cursor: "pointer"}}>
                        <li><br></br>
                            <p onClick={handleClick} id={baby.id} style={{textDecorationLine: baby.enabled ? "none" : "line-through",}}>
                                {baby.baby_name}
                            </p>
                        </li>
                    </div>
                )
            }
        })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        let thisBaby = {}
        let babies = babiesList.babies
        for(let i = 0; i < babies.length; i++){
            if(parseInt(e.target.id) === babies[i].id){
                thisBaby = babies[i]
            }
        }
        if (thisBaby.enabled){
            thisBaby.enabled = false
            dispatch(disableBaby(thisBaby.id))
        } else {
            thisBaby.enabled = true
            dispatch(enableBaby(thisBaby.id))
        }
        let babyRequest = {
            "baby": {
                "id": thisBaby.id,
                "enabled": thisBaby.enabled
            }
        }
        try{
            // await patch(`http://localhost:8888/.netlify/functions/update-baby`, babyRequest)
            await patch("https://baby-maker-2000.netlify.app/.netlify/functions/update-baby", babyRequest)
        } catch (err) {
            console.log(err)
        }
    }

    window.onload=function() {
        let element = document.getElementById("name-list")
        element.scrollTop = element.scrollHeight
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const baby_name = document.getElementById("formBabyName").value
        const babyRequest = {
            "baby": {
                "list_id": parseInt(localStorage.getItem("user_id")),
                "baby_name": baby_name.toLowerCase().trim()
            }
        }
        try{
            // const response = await post("http://localhost:8888/.netlify/functions/new-baby", babyRequest)
            const response = await post('https://baby-maker-2000.netlify.app/.netlify/functions/new-baby', babyRequest)
            if(response.data.baby){
                console.log(response)
                dispatch(addBaby(response.data.baby))
            }
            if(response.data.messages){
                let messages = response.data.messages
                messages.map(message => {
                    toast.error(message,{
                        position: "top-center",
                        hideProgressBar: true,
                    })
                })
            }
        } catch(err){
           console.log(err)
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
                        <Form onSubmit={handleSubmit} name="baby" data-netlify="true">
                            <input type="hidden" name="form-name" value="baby" />
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
                <Col style={{fontSize: "24px", textAlign: "center"}}>
                    <h1>Baby Names!</h1>
                    <ul id="name-list" style={{listStyle: "none", overflowAnchor: "bottom", overflow: "scroll", height: "50vh"}}>
                        {showBabies()}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default BabyNameForm;