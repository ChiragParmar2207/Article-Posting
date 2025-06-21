import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from '../store/user-slice'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const { user } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (user.error === null) {
            navigate('/')
        }
    }, [navigate, user])

    const submitHandler = (event) => {
        event.preventDefault()

        dispatch(signinUser({ userName, password }))
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <table border='2' align='center' cellPadding={4} cellSpacing={4}>
                    <thead>
                        <tr align='center'>
                            <td colSpan='2'>Login Form</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td><input type='text' value={userName} onChange={e => setUserName(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type='password' value={password} onChange={e => setPassword(e.target.value)} /></td>
                        </tr>
                        <tr align='center'>
                            <td colSpan='2'><button>Sign In</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default SignIn