# Bitcointags documentation



## Abstract
This document describes the technically key parts of the Bitcointags program. I have tried to select parts that might cause confusion for other developers when developing Bitcointags. An [overview of contents](#table-of-contents) can be found below. For practical information, the [README.md](../README.md) file can be visited.

## Table of Contents
- [Introduction](#introduction)
- [Terminology](#terminology)
- [Functional Principles](#functional-principles)
    - [Supported currencies](#supported-currencies)
- [Sources](#sources)
- [Acknowledgements](#acknowledgements)



## Introduction




## Terminology




## Functional Principles

### Supported currencies.
When Bitcointags is run, variables are initialized and declared. One of these variables is an array of currencies that Bitcointags supports. Below you can find a list of these currencies.

**Supported currencies: *US dollar (USD), Czech koruna (CZK), euro (EUR), Japanese yen (JPY), British pound (GBP).***

The supported currencies were carefully selected to make Bitcointags as globally compatible as possible, while avoiding collisions and not overloading the program unnecessarily.

Presented below is the code that initializes and declares the "**currencies**" variable.

```javascript
const currencies = [
    {ticker: "btc", apiCode: "bitcoin", symbol: ["btc", "₿", "bitcoin", "satoshi", "sat", "sats"]},
    {ticker: "usd", apiCode: "united-states-dollar", symbol: ["usd", "$", "usdollar", "unitedstatesdollar"]},
    {ticker: "czk", apiCode: "czech-republic-koruna", symbol: ["czk", "kč", ",-", "czechkoruna", "czechcrown"]},
    {ticker: "eur", apiCode: "euro", symbol: ["eur", "€", "euro"]},
    {ticker: "jpy", apiCode: "japanese-yen", symbol: ["jpy", "¥", "yen"]},
    {ticker: "gbp", apiCode: "british-pound-sterling", symbol: ["gbp", "£", "pound", "britishpound"]}
]


//script.js line 365
```

"**Currencies**" is an array of objects. Each object represents an individual currency, structured as follows:

```
{ticker, apiCode, symbol}
```

"**Ticker**" serves as a unique id of the currency and also passes its value to the "**currency**" variable, which is further used by Bitcointags.

"**Apicode**" is a currency id according to the *CoinCap standard*. By adding this variable to the URL to which a GET request is sent, information about different currencies can be obtained. For more information about the CoinCap API, please see their **[official documentation](https://docs.coincap.io)** or the "**[Getting the financial data](#getting-the-financial-data)**" section.

"**Symbol**" is an array of strings that represent the potential display of a currency on a page.



### Getting the financial data.
Bitcointags calls the [CoinCap API 2.0](https://docs.coincap.io) at regular intervals to get informations about the price of bitcoin and the exchange rates of the fiat currencies it supports.

The interval between calls to the api interface is 15,000 ms (15 s). Once upon 60,000 ms (1 min) there is a full API call, which call all currencies. For a better understanding, the diagram below can be used.

![API call diagram.](img/diagram_1.svg)

Below is a diagram converted into code.

```javascript
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


//script.js line 385
```






### Communication and data manipulation.
Saving and loading data.
Communication between content scripts and popup.

### Algorithms.
isCurrency algorithm.
getAmount algorithm.

### GUI.
Display tag.
Loading animation.
Switching scenes.












## Sources
Sources can be seen as links to products used in Bitcointags, including APIs, graphics, research tools, and of course Bitcoin, without which this project and many others would not exist. I have chosen not to list elementary products such as HTML, CSS, JavaScript, and many others.

- **Graphics**
    - Bitcoin - logo and product as a whole: [bitcoin.org](https://bitcoin.org)
    - Github - logo and space for collaboration: [github.com](https://github.com)
    - Icons8 - colourful github logo: [icons8.com](https://icons8.com)
    - Google Fonts - font used in Bitcointags: [fonts.google.com](https://fonts.google.com/)
        - Bakbak One - specific font used in Bitcointags: [Bakbak One - Google Fonts](https://fonts.google.com/specimen/Bakbak+One?query=Bakbak+one)
    - Other graphical elements used in the Bitcointags project, such as alert and checkmark icon, along with all Bitcointags logos, are also licensed under the [MIT license](https://en.wikipedia.org/wiki/MIT_License) and are free to use.

- **APIs**
    - CoinCap API 2.0 - used to get the price of bitcoin and rate of fiat currencies: [docs.coincap.io](https://docs.coincap.io)
    - Web Crypto API - used to calculate the checksum: [www.w3.org/TR/WebCryptoAPI](https://www.w3.org/TR/WebCryptoAPI)
    - Chrome APIs
        - Storage API - used to save the user profile: [developer.chrome.com](https://developer.chrome.com/docs/extensions/reference/api/storage)
        - Tabs API - used for communication between popup and background script: [developer.chrome.com](https://developer.chrome.com/docs/extensions/reference/api/tabs)
        - Runtime API - used for communication between popup and background script: [developer.chrome.com](https://developer.chrome.com/docs/extensions/reference/api/runtime)

- **Research tools**
    - ChatGPT: [chatgpt.com](https://chatgpt.com)
    - Stack Overflow: [stackoverflow.com](https://stackoverflow.com)
    - DeepL: [deepl.com](https://www.deepl.com)
    - And the internet itself.



## Acknowledgements
I would like to thank my friends for their help in developing Bitcointags, whether it be through advice, design choices or sharing their opinions. And, of course, to Satoshi Nakamoto for Bitcoin, a project that opened the door to a world of possibilities and financial freedom. We are all Satoshi. :star:



###### Created by warezoid with the love of freedom and numbers.