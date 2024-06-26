import { postsMock } from '@/assets/mocks'
import { CommentModel, PostModel } from '@/shared/models'
import { RootState } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { v4 } from 'uuid'

const initialState = postsMock

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state, action) => {
      const newPost: PostModel = {
        id: v4(),
        isPremium: action.payload.isPremium,
        content: action.payload.content,
        likes: 0,
        publisher: action.payload.publisher,
        date: new Date().getTime(),
        comments: []
      }
      state.push(newPost)
    },
    blockUser: (state, action) => {
      return state.filter((post) => post.publisher.username !== action.payload.username)
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload.id)
    },
    likePost: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, likes: post.likes - 1 }
        }
        return post
      })
    },
    dislikePost: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, likes: post.likes + 1 }
        }
        return post
      })
    },
    likeComment: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          const newComments = post.comments.map((comment) => {
            if (comment.commentId === action.payload.commentId) {
              return { ...comment, likes: comment.likes + 1 }
            } else {
              return comment
            }
          })
          return { ...post, comments: newComments }
        } else {
          return post
        }
      })
    },
    dislikeComment: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          const newComments = post.comments.map((comment) => {
            if (comment.commentId === action.payload.commentId) {
              return { ...comment, likes: comment.likes - 1 }
            } else {
              return comment
            }
          })
          return { ...post, comments: newComments }
        } else {
          return post
        }
      })
    },
    postComment: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          const postComments = [...post.comments]
          const newComment: CommentModel = {
            body: action.payload.body,
            commentId: v4(),
            date: new Date().getTime(),
            likes: 0,
            postId: action.payload.postId,
            publisher: action.payload.publisher
          }
          postComments.push(newComment)
          return { ...post, comments: postComments }
        }
        return post
      })
    },
    editPost: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return { ...post, content: action.payload.content, date: new Date().getTime() }
        }
        return post
      })
    }
  }
})

export const {
  createPost,
  deletePost,
  blockUser,
  likePost,
  dislikePost,
  likeComment,
  editPost,
  postComment,
  dislikeComment
} = postsSlice.actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default postsSlice.reducer
