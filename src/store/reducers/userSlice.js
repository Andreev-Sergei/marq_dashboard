import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: true,
        user: {
            email: '1',
            role: 'REVIEWER'
        },
        error: null
    },
    reducers: {

        setUser: (state,action) => {
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }
        },
        unsetUser: (state,action) => {
            return {
                ...state,
                isAuth: false,
                user: null
            }
        },
        setError: (state, action)=> {
            return {
                ...state,
                error: action.payload
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const {  setUser, setError } = userSlice.actions

export default userSlice.reducer