const extensionEnableBtn = document.getElementById("extensionEnable")
const btcModeEnableBtn = document.getElementById("btcModeEnable")
const textboxContainer = document.getElementById("main-textbox-container")

let extensionEnable = 1
let btcModeEnable = 1

extensionEnableBtn.addEventListener("click", (e) => {
    if(!e.target.children.length){
        let classList = e.target.classList
        let value = Number(classList[0])

        if((value && !extensionEnable) || (!value && extensionEnable)){
            extensionEnable = value

            classList.add("active")
            extensionEnableBtn.children[value].classList.remove("active")

            if(!value){
                btcModeEnableBtn.style = `
                    pointer-events: none; 
                    opacity: 0.25;
                `

                if(!btcModeEnable){
                    textboxContainer.style = `
                        pointer-events: none; 
                        opacity: 0.25;
                    `
                }

                return
            }

            btcModeEnableBtn.style = `
                pointer-events: auto; 
                opacity: 1;
            `

            if(!btcModeEnable){
                textboxContainer.style = `
                    pointer-events: auto; 
                    opacity: 1;
                `
            }
        }
    }
})



const saveBtnContainer = document.getElementById("saveBtn-container")

btcModeEnableBtn.addEventListener("click", (e) => {
    if(!e.target.children.length){
        let classList = e.target.classList
        let value = Number(classList[0])

        if((value && !btcModeEnable) || (!value && btcModeEnable)){
            if(value && isZero(input)){
                textboxValue.style.animation = "errorShake 0.2s 2"
                return
            }
            
            btcModeEnable = value

            classList.add("active")
            btcModeEnableBtn.children[value].classList.remove("active")

            if(!value){
                textboxContainer.style = `
                    pointer-events: auto; 
                    opacity: 1;
                `
                saveBtnContainer.style.animation = "smoothOut 0.5s forwards"

                return
            }

            textboxContainer.style = `
                pointer-events: none; 
                opacity: 0;
            `
            saveBtnContainer.style.animation = "smoothIn 0.5s forwards"
        }
    }
})



const textboxText = document.getElementById("textbox-text")

textboxText.addEventListener("mouseover", () => {
    textboxValue.style.animation = "slideDown 0.5s forwards"
})
textboxText.addEventListener("mouseleave", () => {
    textboxValue.style.animation = "slideUp 0.5s forwards"
})



const textboxValue = document.getElementById("textbox-value")
const range = document.createRange()
const selection = window.getSelection()

let input = textboxValue.innerText.replace(/[^\d]+/g, '')
let previousInput

textboxValue.addEventListener("animationend", (e) => {
    if(e.animationName == "errorShake"){
        textboxValue.style.animation = ""
    }
})

textboxValue.addEventListener("input", (e) => {
    previousInput = input
    input = removeLeadingZeros(e.target.innerText.replace(/[^\d]+/g, ''))
    
    if(!input.length || isZero(input)){
        input = '0'
    }
    
    if(input.length > 9){   
        input = previousInput
    }

    e.target.innerText = addSpacing(input)

    range.setStart(textboxValue, textboxValue.childNodes.length)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
})

const removeLeadingZeros = (input) => {
    return input.replace(/\b0+(\d)/g, '$1')
}

const isZero = (value) => {  
    let regex = /\d/
    
    if(regex.test(value.replace(/0/g, ''))){
        return 0
    }
    
    return 1
}

const addSpacing = (input) => {
    return input.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}



const formContainer = document.getElementById("main-form-container")
const loadingContainer = document.getElementById("main-loading-container")

formContainer.addEventListener("animationend", (e) => {
    if(e.animationName == "replaceContainers"){
        let isReverse = e.target.style.animation.includes("reverse")
        formContainer.style.animation = ""
        
        if(isReverse){
            formContainer.style = `
                pointer-events: auto; 
                opacity: 1;
            `

            if(extensionEnable && !btcModeEnable){
                textboxContainer.style.pointerEvents = "auto"
            }
        
            return
        }

        formContainer.style.opacity = "0"
        loadingContainer.style.animation = "replaceContainers 0.5s forwards reverse"
    }
})



const mainStatusContainer = document.getElementById("main-status-container")

loadingContainer.addEventListener("animationend", (e) => {
    if(e.animationName == "replaceContainers"){
        let isReverse = e.target.style.animation.includes("reverse")
        loadingContainer.style.animation = ""
        
        if(isReverse){
            loadingContainer.style.opacity = "1"

            setTimeout(() => {
                document.head.appendChild(styleElement)
            }, 1000)
        
            return
        }

        loadingContainer.style.opacity = "0"
        mainStatusContainer.style.animation = "replaceContainers 0.5s forwards reverse"
    }
})



mainStatusContainer.addEventListener("animationend", (e) => {
    if(e.animationName == "replaceContainers"){
        let isReverse = e.target.style.animation.includes("reverse")
        mainStatusContainer.style.animation = ""

        if(isReverse){
            mainStatusContainer.style.opacity = "1"

            if(processingStatus == 1){
                processingStatus = -2

                setTimeout(() => {
                    mainStatusContainer.style.animation = "replaceContainers 0.5s forwards"
                }, 1000)

                return
            }

            setTimeout(() => {
                window.close()
            }, 1000)
        
            return
        }

        mainStatusContainer.style.opacity = "0"
        statusElement.style.display = "none"

        formContainer.style.animation = "replaceContainers 0.5s forwards reverse"
    }
})



const styleElement = document.createElement('style')
const cssText = `
    .block{
        animation: moveLeft 2s forwards;
    }

    .block:first-child{
        animation: fadeOut 2s forwards;
    }

    .block:last-child{
        animation: fadeIn 2s forwards;
    }

    .hashText:first-child{
        animation: slideOut 2s forwards;
    }
    
    .hashText:last-child{
        animation: slideIn 2s forwards;
    }
`
styleElement.appendChild(document.createTextNode(cssText))

const blocks = Array.from(document.getElementsByClassName("block"))
const hashes = [
    "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
    "000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd"
    ]
const hashText = document.getElementsByClassName("hashText")
let hashTextIndex = hashes.length - 2
let activeHashIndex = hashes.length - 1
let continueLoading = 1
let statusElement

blocks[0].addEventListener("animationend", () => {
    let activeBlock = document.getElementsByClassName("block active")[0]
    let indexOfPrevious = blocks.indexOf(activeBlock) - 1

    if(indexOfPrevious > -1){
        blocks[indexOfPrevious].classList.add("active")
        activeBlock.classList.remove("active")

        if(!indexOfPrevious){
            hashTextIndex = hashes.length - 1
            blocks[blocks.length - 1].classList.add("active")
        }

        activeHashIndex--
        
        repeatLoadingStep()

        return
    }

    blocks[blocks.length - 2].classList.add("active")
    blocks[blocks.length - 1].classList.remove("active")
    blocks[0].classList.remove("active")

    activeHashIndex = hashes.length - 1

    repeatLoadingStep()
})

const repeatLoadingStep = () => {
    hashText[0].innerText = `0x${hashes[activeHashIndex]}`

    if(activeHashIndex){
        hashTextIndex = activeHashIndex - 1
    }
    
    hashText[1].innerText = `0x${hashes[hashTextIndex]}`

    document.head.removeChild(styleElement)

    if(continueLoading){
        setTimeout(() => {
            document.head.appendChild(styleElement)
        }, 3000)

        return
    }

    showStatus()
}

const showStatus = () => {
    statusElement = document.getElementById("error-status-container")
    
    if(processingStatus > 0){
        statusElement = document.getElementById("ok-status-container")
    }

    processingStatus = Math.abs(processingStatus)

    statusElement.style.display = "flex"
    loadingContainer.style.animation = "replaceContainers 0.5s forwards"
}



let processingStatus = -1

setTimeout(() => {
    document.head.appendChild(styleElement)

    chrome.storage.sync.get(["bitcointagsConfig"], (response) => {
        let bitcointagsConfig = response.bitcointagsConfig

        if(bitcointagsConfig){
            extensionEnable = bitcointagsConfig.extensionEnable
            btcModeEnable = bitcointagsConfig.btcModeEnable

            input = toSats(bitcointagsConfig.minSatoshi)
            previousInput = input

            setDefault()
        }
        
        continueLoading = 0
    })
}, 1000)

const setDefault = () => {
    textboxValue.innerText = addSpacing(input)

    if(!btcModeEnable){
        btcModeEnableBtn.children[Number(!btcModeEnable)].classList.add("active")
        btcModeEnableBtn.children[btcModeEnable].classList.remove("active")

        textboxContainer.style.opacity = "1"

        saveBtnContainer.style.animation = "smoothOut 0.5s forwards"
    }

    if(!extensionEnable){
        extensionEnableBtn.children[Number(!extensionEnable)].classList.add("active")
        extensionEnableBtn.children[extensionEnable].classList.remove("active")

        btcModeEnableBtn.style = `
            pointer-events: none; 
            opacity: 0.25;
        `

        if(!btcModeEnable){
            textboxContainer.style.opacity = "0.25"
        }
    }

    processingStatus = 1
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



const saveBtn = document.getElementById("saveBtn")

saveBtn.addEventListener("click", () => {    
    if(!isZero(input)){   
        formContainer.style.pointerEvents = "none"
        textboxContainer.style.pointerEvents = "none"
    
        formContainer.style.animation = "replaceContainers 0.5s forwards"
        saveBtn.style.animation = "squeeze 0.5s"
    
        saveConfig()

        return
    }

    textboxValue.style.animation = "errorShake 0.2s 2"
})

const saveConfig = () => {
    let obj = {
        btcModeEnable,
        extensionEnable,
        minSatoshi: toBtc(input)
    }
    
    chrome.storage.sync.set({"bitcointagsConfig": obj}, () => {
        chrome.tabs.query({active: true, currentWindow: true}).then((tab) => {
            chrome.tabs.sendMessage(tab[0].id, "dataSaved", (response) => {
                getHash(JSON.stringify(obj)).then((hash) => {
                    if(response == hash){
                        processingStatus = 2
                    }
                    
                    continueLoading = 0
                })
            })
        })
    })
}

const toBtc = (input) => {
    let result = "0"

    if(!isZero(input)){
        if(input.length < 9){
            input = `${"0".repeat(9 - input.length)}${input}`
        }

        result = `${input[0]}.${input.slice(1)}`
    }
    
    return result
}

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