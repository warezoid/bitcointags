# Bitcointags
Bitcointags is a browser extension that converts the fiat price of a product or service within a selected HTML entity into an approximate bitcoin price.

**Use case**
Many e-shops do not yet accept payments in bitcoins, and if they do, most do not display the price of the product or service in bitcoins. For this reason, the Bitcointags project was created.

**Disclaimer**
The price returned by Bitcointags is indicative only. The exchange rate is constantly changing and bitcoin does not have a uniform price. Therefore, the price may vary when the e-shop is billed!



## Coming soon...
- Complete extensive documentation.
- Firefox version.
- Select&convert mode.
- It tells you whether the e-shop accepts bitcoins.



## License
Bitcointags is licensed under the MIT license. The full text of the license can be found [here](./LICENSE.md). For more information, please visit [Wikipedia - MIT License](https://en.wikipedia.org/wiki/MIT_License).



## Installation
Bitcointags is currently only available for browsers with [Chromium Core](https://github.com/chromium/chromium) and is not listed in the Chrome Web Store. The reason for this can be found in the [FAQ](#faq) section. 

1. Source files installation
Click **Code** and select **Download ZIP** or use the command line with [Git](https://git-scm.com/). **Unzip the downloaded file.**
    ```
    git clone https://github.com/warezoid/bitcointags.git
    ```

2. Extensions window
Open your browser and in the address bar type:
    ```
    <your_browser>://extensions
    ```
    A few examples:
    ```
    chrome://extensions
    edge://extensions
    opera://extensions
    ```

3. Developer mode
Find **Developer mode** and if it is not activated, activate it.

4. Adding Bitcointags
After that click the **Load unpacked** button and select the **src** folder located in the folder you downloaded in the **first step**.

5. Bitcointags is ready to use.



## FAQ
- ***I found a bug, what should I do?***
    - If you find or have found a bug, I and perhaps the future community would certainly appreciate it if you let us know about it. You can do so in the **Issues** tab. If you have found a solution to the bug, feel free to share it.

- ***Why aren't Bitcointags in the Chrome Web Store?***
    - For admission to the Developer program, age verification is required. However, I decline to submit personal documents to Google, and therefore choose not to enroll in the Developer program. Both I and the community would certainly appreciate if a publisher could be found to keep the Bitcointags in the Chrome Web Store up to date.

- ***What about the Firefox version?***
    - A Firefox version is coming soon. But I decided to develop for Chrome first, because it's probably still the most widely used browser.

- ***Why Bitcointags doesn't have a light mode?***
    - I couldn't come up with a ligth mode design that I liked enough.



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
    - Coincap API 2.0 - used to get the price of bitcoin and rate of fiat currencies: [docs.coincap.io](https://docs.coincap.io)
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