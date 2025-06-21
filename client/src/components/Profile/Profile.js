import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <>
            <h1>Profile</h1>
            <ul>
                <li>
                    <Link to='/followers'>Followers</Link>
                </li>
                <li>
                    <Link to='/following'>Following</Link>
                </li>
            </ul>
        </>
    )
}

export default Profile