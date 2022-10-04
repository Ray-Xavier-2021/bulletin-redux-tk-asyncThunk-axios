import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: '0',
        name: 'Ray Xavier'
    },
    {
        id: '1',
        name: 'John Doe'
    },
    {
        id: '2',
        name: 'Xavier Hanley'
    },
]

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

// Export selectors
export const selectAllUsers = (state) => state.users

export default usersSlice.reducer