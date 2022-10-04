import { createSlice, nanoid } from "@reduxjs/toolkit";
// Import sub from date-fns to set initial state of date subtract the post time in object
import { sub } from "date-fns";

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: 'Really fun to learn.',
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            heart: 0,
            coffee: 0,
            wow: 0,
            rocket: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: 'If only there was pizza.',
        date: sub(new Date(), {minutes: 5}).toISOString(),
        reactions: {
            thumbsUp: 0,
            heart: 0,
            coffee: 0,
            wow: 0,
            rocket: 0
        }
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.push(action.payload)
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
            const existingPost = state.find(post => post.id === postId)
            // Check if post exists the give reaction button functionality
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const allSelectedPosts = (state) => state.posts

export const { addPost, reactionAdded } = postsSlice.actions

export default postsSlice.reducer