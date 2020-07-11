import React from 'react';
import { get, patch } from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Spinner from 'react-bootstrap/Spinner'
import './BabyNameForm.css'
import { toast } from 'react-toastify';


const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
}

const BabyNameForm = () => {

    const [ babies, setBabies ] = React.useState([])
    const [ baby, setBaby] = React.useState({ 
        "list-id": parseInt(localStorage.getItem('list_id')),
        "baby-name": ""
    })
    const [ getBabiesNow, setGetBabiesNow ] = React.useState(false)

    React.useEffect(() => {
        const gettingBabies = async () => {
           try {
                const response = await get('https://baby-maker-2000.netlify.app/.netlify/functions/babies-index')
                if (response.status === 200){
                        setBabies(await response.data)
                }
           } catch (err){
                console.log(err)
           }

        }
        gettingBabies();
    }, [])



    const showBabies = () => {
        if(babies === undefined) {
            return <Spinner animation="border" role="status" />
        } else {
            return babies.map(baby => {
                return(
                    <div key={baby.id} style={{cursor: "pointer"}}>
                        <li ><br></br>
                            <p onClick={handleClick} id={baby.id} >
                                {baby.baby_name}
                            </p>
                        </li>
                    </div>
                )
            })
        }
    }

    React.useEffect(() => {
        const gettingBabies = async () => {
            try {
                 const response = await get('https://baby-maker-2000.netlify.app/.netlify/functions/babies-index')
                 if (response.status === 200){
                    if (response.data.length !== 0){
                        if (response.data.length === babies.length){
                            return(
                                toast.error('Baby already made')
                            )
                        } else {
                            setBabies(response.data)
                        }
                    } else {
                        setBabies(response.data)
                    }
                 }
            } catch (err){
                 console.log(err)
            }
 
         }
        gettingBabies();
    }, [getBabiesNow, babies.length])

    const handleChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        setBaby({ ...baby, "baby-name": value })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        let thisBaby = {}
        for(let i = 0; i < babies.length; i++){
            if(e.target.id === babies[i].id){
                thisBaby = babies[i]
            }
        }
        let element = document.getElementById(thisBaby.id)
        if (thisBaby.enabled){
            thisBaby.enabled = false
            element.style.textDecorationLine = "none"
        } else {
            thisBaby.enabled = true
            element.style.textDecorationLine = "line-through"
        }
        let babyRequest = {
            "baby": {
                "id": thisBaby.id,
                "enabled": thisBaby.enabled
            }
        }
        try{
            await patch('https://baby-maker-2000.netlify.app/.netlify/functions/update-baby', babyRequest)
        } catch (err) {
            console.log(err)
        }
    }

    window.onload=function() {
        let element = document.getElementById("name-list")
        element.scrollTop = element.scrollHeight
    }

    const handleSubmit = (e) => {
            if(!getBabiesNow){
                setGetBabiesNow(true)
            } else {
                setGetBabiesNow(false)
            }
             fetch("/index.html", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encode({"form-name": "baby", ...baby})
                })
                    .then(() => alert("Submitted!"))
                    .catch(error => console.log(error))
        e.preventDefault()
    }

    return(
        <Container style={{ margin: '10px'}}>
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>The Baby Maker 2000</h1>
                        <p>Simply put in a name and it'll be saved!</p>
                        <p>Note: To return to this list save your URL some where safe</p>
                        <form id="form" onSubmit={handleSubmit} netlify-honeypot="bot-fields" name="baby" method="post">
                            <input type="hidden" name="form-name" value="baby" />
                            <div>
                                <label>Name! </label>
                                <div>
                                    <input required id="name-input" placeholder="Baby Name!" type="text" name="baby-name" value={baby["baby-name"]} onChange={handleChange} />
                                    <input hidden type="number" name="list-id" value={baby.list_id} />
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
                        {showBabies()}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default BabyNameForm;