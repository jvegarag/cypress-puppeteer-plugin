const puppeteer = require('puppeteer-core');

const cdpPort = 40010 + Math.round(Math.random() * 25000)
let page = null, browser = null, globalPage = null

function browserLaunchHandler(browser = {}, args) {
    console.log(browser);
    if (!['chrome'].includes(browser.family)) {
        return console.log(` [cypress-log-to-output] Warning: An unsupported browser family was used, output will not be logged to console: ${browser.family}`)
    }

    if (browser.family === 'chrome') {
        args.push(`--remote-debugging-port=${cdpPort}`)
    }

    setTimeout(tryCdpConnection, 500);
    return args;
};


async function tryCdpConnection() {
    console.info(`Connection Ok to port ${cdpPort}`)

    try {
        browser = await connectPuppeteer();
        // console.info('browser session initialized', browser)
    } catch(error) {
        console.info('CDP debugger port not available yet. Reconnecting...')
        setTimeout(tryCdpConnection, 500);
    }
};

async function connectPuppeteer() {
    const browserURL = 'http://127.0.0.1:' + cdpPort;
    return puppeteer.connect({browserURL, defaultViewport: null});
}

async function initPuppeteerPage() {
    if (!browser) {
        throw Error('Puppeteer connection failed')
    }

    // TODO detect cypress headless mode
    const openTabs = await browser.targets()
    globalPage = await openTabs.find(p => p._targetInfo.type === 'page').page()

    const iframeElement = await globalPage.$('iframe.aut-iframe')
    return iframeElement.contentFrame()
}

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}


function install(on) {
    on('before:browser:launch', browserLaunchHandler)

    on('task', {

        async initPage()  {
            page = await initPuppeteerPage()
            return true
        },

        /**
         * @param {number} x
         * @param {number} y
         * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
         */
        async click(selector) {
            await page.waitFor(selector);
            const el = await page.$(selector)
            await el.click()
            return true
        },

        async dragDrop({selector, x, y, options}) {

            await page.waitFor(selector)
            const el = await page.$(selector)
            const bb = await el.boundingBox()
            const srcX = bb.x + bb.width / 2
            const srcY = bb.y + bb.height / 2
            // move mouse to the center of the element
            await globalPage.mouse.move(srcX, srcY);
            await delay(100)
            await globalPage.mouse.down();
            await globalPage.mouse.move(srcX + x, srcY + y, options);
            await delay(100)
            await globalPage.mouse.up();
            await delay(100)

            return true;
        }

    });
}

module.exports = {
    install
}