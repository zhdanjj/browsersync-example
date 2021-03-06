
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
const babel = require('@babel/core')
const sass = require('node-sass')
const Twig = require('twig')
const fs = require('fs')

Twig.cache(false)

module.exports = {
    "ui": {
        "port": 3001
    },
    "files": [
        'dist/*',
        {
            match: ['src/js/script.js'],
            fn: (event, file) => {
                const transformed = babel.transformFileSync('src/js/script.js', {
                    presets: ['@babel/preset-env']
                })
                fs.writeFileSync('dist/script.js', transformed.code)
            }
        },
        {
            match: ['src/index.twig'],
            fn: (event, file) => {
                const data = JSON.parse(fs.readFileSync('src/data.json').toString())
                Twig.renderFile('src/index.twig', data, (err, html) => {
                    if (err) {
                        console.log(err)
                    } else {
                        fs.writeFileSync('dist/index.html', html)
                    }
                })
            }
        },
        {
            match: ['src/scss/styles.scss'],
            fn: (event, file) => {
                const css = sass.render({
                    file: file
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        fs.writeFileSync('dist/styles.css', result.css)
                    }
                })
            }
        },
    ],
    "watchEvents": [
        "change"
    ],
    "watch": false,
    "ignore": [],
    "single": false,
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": './dist',
    "proxy": false,
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
    "rewriteRules": [],
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
    "plugins": [],
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