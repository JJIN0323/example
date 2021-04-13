const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// salt가 몇자리인지 정하는것
const saltRounds = 10


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백을 없애주는 역할
        unique: 1 // 같은 이메일을 사용할 수 없게 해주는 역할
    },
    password: {
        type: String, // number가 아니고 string 이거 하나때문에 2시간 버려버림.....
        minlength: 4
    },
    lastname: {
        type: String,
        maxlength: 10
    },
    role: { // 회원들의 등급 지정
        type: Number,
        default: 0 // role을 지정하지 않으면 임의로 0을 줌
    },
    image: {
        type: String
    },
    token: { // 유효성 검사
        type: String
    },
    tokeExp: { // 토큰 유효기간
        type: Number
    }
})


// index.js에 user.save를 하기 전(Previous)에!
// 이 명령어를 실행하게 만드는 mongoose의 메서드
// next라는 파라메터를 줘서 이 명령어를 실행하고 내보냄
userSchema.pre('save', function (next) {

    var user = this;

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            console.log(salt, '여기?')

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { //비밀번호 이외의 다른것을 변경하면 넘긴다
        next()
    }
})

  userSchema.methods.comparePassword = function(plainPssword, callback) {
      // 입력된 비밀번호 1234 # 데이터베이스에 입력된 암호화된 비밀번호 $2b$10$RH3BJTKAn34YNQDrAH69RO 
      // bycrypt를 복호화 할 순 없으므로, 1234를 암호화 해서 비교해야함
      bcrypt.compare(plainPssword, this.password, function(err, isMatch) {
          if (err) return callback(err)
          callback(null, isMatch)
      })
  }

  userSchema.methods.generateToken = function(callback) {

    var user = this

      // jsonwebtoken을 이용해서 token을 생성하기
      var token = jwt.sign(user._id.toHexString(), 'secretToken')

      // user id와 'secretToken'을 합쳐서 고유의 토큰을 만들고,
      // 역으로 'secretToken'을 넣으면 id가 나옴
      //user._id + 'secretToken' = token

      user.token = token
      user.save(function(err, user) {
          if (err) return callback(err)
          callback(null, user)
      })
  }


const User = mongoose.model('User', userSchema)

module.exports = { User } // 다른곳에서도 쓸 수 있게 해줌