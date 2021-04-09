const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
    } else {
        next()
    }
})
/**
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            console.log(salt, 'ㅇㅕ기에러1')
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                console.log(hash, '에러?')
    
                user.password = hash
                next()
                console.log('ㅇㅕ기에러2')
            })
        })
    }**/

const User = mongoose.model('User', userSchema)

module.exports = {
    User
} // 다른곳에서도 쓸 수 있게 해줌