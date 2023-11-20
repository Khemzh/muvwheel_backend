const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  let token = req.body.token ?? ''

  if (!token) {
    return res.status(403).json({ msg: 'token not found' })
  } else {
    jwt.verify(token, 'catzero1337', (err, result) => {
      if (err) return res.status(403).json({ msg: 'invalid token' })

      req.jwt = result
      next()
    })
  }
}

module.exports = authenticateToken
