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

console.log(Cookie.parse(''))
