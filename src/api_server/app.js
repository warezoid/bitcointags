const dotenv = require('dotenv')
dotenv.config()



let f
let btc
let fiat

const callApi = async () => {
    f = await fetch("https://rest.coincap.io/v3/assets/bitcoin", {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${process.env.API_KEY}`
        }
    })
    btc = await f.json()

    console.log(btc);

    f = await fetch("https://rest.coincap.io/v3/rates", {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${process.env.API_KEY}`
        }
    })
    fiat = await f.json()

    console.log(fiat)
}

callApi()   //THIS CALL TAKE 17 credits



const express = require('express')
const app = express()

const port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.get('/btc', (req, res) => {
    res.json(btc)
})

app.get('/fiat', (req, res) => {
    res.json(fiat)
})