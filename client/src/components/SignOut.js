import React from 'react'
import { useDispatch } from 'react-redux'
import { signout } from '../store/user-slice'

const SignOut = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(signout())
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default SignOut