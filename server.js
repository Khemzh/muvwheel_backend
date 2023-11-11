const users = require('./db')
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

function updateDbJson(data) {
  fs.writeFileSync('./db.json', JSON.stringify(data, null, 2), 'utf8');
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello! world");
});

app.listen(port, () => {
  console.log("Starting node.js at port " + port);
// })
// .on('error', (err) => {
//   if (err.code === 'EADDRINUSE') {
//     console.log(`Port ${port} is already in use`);
//     // You can choose another port or handle the error as needed.
//   } else {
//     console.error(err);
//   }
});

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/:id', (req, res) => {
  res.json(users.find(user => user.id === Number(req.params.id)))
})

app.post('/users', (req, res) => {
  users.push(req.body)
  let json = req.body
  res.send(`Add new user '${json.username}' completed.`)
  updateDbJson(users);
})

// app.put('/users/:id', (req, res) => {
//   const updateIndex = users.findIndex(user => user.id === Number(req.params.id))
//   console.log('Before update:', users);
//   console.log('After update:', users);
//   updateDbJson(users);
//   res.send(`Update user id: '${users[updateIndex].id}' completed.`)
// })

app.put('/users/:id', (req, res) => {
  const updateIndex = users.findIndex(user => user.id === Number(req.params.id));

  // ตรวจสอบว่ามีชื่อใหม่ที่ส่งมาจากคำขอ PUT
  if (req.body.name) {
    // อัพเดตชื่อของผู้ใช้
    users[updateIndex].name = req.body.name;
    
    // อัพเดตข้อมูลใน db.json
    updateDbJson(users);

    // ตอบกลับคำขอ
    res.send(`Update user id: '${users[updateIndex].id}' completed.`);
  } else {
    // หากไม่มีชื่อใหม่ที่ส่งมาในคำขอ PUT
    res.status(400).send('Please enter update name');
  }
});

app.delete('/users/:id', (req, res) => {
  const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
  res.send(`Delete user '${users[deletedIndex].username}' completed.`)
  users.splice(deletedIndex, 1);
  updateDbJson(users);
})