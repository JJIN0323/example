import React, { useState } from 'react'
import '../../../common.css'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {

    const dispach = useDispatch()

    const [Email, setEmail] = useState('')
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault() // 없으면 페이지가 계속 리프레시 되어서
                               // 아무것도 할 수가 없으므로 넣어서 이벤트를 막아준다.
        if (Password !== ConfirmPassword) {
            return alert('비밀번호가 다릅니다아')
        }

        console.log(Email)
        console.log(Name)
        console.log(Password)

        let ep = {
            email: Email,
            name: Name,
            password: Password
        }

        // registerUser라는 액션을 만들어준다
        dispach(registerUser(ep))
        // 로그인이 성공하면 메인페이지로 이동시켜준다
        .then(response => {
            if (response.payload.success) { // node에서의 success ( 정확하게는 User.save()의 success )
                props.history.push('/login')
            } else {
                alert('회원가입에 실패했습니다.')
            }
        })
        
    }

    return (
        <div className='wrap'>
            <form className='formDirection' onSubmit={onSubmitHandler}>
                <input placeholder='email' type='email' value={Email} onChange={onEmailHandler} />
                <input placeholder='name' type='text' value={Name} onChange={onNameHandler} />
                <input placeholder='password' type='password' value={Password} onChange={onPasswordHandler} />
                <input placeholder='Confirmpassword' type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <button type='submit'>REGISTER</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
