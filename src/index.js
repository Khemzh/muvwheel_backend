const express = require('express')
const { database, auth, favDatabase, hisdb } = require('./firebase.config')
const cors = require('cors')
const middleware = require('./middleware/auth')
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
                msg: error.message,
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
                let token = ''
                let name = ''
                let surname = ''
                let ph = ''
                let date = ''
                let gender = ''
                querySnapshot.forEach(function (doc) {
                    token = jwt.sign(doc.data(), process.env.JWT_SECRET)
                    name = doc.data().name
                    surname = doc.data().surname
                    ph = doc.data().ph
                    date = doc.data().date
                    gender = doc.data().date
                })
                return res.status(200).send({
                    token: token,
                    name: name,
                    surname: surname,
                    ph: ph,
                    date: date,
                    gender: gender,
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

app.post('/userupdate', middleware, async (req, res) => {
    const data = req.body
    console.log(data)
    await database
        .where('uid', '==', data.uid)
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.empty) {
                return res.status(404).send({
                    msg: 'Not found',
                })
            } else {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update(data)
                })
                return res.status(200).send({
                    msg: 'ok',
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
app.post('/history', middleware, async (req, res) => {
    const data = req.body
    console.log(data)
    if (data.name) {
        await hisdb
            .where('uid', '==', data.uid)
            .get()
            .then(async function (querySnapshot) {
                if (querySnapshot.empty) {
                    await hisdb.add({
                        uid: data.uid,
                        name: data.name
                    })
                    return res.status(200).send({
                        msg: 'created',
                    })
                } else {
                    querySnapshot.forEach(function (doc) {
                        doc.ref.update(data)
                    })
                    return res.status(200).send({
                        msg: 'updated',
                    })
                }
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
                return res.status(400).send({
                    msg: 'Bad request',
                })
            })
    }else{
        var ret = ''
        await hisdb
            .where('uid', '==', data.uid)
            .get()
            .then(async function (querySnapshot) {
                if (querySnapshot.empty) {
                    return res.status(404).send({
                        msg: 'not found data',
                    })
                } else {
                    querySnapshot.forEach(function (doc) {
                        ret = doc.data().name
                    })
                    return res.status(200).send({
                        msg: 'ok',
                        nameplace: ret
                    })
                }
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
                return res.status(400).send({
                    msg: 'Bad request',
                })
            })
    }

})


app.post('/register', async (req, res) => {
    const data = req.body
    console.log(data)
    await database.add(data)
    const token = jwt.sign(data, process.env.JWT_SECRET)
    res.send({ token: token })
})

app.post('/favourite/create', middleware, async (req, res) => {
    let nameplace = req.body.name ?? ''

    if (!nameplace) {
        return res.status(400).send({
            msg: 'Bad request',
        })
    }

    console.log(nameplace)
    await favDatabase.add({
        uid: req.body.uid,
        nameplace: nameplace,
    })

    res.send({ msg: 'ok' })
})

app.post('/favourite/remove', middleware, async (req, res) => {
    let nameplace = req.body.name ?? ''

    if (!nameplace) {
        return res.status(400).send({
            msg: 'Bad request',
        })
    }

    console.log(nameplace)

    // Delete documents where uid and nameplace are the same
    await favDatabase
        .where('uid', '==', req.body.uid)
        .where('nameplace', '==', nameplace)
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.empty) {
                return res.status(404).send({
                    msg: 'Not found',
                })
            } else {
                // Delete each document
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete()
                })

                return res.status(200).send({
                    msg: 'ok',
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

app.post('/favourite/get', middleware, (req, res) => {
    favDatabase
        .where('uid', '==', req.body.uid)
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.empty) {
                return res.status(404).send({
                    msg: 'Not found',
                })
            } else {
                let list = []

                querySnapshot.forEach(function (doc) {
                    list.push(doc.data())
                })

                return res.status(200).send({
                    data: list,
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

app.listen(3001, () => console.log('💐 Server is running at 3001'))
