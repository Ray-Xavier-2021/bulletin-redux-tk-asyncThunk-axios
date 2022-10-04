import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// Import sub from date-fns to set initial state of date subtract the post time in object
import { sub } from "date-fns";

import axios from "axios";

// Create variable to hold dummy API data
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

// Removed static state
const initialState = {
    posts: [],
    status: 'idle', // 'loading' || 'succeeded' || 'failed'
    error: null
}

// Create a fetch/ read posts asyncThunk function that gets a post
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

// Create a post/ create post asyncThunk function that adds a post
export const addNewPost = createAsyncThunk('posts/addNewPosts', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.dsta
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            // Generate / format object data and return payload using prepare callback
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        // Set date to return date as a ISO string
                        date: new Date().toISOString(),
                        userId,
                        // Set reactions
                        reactions: {
                            thumbsUp: 0,
                            heart: 0,
                            coffee: 0,
                            wow: 0,
                            rocket: 0
                        }
                    }
                }
            }
        },
        // Set a reaction added reducer that changes the stat of the reaction button
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            // Check if post exists the give reaction button functionality
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const allSelectedPosts = (state) => state.posts.posts

export const { addPost, reactionAdded } = postsSlice.actions

export default postsSlice.reducer