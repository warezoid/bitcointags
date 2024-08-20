const style = document.createElement("style")

style.textContent = `
    @font-face{
        font-family: Bakbak One;
        src: url(${chrome.runtime.getURL('BakbakOne-Regular.ttf)')};
        font-weight: normal;
        font-style: normal;
    }

    #bitcointag-tag{
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 1000;
    }

    #bitcointags-mainContainer{
        width: 280px;
        height: 70px;
        position: relative;
        overflow: hidden;
        box-sizing: content-box;
        background-color: #262626;
        border-radius: 16px;
        line-height: normal;
    }

    .bitcointags-active{
        background: linear-gradient(135deg, #ff7b00, #f59119, #ffae00);
    }

    #bitcointags-loading-container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    #bitcointags-loading-container::after{
        content: "";
        width: 220px;
        height: 5px;
        position: absolute;
        border-radius: 12px;
        background: #444444;
        box-shadow: 0 0 10px #444444;
    }

    .bitcointags-loading-blocksContainer{
        width: 140px;
        height: 40px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .bitcointags-loading-block{
        width: 20px;
        height: 20px;
        display: inline-block;
        position: absolute;
        z-index: 1000;
        border-radius: 6px;
        background: #333333;
        box-shadow: 0 0 10px #333333;
    }
    .bitcointags-loading-block:last-child{
        opacity: 0;
        transform: scale(0.5);
    }

    .bitcointags-loading-block.bitcointags-active{
        background: linear-gradient(135deg, #ff7b00, #f59119, #ffae00);
        box-shadow: 0 0 10px #f59119;
    }

    #bitcointags-content-container{
        opacity: 0;
    }

    #bitcointags-main-container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        opacity: 0;
    }

    #bitcointags-main-btcLogo{
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        width: 40px;
        height: 40px;
        padding-left: 10px;
    }

    .bitcointags-main-textContainer{
        width: 210px;
        padding-right: 10px;
        text-align: right;
        color: #ffffff;
    }

    .bitcointags-main-goodsPriceContainer{
        display: flex;
        justify-content: right;
        align-items: baseline;
        gap: 10px;
    }
    
    .bitcointags-main-goodsPriceContainer *{
        font-family: Bakbak One, sans-serif;
        font-size: 28px;
        color: #ffffff;
    }

    #bitcointags-main-btcUnit{
        width: 35px;
        font-size: 20px;
        text-align: left;
    }

    #bitcointags-main-btcPriceContainer{
        display: flex;
        justify-content: right;
        align-items: baseline;
        gap: 10px;
    }

    #bitcointags-main-btcPriceContainer *{
        font-family: Bakbak One, sans-serif;
        font-size: 18px;
    }

    #bitcointags-main-btcPriceCurrency{
        width: 35px;
        text-align: left;
    }

    #bitcointags-error-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        opacity: 0;
    }
    
    #bitcointags-error-container *{
        font-family: Bakbak One, sans-serif;
        color: #da1e37;
    }

    .bitcointags-errorCode-container{
        padding-left: 15px;
        font-size: 22px;
    }
    
    .bitcointags-errorCode-container *{
        font-size: 22px;
    }

    #bitcointags-errorText{
        padding-left: 15px;
        padding-bottom: 5px;
        font-size: 12px;
    }

    @keyframes bitcointags-replaceContainers{
        0%{
            opacity: 1;
        }
    
        100%{
            opacity: 0;
        }
    }

    @keyframes bitcointags-moveLeft{
        0%{
            transform: translateX(0px);
        }

        15%{
            transform: translateX(2px);
        }

        100%{
            transform: translateX(-60px);
        }
    }

    @keyframes bitcointags-fadeOut{
        0%{
            transform: translateX(0px);
        }
    
        15%{
            transform: translateX(2px) scale(1);
        }
    
        30%{
            opacity: 1;
        }
    
        60%{
            opacity: 0;
        }
    
        100%{
            transform: translateX(-60px) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes bitcointags-fadeIn{
        0%{
            transform: translateX(0px);
        }
    
        15%{
            transform: translateX(2px) scale(0.5);
        }
    
        30%{
            opacity: 0;
        }
    
        60%{
            opacity: 1;
        }
    
        100%{
            transform: translateX(-60px) scale(1);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)



const tag = document.createElement("div")

tag.id = "bitcointag-tag"
tag.innerHTML = `
    <div id="bitcointags-mainContainer">
        <div id="bitcointags-loading-container">
            <div class="bitcointags-loading-blocksContainer">
                <div class="bitcointags-loading-block"></div>
                <div class="bitcointags-loading-block" style="left: 60px;"></div>
                <div class="bitcointags-loading-block bitcointags-active" style="left: 120px;"></div>
                <div class="bitcointags-loading-block" style="left: 180px;"></div>
            </div>
        </div> 
    
        <div id="bitcointags-content-container">
            <div id="bitcointags-main-container">
                <img src="${chrome.runtime.getURL('img/bitcoin_logo.png')}" id="bitcointags-main-btcLogo" alt="Bitcoin logo.">
        
                <div class="bitcointags-main-textContainer">
                    <div class="bitcointags-main-goodsPriceContainer">
                        <span id="bitcointags-main-priceInBtc">0</span>
                        <span id="bitcointags-main-btcUnit">BTC</span>
                    </div>
        
                    <div id="bitcointags-main-btcPriceContainer">
                        <span id="bitcointags-main-btcPrice">0</span>
                        <span id="bitcointags-main-btcPriceCurrency">USD</span>
                    </div>
                </div>
            </div>
    
            <div id="bitcointags-error-container">
                <div class="bitcointags-errorCode-container">
                    <span>Error:</span>
                    <span id="bitcointags-errorCode">0</span>
                </div>
        
                <span id="bitcointags-errorText">Unknown error.</span>
            </div>
        </div>
    </div>
`
document.body.appendChild(tag)



let config = {
    btcModeEnable: 1,
    extensionEnable: 1,
    maxSatoshi: "0.09999999"
}

chrome.storage.sync.get(["bitcointagsConfig"], (response) => {
    let bitcointagsConfig = response.bitcointagsConfig

    if(bitcointagsConfig){
        config = bitcointagsConfig
    }

    if(config.extensionEnable){
        apiCall()
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message == "dataSaved"){
        chrome.storage.sync.get(["bitcointagsConfig"], (response) => {            
            let isChanged = config.extensionEnable == !response.bitcointagsConfig.extensionEnable

            config = response.bitcointagsConfig
            
            getHash(JSON.stringify(config)).then((hash) => {
                sendResponse(hash)
            })

            if(isChanged){
                if(config.extensionEnable){
                    apiCall()
                    return true
                }

                stopExtension()
            }
        })

        return true
    }
})

const getHash = async (input) => {
    let inputBuffer = new TextEncoder().encode(input)

    return crypto.subtle.digest("SHA-1", inputBuffer).then((hash) => {
        window.hash = hash;

        let result = ""
        const view = new DataView(hash)

        for (let i = 0; i < hash.byteLength; i += 4){
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8)
        }

        return result
    })
}

const stopExtension = () => {
    clearInterval(apiCallInterval)

    document.removeEventListener("mouseover", mouseOver)
    window.removeEventListener("mouseout", mouseOut)
}

const mouseOut = (e) => {
    if(e.relatedTarget == null){
        removeTag()
    }
}



const currencies = [
    {ticker: "btc", apiCode: "bitcoin", symbol: ["btc", "₿", "bitcoin", "satoshi", "sat", "sats"]},
    {ticker: "usd", apiCode: "united-states-dollar", symbol: ["usd", "$", "usdollar", "unitedstatesdollar"]},
    {ticker: "czk", apiCode: "czech-republic-koruna", symbol: ["czk", "kč", ",-", "czechkoruna", "czechcrown"]},
    {ticker: "eur", apiCode: "euro", symbol: ["eur", "€", "euro"]},
    {ticker: "jpy", apiCode: "japanese-yen", symbol: ["jpy", "¥", "yen"]},
    {ticker: "gbp", apiCode: "british-pound-sterling", symbol: ["gbp", "£", "pound", "britishpound"]}
]
let data = {
    btc: {
        change: null,
        price: null,
        statusCode: null
    },
    fiat: []
}
let currency
let preferredCurrency = ""
let apiCallInterval

const apiCall = async () => {
    let period = 0
    
    await fullCall()

    apiCallInterval = setInterval(() => {
        period++

        if(period >= 4){  
            fullCall()

            period = 0
            return
        }
        
        partialCall()
    }, 15000)

    document.addEventListener("mouseover", mouseOver)
    window.addEventListener("mouseout", mouseOut)
}

const fullCall = async () => {
    try{
        let usdResponse = await fetch(`https://api.coincap.io/v2/assets/bitcoin`)

        if(usdResponse.status == 200){
            let dataApi = await usdResponse.json()
            let workingArray = []

            data.btc = {
                change: dataApi.data.changePercent24Hr,
                price: dataApi.data.priceUsd,
                statusCode: usdResponse.status
            }
                        
            for(let i = 2; i < currencies.length; i++){
                let statusCode = 200
                
                try{
                    let fiatResponse = await fetch(`https://api.coincap.io/v2/rates/${currencies[i].apiCode}`)

                    if(fiatResponse.status == 200){
                        dataApi = await fiatResponse.json()
            
                        workingArray.push({currency: currencies[i].ticker, rate: dataApi.data.rateUsd, statusCode})
    
                        continue
                    }
                    
                    statusCode = fiatResponse.status
                }catch(err) {
                    statusCode = 999
                }

                workingArray.push({currency: currencies[i].ticker, rate: null, statusCode})
            }
            
            setData(workingArray)

            return 
        }   

        data.btc.statusCode = usdResponse.status

    }catch(err){
        data.btc.statusCode = 999
    }
}

const setData = (workingArray) => {
    if(data.fiat.length != 0){
        workingArray.forEach((obj) => {
            let x = data.fiat.findIndex(c => c.currency == obj.currency)

            if(obj.statusCode == 200){
                data.fiat[x] = obj

                return
            }

            data.fiat[x].statusCode = obj.statusCode
        })

        return
    }

    data.fiat = workingArray
}

const partialCall = async () => {
    try{
        let usdResponse = await fetch(`https://api.coincap.io/v2/assets/bitcoin`)

        if(usdResponse.status == 200){
            let dataApi = await usdResponse.json()
        
            data.btc = {
                change: dataApi.data.changePercent24Hr,
                price: dataApi.data.priceUsd,
                statusCode: usdResponse.status
            }

            if(preferredCurrency != ""){
                let x = data.fiat.findIndex(c => c.currency == preferredCurrency)
                let y = currencies.findIndex(c => c.ticker == preferredCurrency)

                if(x > -1){
                    try{
                        let fiatResponse = await fetch(`https://api.coincap.io/v2/rates/${currencies[y].apiCode}`)

                        if(fiatResponse.status == 200){
                            dataApi = await fiatResponse.json()

                            data.fiat[x].rate = dataApi.data.rateUsd
                            data.fiat[x].statusCode = fiatResponse.status

                            return
                        }
                    }catch(err) {

                    }
                }
            }
            
            return
        }   
    }catch(err){

    }
}



const quotes = [
    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.",
    "La red es robusta en su simplicidad no estructurada.",
    "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16",
    "If you don't believe me or don't get it, I don't have time to try to convince you, sorry.",
    "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "We are all Satoshi!",
    "31/Oct/2008",
    "Running bitcoin!",
    ".sknab rof tuoliab dnoces fo knirb no rollecnahC 9002/naJ/30 semiT ehT",
    "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
    "03/Jan/2009"
]
let ammount
let currentElement = null
let previousElement

const mouseOver = (e) => {
    previousElement = currentElement
    currentElement = e.target
    
    if(currentElement && previousElement){
        if(currentElement.innerText != previousElement.innerText){
            if(isCurrency()){
                currentElement.addEventListener("mouseleave", removeTag)

                generateTag()
                return
            }
            
            for(let i = 0; i < 4; i++){
                if(currentElement.parentElement){
                    currentElement = currentElement.parentElement

                    if(isCurrency()){
                        if(currentElement.innerText != previousElement.innerText){
                            currentElement.addEventListener("mouseleave", removeTag)

                            generateTag()
                        }

                        return
                    }
                }
            }
        }
    }
}

const isCurrency = () => {
    let fullValue = currentElement?.innerText

    if(fullValue){
        if(/\d/.test(fullValue)){
            fullValue = fullValue.toLowerCase().replace(/\s/g, '')

            let currencyValue = fullValue.replace(/(\d),(\d)|(\d)\.(\d)/g, '$1$3$2$4')
            currencyValue = currencyValue.replace(/[0-9]/g, '')

            fullValue = fullValue.replace(currencyValue, '')          

            if(!isZero(fullValue)){
                let symbol

                for(let i = 0; i < currencies.length; i++) {
                    symbol = currencies[i].symbol
                      
                    if(symbol.includes(currencyValue)){
                        if(currencies[i].ticker != "btc"){
                            if(formatCheck(fullValue)){
                                currency = currencies[i].ticker
                                preferredCurrency = currency                              

                                return 1
                            }

                            return 0
                        }

                        console.log(
                            `%cBitcoinTags:%c "${quotes[Math.floor(Math.random() * quotes.length)]}"`,
                            'color: #f7931a; font-size: 12px; font-weight: 900;',
                            'color: #f7931a; font-size: 12px; font-style: italic;'
                        )

                        return 0
                    }
                }
            }
            
        }
    }

    return 0
}

const isZero = (value) => {  
    let regex = /\d/

    if(regex.test(value.replace(/0/g, ''))){
        return 0
    }

    return 1
}

const formatCheck = (fullValue) => {
    let countOfDots = getCount(fullValue, '.')
    let sum = countOfDots + getCount(fullValue, ',')
    
    if(sum){
        if(sum == 1){
            fullValue = fullValue.replace(',', '.')

            if(fullValue.split('.')[1].length == 3){
                fullValue = fullValue.replace('.', '')
            }

            ammount = fullValue
            return 1
        }


        let countOfCommas = sum - countOfDots 

        if(sum == 2){
            fullValue = fullValue.replace(/,/g, '.')
            
            if(!countOfDots || !countOfCommas){
                if(separatorCheck(fullValue)){
                    fullValue = fullValue.replace(/\./g, '')
                    
                    ammount = fullValue
                    return 1
                }

                return 0
            }

            let wVar = fullValue.substring(0, fullValue.lastIndexOf('.'))

            if(separatorCheck(wVar)){               
                fullValue = fullValue.replace(/\D/, '')

                ammount = fullValue
                return 1
            }

            return 0
        }

        
        if(!countOfDots || !countOfCommas){
            fullValue = fullValue.replace(/,/g, '.')

            if(separatorCheck(fullValue)){
                fullValue = fullValue.replace(/\./g, '')
                
                ammount = fullValue
                return 1
            }

            return 0
        }

        if(countOfDots * countOfCommas == sum - 1){
            let wVar = fullValue.replace(/,/g, '.')
            wVar = wVar.substring(0, wVar.lastIndexOf('.'))

            if(separatorCheck(wVar)) {
                wVar = fullValue.replace(/[0-9]/g, '')

                if(getCount(wVar, wVar[wVar.length - 1]) == 1){
                    fullValue = fullValue.replace(/,/g, '.')
                    ammount = fullValue.replace(/\.(?=.*\.)/g, '')

                    return 1
                }
            }
        }

        return 0
    }
    
    ammount = fullValue
    return 1
}

const getCount = (fullValue, char) => {
    return fullValue.length - fullValue.replace(new RegExp(`\\${char}`, 'g'), '').length
}

const separatorCheck = (value) => {   
    let wVar = value.split('.')  

    if(wVar[0].length <= 3){
        for(let i = 1; i < wVar.length; i++){
            if(wVar[i].length != 3){
                return 0
            }
        }

        return 1
    }

    return 0
}

let refreshTimeout

const generateTag = () => {
    currentElement.addEventListener("mousemove", tagMovement)

    tag.style.opacity = "1"
    document.head.appendChild(animationStyles)

    let compressedData = dataCompression()
    
    if(compressedData.productPrice != null){
        compressedData.upDown = getChange()

        if(compressedData.statusCode != 200){
            compressedData.grayscale = "100"
        }

        updateTag(compressedData)
    }
    else{
        updateError(compressedData.statusCode)
    }

    refreshTimeout = setTimeout(() => {
        contentContainer.style.animation = "bitcointags-replaceContainers 0.5s forwards"
    }, 60000)

}

const dataCompression = () => {
    let bitcoinValue = data.btc

    let obj = {
        bitcoinPrice: null,
        productPrice: null,
        statusCode: null,
        upDown: null,
        grayscale: "0"
    }

    if(bitcoinValue.price != null){
        if(currency != "usd"){
            let x = data.fiat.findIndex(c => c.currency == currency)
            let fiatValue = data.fiat[x]

            if(fiatValue.rate != null){
                obj.bitcoinPrice = bitcoinValue.price / fiatValue.rate
                obj.productPrice = ammount / obj.bitcoinPrice
                obj.statusCode = (bitcoinValue.statusCode + fiatValue.statusCode) / 2

                return obj
            }

            obj.statusCode = fiatValue.statusCode

            return obj
        }
       
        obj.bitcoinPrice = bitcoinValue.price
        obj.productPrice = ammount / obj.bitcoinPrice
        obj.statusCode = bitcoinValue.statusCode

        return obj
    }

    obj.statusCode = bitcoinValue.statusCode

    return obj
}

const getChange = () => {
    if(data.btc.change >= 0){
        return "63c132"
    }

    return "da1e37"
}

const removeTag = () => {
    currentElement.removeEventListener("mousemove", tagMovement)
    currentElement.removeEventListener("mouseleave", removeTag)
    
    tag.style.opacity = "0"
    
    clearTimeout(refreshTimeout)
    
    if(document.head.contains(animationStyles)){
        document.head.removeChild(animationStyles)
    }
    
    continueLoading = 1
    
    contentContainer.style.opacity = "0"
    contentContainer.style.animation = ""
    
    mainContainer.style.opacity = "0"
    errorContainer.style.opacity = "0"
    
    loadingContainer.style.opacity = "1"
    loadingContainer.style.animation = ""
}

const tagMovement = (e) => {
    let transX = 5
    let transY = 21
    
    if((e.clientX + 280) > window.innerWidth){
        transX = -105
    }
    
    if((e.clientY + 70) > window.innerHeight){
        transY = -121
    }
    
    tag.style.transform = `translate(${transX}%, ${transY}%)`
    
    tag.style.left = `${e.pageX}px`
    tag.style.top = `${e.pageY}px`
}



const errorContainer = document.getElementById("bitcointags-error-container")
const errorStatus = document.getElementById("bitcointags-errorCode")
const errorText = document.getElementById("bitcointags-errorText")
const mainContainer = document.getElementById("bitcointags-main-container")
const btctgsPriceContainer = document.getElementById("bitcointags-main-btcPriceContainer")
const btctgsLogo = document.getElementById("bitcointags-main-btcLogo")
const btctgsPrice = document.getElementById("bitcointags-main-priceInBtc")
const btctgsUnit = document.getElementById("bitcointags-main-btcUnit")
const btctgsBtcprice = document.getElementById("bitcointags-main-btcPrice")
const btctgsCurrency = document.getElementById("bitcointags-main-btcPriceCurrency")
const errors = [
    {code: 999, message: "Problem with network connection or fetch syntax."},
    {code: 400, message: "Bad Request: Invalid format."},
    {code: 401, message: "Unauthorized: Invalid credentials."},
    {code: 402, message: "Payment Required: Payment is required."},
    {code: 403, message: "Forbidden: You do not have permission."},
    {code: 404, message: "Not Found: Resource not found."},
    {code: 405, message: "Method Not Allowed: Unsupported HTTP method."},
    {code: 406, message: "Not Acceptable: Requested content not available."},
    {code: 407, message: "Proxy Authentication Required: Proxy requires authentication."},
    {code: 408, message: "Request Timeout: Request took too long."},
    {code: 409, message: "Conflict: Data consistency conflict."},
    {code: 410, message: "Gone: Resource has been permanently deleted."},
    {code: 411, message: "Length Required: Content-Length header is required."},
    {code: 412, message: "Precondition Failed: Conditions were not met."},
    {code: 413, message: "Payload Too Large: Request content is too large."},
    {code: 414, message: "URI Too Long: Request URI is too long."},
    {code: 415, message: "Unsupported Media Type: Server does not support this format."},
    {code: 416, message: "Range Not Satisfiable: Range is not satisfiable."},
    {code: 417, message: "Expectation Failed: Expectation was not met."},
    {code: 500, message: "Internal Server Error: Unexpected server error."},
    {code: 501, message: "Not Implemented: Features are not implemented."},
    {code: 502, message: "Bad Gateway: Communication error between servers."},
    {code: 503, message: "Service Unavailable: Server is temporarily offline."},
    {code: 504, message: "Gateway Timeout: Gateway did not receive a timely response."},
    {code: 505, message: "HTTP Version Not Supported: HTTP version is not supported."}
]

const updateError = (statusCode) => {
    for(let i = 0; i < errors.length; i++){
        if(errors[i].code == statusCode){
            errorStatus.innerText = statusCode
            errorText.innerText = errors[i].message

            errorContainer.style.opacity = "1"
            continueLoading = 0

            break
        }
    }
}

const updateTag = (compressedData) => {
    let {grayscale, upDown, bitcoinPrice} = compressedData
    
    btctgsLogo.style.filter = `grayscale(${grayscale}%)`
    btctgsPriceContainer.style.color = `#${upDown}`
    
    btctgsBtcprice.innerText = `${addSpacing(parseInt(bitcoinPrice))}`

    let {unit, productPrice} = getUnitValues(compressedData.productPrice)

    btctgsPrice.innerText = productPrice
    btctgsUnit.innerText = unit
    btctgsCurrency.innerText = currency.toUpperCase()

    mainContainer.style.opacity = "1"
    continueLoading = 0
}

const addSpacing = (input) => {
    return input.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const getUnitValues = (productPrice) => {
    const {btcModeEnable, maxSatoshi} = config

    if(btcModeEnable || productPrice >= maxSatoshi){
        return {unit: "BTC", productPrice: priceFormat(productPrice)}
    }

    return {unit: "sats", productPrice: addSpacing(toSats(productPrice.toFixed(8)))}
}

const priceFormat = (productPrice) => {
    if(productPrice % 1 != 0){
        return productPrice.toFixed(9 - productPrice.toString().indexOf(".")).replace(/0+$/, '').replace(/\.$/, '')
    }

    return addSpacing(productPrice.toFixed(0))
}

const toSats = (input) => {
    let result = "0"

    if(!isZero(input)){
        result = input.replace('.', '')
        
        if(!Number(result[0])){
            let replaceText = "0"
            
            for(let i = 1; i < result.length; i++){
                if(!Number(result[i])){
                    replaceText += '0' 
                    continue
                }

                break
            }

            result = result.replace(replaceText, '')
        }
    }
        
    return result
}



const animationStyles = document.createElement('style')
animationStyles.appendChild(document.createTextNode(`
    .bitcointags-loading-block{
        animation: bitcointags-moveLeft 1.5s forwards;
    }

    .bitcointags-loading-block:first-child{
        animation: bitcointags-fadeOut 1.5s forwards;
    }

    .bitcointags-loading-block:last-child{
        animation: bitcointags-fadeIn 1.5s forwards;
    }
`))

const loadingContainer = document.getElementById("bitcointags-loading-container")
const contentContainer = document.getElementById("bitcointags-content-container")
const blocks = Array.from(document.getElementsByClassName("bitcointags-loading-block"))
let continueLoading = 1

loadingContainer.addEventListener("animationend", (e) => {
    if(e.animationName == "bitcointags-replaceContainers"){
        let isReverse = e.target.style.animation.includes("reverse")

        if(isReverse){
            loadingContainer.style.opacity = "1"
            loadingContainer.style.animation = ""

            if(document.head.contains(animationStyles)){
                document.head.removeChild(animationStyles)
            }
            
            continueLoading = 1
            
            currentElement.removeEventListener("mousemove", tagMovement)

            generateTag()

            return
        }

        loadingContainer.style.opacity = "0"
        loadingContainer.style.animation = ""

        contentContainer.style.animation = "bitcointags-replaceContainers 0.5s forwards reverse"
    }
})

contentContainer.addEventListener("animationend", (e) => {
    if(e.animationName == "bitcointags-replaceContainers"){
        let isReverse = e.target.style.animation.includes("reverse")

        if(isReverse){
            contentContainer.style.opacity = "1"
            contentContainer.style.animation = ""
            return
        }

        contentContainer.style.opacity = "0"
        contentContainer.style.animation = ""

        mainContainer.style.opacity = "0"
        errorContainer.style.opacity = "0"

        loadingContainer.style.animation = "bitcointags-replaceContainers 0.5s forwards reverse"
    }
})

blocks[0].addEventListener("animationend", () => {
    let activeBlock = document.getElementsByClassName("bitcointags-loading-block bitcointags-active")[0]
    let indexOfPrevious = blocks.indexOf(activeBlock) - 1

    if(indexOfPrevious > -1){
        blocks[indexOfPrevious].classList.add("bitcointags-active")
        activeBlock.classList.remove("bitcointags-active")

        if(!indexOfPrevious){
            blocks[blocks.length - 1].classList.add("bitcointags-active")
        }
        
        repeatLoadingStep()

        return
    }

    blocks[blocks.length - 2].classList.add("bitcointags-active")
    blocks[blocks.length - 1].classList.remove("bitcointags-active")
    blocks[0].classList.remove("bitcointags-active")

    repeatLoadingStep()
})

const repeatLoadingStep = () => {
    document.head.removeChild(animationStyles)

    if(continueLoading){
        setTimeout(() => {
            document.head.appendChild(animationStyles)
        }, 3000)

        return
    }

    loadingContainer.style.animation = "bitcointags-replaceContainers 0.5s forwards"
}










/*

    Created by warezoid with the love of freedom and numbers.
    
    I would like to thank my friends for their help in developing Bitcointags, whether it be through advice, design choices or sharing their opinions. And, of course, to Satoshi Nakamoto for Bitcoin, a project that opened the door to a world of possibilities and financial freedom. We are all Satoshi.





    MIT License

    Copyright © 2024 warezoid

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.





    SOURCES

    Sources can be seen as links to products used in Bitcointags, including APIs, graphics, research tools and of course Bitcoin, without which this project and many others would not exist. I have chosen not to list elementary products such as HTML, CSS, JavaScript and many others.
    
    1. Graphics
        1.1. Bitcoin - logo and product as a whole: [ bitcoin.org ]
        1.2. Github - logo and space for collaboration: [ github.com ]
        1.3. Icons8 - colourful github logo: [ icons8.com ]
        1.4. Google fonts - font used in Bitcointags: [ fonts.google.com ]
            1.4.1 Bakbak One - specific font used in Bitcointags: [ fonts.google.com/specimen/Bakbak+One?query=Bakbak+one ]
        1.5. Figma - Bitcointags design: [figma.com]

    2. APIs
        2.1. Coincap API 2.0 - used to get the price of bitcoin and rate of fiat currencies: [ docs.coincap.io ]
        2.2. Web Crypto API - used to calculate the checksum: [ www.w3.org/TR/WebCryptoAPI ]
        2.3. Chrome APIs
            2.3.1. Storage API - used to save the user profile: [ developer.chrome.com/docs/extensions/reference/api/storage ]
            2.3.2. Tabs API - used for communication between popup and backround script: [ developer.chrome.com/docs/extensions/reference/api/tabs ]
            2.3.3. Runtime API - used for communication between popup and backround script: [ developer.chrome.com/docs/extensions/reference/api/runtime ]

    3. Research tools
        3.1. ChatGPT: [ chatgpt.com ]
        3.2. Stackoverflow: [ stackoverflow.com ]
        3.3. DeepL: [ https://www.deepl.com ]
        3.4. And the internet itself.

*/