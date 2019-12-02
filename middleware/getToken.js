const jwt = require('jsonwebtoken')

const decodeJWT = (jwtRequest='')=>{
    const code = jwtRequest.replace('bearer ', "")
    return jwt.decode(code)
}

module.exports={
    decodeJWT,
}