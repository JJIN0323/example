const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jjin:ab5774@example.el5q0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connect-'))
  .catch(err => console.log('ERROR'))

// MongoDB 연결할때 필요한 주소


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})