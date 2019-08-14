const Twig = require('twig')
const fs = require('fs')

console.log(twig)

Twig.renderFile('src/index.twig', {}, function(err, html) {
    console.log(html)
})
