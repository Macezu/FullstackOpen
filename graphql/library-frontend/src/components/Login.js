import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from "./queries"


const Login = ({ show, setToken, setPage }) => {
    const [userN, setUserN] = useState("")
    const [passwd, setPasswd] = useState("")

    const [ login, result ] = useMutation(LOGIN, {    
        onError: (error) => {
            alert(error.message)
      }
    })
  
    useEffect(() => {    
        if ( result.data ) {      
            const token = result.data.login.value      
            setToken(token)      
            localStorage.setItem('phonenumbers-user-token', token)    
        }  
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
    }
    
    const handleLogin = (event) => {
        event.preventDefault()
        
        login({ variables: {userN, passwd}})

        setUserN("")
        setPasswd("")
        setPage("authors")
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                Username: <input type="text" value={userN} onChange={({target}) => setUserN(target.value)}/>
                Password:<input type="password" value={passwd} onChange={({target}) => setPasswd(target.value)}/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login