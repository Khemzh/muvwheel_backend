const express = require('express')
const database = require('./firebase.config')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res) => {
  const snapshot = await database.get()
  const list = snapshot.docs.map((doc) => ({ ...doc.data() }))
  res.send(list)
})

app.post('/register', async (req, res) => {
  const data = req.body
  await database.add(data)
  res.send({ msg: 'User Added' })
})

app.listen(3001, () => console.log('💐 Server is running at 3001'))
