const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

const mongoose = require('mongoose')

const config = require('./config/key')

// MongoDB 연결할때 필요한 주소
// 
mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connect-'))
  .catch(err => console.log('ERROR'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요~')
})

// 어플리케이션의 데이터를 분석해서 가져오는 역할
app.use(bodyParser.urlencoded({extended: true}))
// 어플리케이션의 json 데이터를 분석해서 가져오는 역할
app.use(bodyParser.json())
app.use(cookieParser())

// 회원가입을 위한 라우트

app.post('/api/user/register', (req, res) => {
    
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어줌

    // req.body 안에는 json 형식으로 데이터가 들어있음
    const user = new User(req.body)

    // save()는 몽고 DB의 메서드
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/user/login', (req, res) => {
  //1. 요청된 이메일을 데이터베이스에서 찾는다
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '해당 이메일을 찾을 수 없습니다.'
      })
    }

    console.log('1. User : ', user)

    //2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) 
        return res.json({
          loginSuccess: false,
          message : '비밀번호가 틀렸습니다.'
        })

        //3. 비밀번호까지 같다면, Token을 생성한다
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err)

          // 토큰을 저장한다. 어디에 ? 쿠키..( 로컬스토리지, 세션 )
          res.cookie('x_auth', user.token)
          .status(200)
          .json({ 
            loginSuccess: true,
            userId: user._id
          })
      })
    })
  }) 
})

app.get('/api/user/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과해 왔다는 것은, Authentication이 True라는 것
  res.status(200).json({
    _id: req.user._id,
    // role 0) 일반유저 role 0이 아니면 관리자 
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    email: req.user.email,
    image: req.user.image
  })
})

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id}, {token: ''}, (err, user) => {
    if (err) return res.json({
      success : false,
      err
    })
    return res.status(200).send({
      success : true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})