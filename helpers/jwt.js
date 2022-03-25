const jwt = require('jsonwebtoken')

function generateToken(payload) {
    const access_token = jwt.sign(payload,'rahasianya')
    return access_token
}

function tokenCheck(access_token) {
    const payload = jwt.verify(access_token, 'rahasianya')
    return payload
}

module.exports = {
    generateToken,
    tokenCheck
}