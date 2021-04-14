const { User } = require('../models/User')

let auth = (req, res, next) => {

    // 인증처리를 하는 곳
    // 클라이언트 쿠키에서 토큰을 가져온다

    let token = req.cookies.x_auth
    console.log('token : ', token)

    // 토큰을 복호화 한 후, 유저를 찾는다

    User.findToken(token, (err, user) => {
        // throw를 쓰는 이유는 예외를 발생시키기 위해서,
        // 당장 멈추지 않고 다음으로 넘기기 위함
        if (err) throw err

        // 유저가 없으면 인증 NO
        if (!user) return res.json({
            isAuth: false,
            error: true
        })
        // 유저가 있으면 인증 OK
        // index.js (auth) 에서 각각의 정보를 가져오기 편하게 하기 위함
        req.token = token
        req.user = user

        // 넥스트가 없으면 index.js (auth) 에서 갈 수 없음.
        next()
    })    

}

module.exports = { auth }