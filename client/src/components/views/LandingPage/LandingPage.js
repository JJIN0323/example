import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        axios.get(`/api/user/logout`)
        .then(response => {
            if (response.data.success) {
                props.history.push('/login')
            } else {
                alert('로그아웃 실패')
            }
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                      width: '100vw', height: '100vh'}}>

            HOME
            <br/>
            <Button type="primary" onClick={onClickHandler}>로그아웃</Button>
        
        </div>
    )
}

export default withRouter(LandingPage)
