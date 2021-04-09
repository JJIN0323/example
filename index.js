const express = require('express')
const app = express()
const port = 5000

const { User } = require('./models/User')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const config = require('./config/key')

// MongoDB 연결할때 필요한 주소
mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connect-'))
  .catch(err => console.log('ERROR'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 어플리케이션의 데이터를 분석해서 가져오는 역할
app.use(bodyParser.urlencoded({extended: true}))
// 어플리케이션의 json 데이터를 분석해서 가져오는 역할
app.use(bodyParser.json())

// 회원가입을 위한 라우트

app.post('/register', (req, res) => {
    
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어줌

    const user = new User(req.body)

    // save()는 몽고 DB의 메서드
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})