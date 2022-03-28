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
            let errorObj = null

            if (action.payload){
                errorObj = {
                    message: action.payload.response.data.message,
                    statusCode: action.payload.response.status
                }
            }
            return {
                ...state,
                error: errorObj
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const { setIsAuth, setUser, setError } = userSlice.actions

export default userSlice.reducer