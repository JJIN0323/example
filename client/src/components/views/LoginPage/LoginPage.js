import React, { useState } from 'react'
import '../../../common.css'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {

    const dispach = useDispatch()

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault() // 없으면 페이지가 계속 리프레시 되어서
                               // 아무것도 할 수가 없으므로 넣어서 이벤트를 막아준다.

        console.log(Email)
        console.log(Password)

        let ep = {
            email: Email,
            password: Password
        }

        // loginUser라는 액션을 만들어준다
        dispach(loginUser(ep))
        // 로그인이 성공하면 메인페이지로 이동시켜준다
        .then(response => {
            if (response.payload.loginSuccess) {
                props.history.push('/') // 리액트에서는 props를 넣어서 이동시켜준다
            } else {
                alert('ERROR !')
            }
        })
        
    }


    return (
        <div className='wrap'>

            <form className='formDirection' onSubmit={onSubmitHandler}>
                <input placeholder='email' type='email' value={Email} onChange={onEmailHandler} />
                <input placeholder='password' type='password' value={Password} onChange={onPasswordHandler} />
                <button type='submit'>LOGIN</button>
            </form>

        </div>
    )
}

export default withRouter(LoginPage)
