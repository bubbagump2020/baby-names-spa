import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { get, patch } from 'axios'
import { getBabies, enableBaby, disableBaby } from '../redux/actions/baby-actions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { toast } from 'react-toastify';
import './BabyNameForm.css'


const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
}

const BabyNameForm = () => {

    const dispatch = useDispatch();
    const { babiesList } = useSelector(state => ({ babiesList: state.babiesList.babies }))
    const [ baby, setBaby] = React.useState({ 
        "list-id": parseInt(localStorage.getItem('user_id')),
        "baby-name": ""
    })

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
    }, [dispatch])

    // const showBabies = () => {
    //     return babiesList.map(baby => {
    //         return(
    //             <div key={baby.id} style={{cursor: "pointer"}}>
    //                 <li ><br></br>
    //                     <p onClick={handleClick} id={baby.id} style={{textDecorationLine: baby.enabled ? "none" : "line-through",}}>
    //                         {baby.baby_name}
    //                     </p>
    //                 </li>
    //             </div>
    //         )
    //     })
    // }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value} = e.target
        console.log(name, value)
        setBaby({ ...baby, "baby-name": value })
    }

    // const handleClick = async (e) => {
    //     e.preventDefault()
    //     let thisBaby = {}
    //     let babies = babiesList
    //     for(let i = 0; i < babies.length; i++){
    //         if(e.target.id === babies[i].id){
    //             thisBaby = babies[i]
    //         }
    //     }
    //     if (thisBaby.enabled){
    //         thisBaby.enabled = false
    //         dispatch(disableBaby(thisBaby.id))
    //     } else {
    //         thisBaby.enabled = true
    //         dispatch(enableBaby(thisBaby.id))
    //     }
    //     let babyRequest = {
    //         "baby": {
    //             "id": thisBaby.id,
    //             "enabled": thisBaby.enabled
    //         }
    //     }
    //     try{
    //         // await patch(`http://localhost:8888/.netlify/functions/update-baby`, babyRequest)
    //         await patch("https://baby-maker-2000.netlify.app/.netlify/functions/update-baby", babyRequest)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    window.onload=function() {
        let element = document.getElementById("name-list")
        element.scrollTop = element.scrollHeight
    }

    const handleSubmit = (e) => {
        
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },

            body: encode({"form-name": "baby", ...baby})
        })
            .then(response => response.json())
            .then(data =>{
                if(data.message){
                    toast.error(data.message, {
                        position: "top-center",
                        progress: undefined,
                        closeOnClick: true,
                        hideProgressBar: true,
                    })
                } else {
                    dispatch(getBabies(data))
                }
            })
            .catch(error => console.log(error))
        e.preventDefault()
    }

    console.log(document.getElementById('name-input'))

    return(
        <Container style={{ margin: '10px'}}>
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>The Baby Maker 2000</h1>
                        <p>Simply put in a name and it'll be saved!</p>
                        <p>Note: To return to this list save your URL some where safe</p>
                        <form id="form" onSubmit={handleSubmit} name="baby" method="post">
                            <input type="hidden" name="form-name" value="baby" />
                            <div>
                                <label>Name! </label>
                                <div>
                                    <input id="name-input" placeholder="Baby Name!" type="text" name="baby-name" value={baby["baby-name"]} onChange={handleChange} />
                                    <input hidden="true" type="number" name="list-id" value={baby.list_id} />
                                </div>
                            </div><br></br>
                            <div>
                                <button type="submit" id="submit-button">Make baby!</button>
                            </div>
                        </form>
                    </Jumbotron>
                </Col>
                <Col style={{fontSize: "24px", textAlign: "center"}}>
                    <h1>Baby Names!</h1>
                    <ul id="name-list" style={{listStyle: "none", overflowAnchor: "bottom", overflow: "scroll", height: "50vh"}}>
                        {/* {showBabies()} */}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default BabyNameForm;