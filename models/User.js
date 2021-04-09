const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true, // 공백을 없애주는 역할
        unique: 1 // 같은 이메일을 사용할 수 없게 해주는 역할
    },
    password: {
        type: Number,
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
    tokeExp : { // 토큰 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User } // 다른곳에서도 쓸 수 있게 해줌