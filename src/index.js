const express = require('express')
const { database, auth } = require('./firebase.config')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config() // Load environment variables from .env file
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res) => {
    res.send('Ready to call API!')
})

app.get('/getDB', async (req, res) => {
    const snapshot = await database.get()
    const list = snapshot.docs.map((doc) => ({ ...doc.data() }))
    res.send(list)
})

app.post('/getuid', (req, res) => {
    uid = req.body.uid ?? ''
    firebaseToken = req.body.firebaseToken ?? ''

    if (!uid || !firebaseToken) {
        return res.status(400).send({
            msg: 'Bad request',
        })
    }

    auth
        .verifyIdToken(firebaseToken)
        .then((decodedToken) => {
            const decodedUid = decodedToken.uid
            if (uid != decodedUid) {
                return res.status(401).send({
                    msg: 'token ผิด',
                })
            }
        })
        .catch((error) => {
            return res.status(401).send({
                msg: 'token ผิด',
            })
        })

    database
        .where('uid', '==', uid)
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.empty) {
                return res.status(404).send({
                    msg: 'Not found',
                })
            } else {
                querySnapshot.forEach(function (doc) {
                    const token = jwt.sign(doc.data(), 'catzero1337')

                    return res.status(200).send({
                        token: token,
                    })
                })
            }
        })
        .catch(function (error) {
            console.log('Error getting documents: ', error)
            return res.status(400).send({
                msg: 'Bad request',
            })
        })
})

app.post('/register', async (req, res) => {
    const data = req.body
    console.log(data)
    await database.add(data)
    const token = jwt.sign(data, 'catzero1337')
    res.send({ token: token })
})

app.listen(port, () => console.log(`💐 Server is running at ${port}`))
