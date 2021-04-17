import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
    // 위에 adminRoute는 아무것도 안쓰면 그냥 null값.
    // 아래 세가지 값은, client/app.js의 라우트에서 사용함.

    // null : 아무나 출입이 가능한 페이지 (index, about)
    // true : 로그인한 유저만 출입이 가능한 페이지 (myinfo)
    // false : 로그인한 유저는 출입이 불가능한 페이지 (login, register)

    function AuthenticationCheck(props) {

        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth())
            .then (response => {
                console.log(response)

                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {// 로그인 한 상태
                    // 관리자 페이지에 접속하려고 하지만 관리자는 아닐 때
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else { //로그인 한 유저인데, 로그인/회원가입 페이지에 접속하려고 할 때
                        if (option === false)
                        props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}