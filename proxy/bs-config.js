
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
const fs = require('fs')

const buf = fs.readFileSync('auth.txt')
const auth = buf.toString('base64', 0, buf.length - 1)

const cookies = require('./cookies.json')

const Cookie = {
    parse(str) {
        if (!str) {
            return {}
        }
        return Object.assign(
            {}, 
            ...str.split('; ').map(v => v.split('=')).map(([k, v]) => ({[k]: v}))
        )
    },
    serialize(obj) {
        return Object.entries(obj).map(v => v.join('=')).join('; ')
    }
}

module.exports = {
    "ui": {
        "port": 3001
    },
    "files": false,
    "watchEvents": [
        "change"
    ],
    "watch": false,
    "ignore": [],
    "single": false,
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": false,
    "proxy": {
        target: "http://streetbeat8.dev3.skillum.ru/",
        reqHeaders(config) {
            return {
                "Authorization": "Basic " + auth
            }
        },
        proxyReq: [
            (proxyReq) => {
                const c = proxyReq._headers.cookie
                let tmp = {}
                if (c) {
                    tmp = Cookie.parse(c)
                }
                const newCookie = Cookie.serialize(Object.assign(tmp, cookies))
                proxyReq.setHeader('Cookie', newCookie)
            }
        ]
    },
    "port": 3000,
    "middleware": false,
    "serveStatic": [],
    "ghostMode": {
        "clicks": true,
        "scroll": true,
        "location": true,
        "forms": {
            "submit": true,
            "inputs": true,
            "toggles": true
        }
    },
    "logLevel": "info",
    "logPrefix": "Browsersync",
    "logConnections": false,
    "logFileChanges": true,
    "logSnippet": true,
    "rewriteRules": [
        {
            match: '</body>',
            fn(req, res, match) {
                return fs.readFileSync('snippet.html').toString() + match
            }
        }
    ],
    "open": false,
    "browser": "default",
    "cors": false,
    "xip": false,
    "hostnameSuffix": false,
    "reloadOnRestart": false,
    "notify": true,
    "scrollProportionally": true,
    "scrollThrottle": 0,
    "scrollRestoreTechnique": "window.name",
    "scrollElements": [],
    "scrollElementMapping": [],
    "reloadDelay": 0,
    "reloadDebounce": 500,
    "reloadThrottle": 0,
    "plugins": [
        {
            module: '../node_modules/bs-latency/',
            options: {
                routes: [
                    {
                        route: '/order/cart/',
                        latency: 5000,
                        active: true
                    }
                ]
            }
        }
    ],
    "tunnel": 'myname',
    "injectChanges": true,
    "startPath": null,
    "minify": true,
    "host": null,
    "localOnly": false,
    "codeSync": true,
    "timestamps": true,
    "clientEvents": [
        "scroll",
        "scroll:element",
        "input:text",
        "input:toggles",
        "form:submit",
        "form:reset",
        "click"
    ],
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    },
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    },
    "injectNotification": false
};