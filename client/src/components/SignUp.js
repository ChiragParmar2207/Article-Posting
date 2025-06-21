import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../store/user-slice'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const { user } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    useEffect(() => {
        if (user.error === null) {
            navigate('/')
        }
    }, [navigate, user])

    const submitHandler = (event) => {
        event.preventDefault()
        const userData = {
            firstName, lastName, userName, email, phone, password, passwordConfirm
        }

        dispatch(signupUser(userData))
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
                            <td>firstName</td>
                            <td><input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>lastName</td>
                            <td><input type='text' value={lastName} onChange={e => setLastName(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>userName</td>
                            <td><input type='text' value={userName} onChange={e => setUserName(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td><input type='text' value={email} onChange={e => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>phone</td>
                            <td><input type='text' value={phone} onChange={e => setPhone(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td><input type='password' value={password} onChange={e => setPassword(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>passwordConfirm</td>
                            <td><input type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} /></td>
                        </tr>
                        <tr align='center'>
                            <td colSpan='2'><button>Sign Up</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default SignUp