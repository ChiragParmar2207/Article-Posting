import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SignOut from './SignOut'

const Header = () => {
    const { isLoggedin } = useSelector((state) => state.user)

    return (
        <>
            <nav>
                <ul>
                    <li>
                        {!isLoggedin && <Link to='/signin'>Sign In</Link>}
                        {isLoggedin && <SignOut />}
                    </li>
                    {!isLoggedin &&
                        <li>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                    }
                    {isLoggedin &&
                        <li>
                            <Link to='/articles'>Articles</Link>
                        </li>
                    }
                    {isLoggedin &&
                        <li>
                            <Link to='/topics'>Topics</Link>
                        </li>
                    }
                    {isLoggedin &&
                        <li>
                            <Link to='/getarticlesbytopic'>Get Articles by topic</Link>
                        </li>
                    }
                    {isLoggedin &&
                        <li>
                            <Link to='/Profile'>Profile </Link>
                        </li>
                    }
                </ul>
            </nav >
        </>
    )
}

export default Header