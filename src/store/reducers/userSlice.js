import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: true,
        user: {
            email: 'pirogovoe@gmail.com',
            role: 'REVIEWER'
        },
        error: null
    },
    reducers: {
        setIsAuth: (state, action) => {
            return {
                ...state,
                isAuth: action.payload
            }
        },
        setUser: (state,action) => {
            return {
                ...state,
                user: action.payload
            }
        },
        setError: (state, action)=>{
            return{
                ...state,
                error: action.payload
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const { setIsAuth, setUser, setError } = userSlice.actions

export default userSlice.reducer