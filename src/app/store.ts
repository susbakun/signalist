import messagesReducer from '@/features/Message/messagesSlice'
import postsReducer from '@/features/Post/postsSlice'
import signalsReducer from '@/features/Signal/signalsSlice'
import usersReducer from '@/features/User/usersSlice'
import { cryptoApi } from '@/services/cryptoApi'
import { cryptoNewsApi } from '@/services/cryptoNewsApi'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    posts: postsReducer,
    users: usersReducer,
    signals: signalsReducer,
    messages: messagesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(thunk)
})

export default store
