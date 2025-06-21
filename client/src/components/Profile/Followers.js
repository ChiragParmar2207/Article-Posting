import { useSelector } from 'react-redux'
import FollowersList from './FollowersList'

const Followers = () => {
    const { followers } = useSelector(state => state.followunfollow)

    return (
        <>
            <h1>Followes</h1>
            {
                followers.map(follower => (
                    <FollowersList key={follower.userId} follower={follower} />
                ))
            }
        </>
    )
}

export default Followers