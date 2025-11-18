const dotenv = require('dotenv')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const currencies = [
    {ticker: "czk", apiCode: "czech-republic-koruna"},
    {ticker: "eur", apiCode: "euro"},
    {ticker: "jpy", apiCode: "japanese-yen"},
    {ticker: "gbp", apiCode: "british-pound-sterling"}
]



dotenv.config()



let data = {
    btc: {
        change: null,
        price: null,
        statusCode: null
    },
    fiat: []
}

const createFiat = () => {
    data.fiat = []

    for(let i = 0; i < currencies.length; i++){
        data.fiat.push({ticker: currencies[i].ticker, rate: null, statusCode: null})
    }
}
createFiat()



let rawData
let jsonData

const callApi = async () => {
    rawData = await fetch("https://rest.coincap.io/v3/assets/bitcoin", {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${process.env.API_KEY}`
        }
    })
    jsonData = await rawData.json()

    if(rawData.status == 200){
        data.btc.change = jsonData.data.changePercent24Hr
        data.btc.price = jsonData.data.priceUsd
    }

    data.btc.statusCode = rawData.status
 
    

    for(let i = 0; i < currencies.length; i++){
        rawData = await fetch(`https://rest.coincap.io/v3/rates/${currencies[i].apiCode}`, {
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            }
        })
        jsonData = await rawData.json()      

        if(rawData.status == 200){
            data.fiat[i].rate = jsonData.data.rateUsd
        }

        data.fiat[i].statusCode = rawData.status
    }
}



callApi()

setInterval(() => {
    callApi()
}, 720000)



app.get('/data', (req, res) => {
    res.json(data)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})