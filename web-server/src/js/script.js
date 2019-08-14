const scripts = {
    init() {
        const year = 'es2015'
        console.log(`Hello ${year}!`)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    scripts.init()
})
