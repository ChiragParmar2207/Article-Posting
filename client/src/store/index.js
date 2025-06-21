import { configureStore } from '@reduxjs/toolkit'
import authSlice from './user-slice'
import articleSlice from './article-slice'
import topicSlice from './topic-slice'
import follow_unfollowSlice from './follow_unfollow-slice'

const store = configureStore({
    reducer: {
            user: authSlice,
            article: articleSlice,
            topic: topicSlice,
            followunfollow: follow_unfollowSlice
    }
})

export default store