import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                      width: '100vw', height: '100vh'}}>

            HOME
        
        </div>
    )
}

export default LandingPage
