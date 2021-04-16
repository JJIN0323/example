import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

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
        event.preventDefault() // 이게 없으면 페이지가 계속 리프레시 되므로 이걸 넣어서 이벤트를 막아준다.

        console.log(Email)
        console.log(Password)

        let ep = {
            email: Email,
            password: Password
        }

        // loginUser라는 액션을 만들어줌
        dispach(loginUser(ep))
        .then(response => {
            if (response.payload.loginSuccess) {
                props.history.push('/')
            } else {
                alert('ERROR !')
            }
        })
        
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                      width: '100vw', height: '100vh'}}>

            <form style={{ display: 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}>
                <input placeholder='email' type='email' value={Email} onChange={onEmailHandler} />
                <input placeholder='password' type='password' value={Password} onChange={onPasswordHandler} />
                <button type='submit'>LOGIN</button>
            </form>

        </div>
    )
}

export default LoginPage
