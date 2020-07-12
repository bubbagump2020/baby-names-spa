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
    const [ getBabiesNow, setGetBabiesNow ] = React.useState(false)
    const [ baby, setBaby] = React.useState({ 
        "list-id": parseInt(localStorage.getItem('list_id')),
        "baby-name": "",
        enabled: true
    })
    

    React.useEffect(() => {
        const gettingBabies = async () => {
           try {
               console.log('getting babies')
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
        const sortedBabies = babies.sort()
        if(sortedBabies === undefined) {
            return <Spinner animation="border" role="status" />
        } else {
            return sortedBabies.map(baby => {
                const position = sortedBabies.indexOf(baby) + 1
                return(
                    <div key={baby.baby_name} style={{cursor: "pointer"}}>
                        <li ><br></br>
                            <p onClick={handleClick} id={baby.baby_name} >
                               {position}. {baby.baby_name}
                            </p>
                        </li>
                    </div>
                )
            })
        }
    }

    React.useEffect(() => {
        if (getBabiesNow){
            setGetBabiesNow(false)
            const getBabies = async () => {
                try{
                    const response = await get('https://baby-maker-2000.netlify.app/.netlify/functions/babies-index')
                    if (response.data.length === babies.length) {
                        toast.error('Baby already made')
                    } else {
                        toast.success(`Baby ${baby['baby-name']} was made!`)
                        setBabies(response.data)
                    }
                } catch(err) {
    
                }
            }
            getBabies()
        }
    }, [getBabiesNow])

    const handleChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        setBaby({ ...baby, "baby-name": value })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        let thisBaby = {}
        for(let i = 0; i < babies.length; i++){
            if(e.target.id === babies[i].baby_name){
                thisBaby = babies[i]
            }
        }
        
        if (thisBaby.enabled){
            thisBaby.enabled = false
        } else {

            thisBaby.enabled = true
        }
        let element = document.getElementById(thisBaby.baby_name)
        element.style.textDecorationLine = thisBaby.enabled ? "none" : "line-through"

        let babyRequest = {
            "baby": {
                "list_id": thisBaby.list_id,
                "baby_name": thisBaby.baby_name,
                "enabled": thisBaby.enabled
            }
        }
        try{
            await patch('https://baby-maker-2000.netlify.app/.netlify/functions/update-baby', babyRequest)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        if(!getBabiesNow){
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
        setGetBabiesNow(true)
    }

    return(
        <Container style={{ margin: '10px'}}>
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>The Baby Maker 2000</h1>
                        <p>Simply put in a name and it'll be saved!</p>
                        <p>Note: To return to this list save your URL some where safe</p>
                        <form id="form" data-netlify="true" method="post" name="baby" onSubmit={handleSubmit}>
                            <input type="hidden" name="form-name" value="baby" />
                            <div>
                                <label>Name! </label>
                                <div>
                                    <input required id="name-input" placeholder="Baby Name!" type="text" name="baby-name" value={baby["baby-name"]} onChange={handleChange} />
                                    <input hidden type="number" name="list-id" value={baby["list-id"]} />
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