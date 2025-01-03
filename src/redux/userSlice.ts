import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type UserState = {
    hasAuthority: boolean
}

const initialState: UserState = {
    hasAuthority: false
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setHasAuthority: (state, action: PayloadAction<boolean>) => {
            state.hasAuthority = action.payload
        }
    }
})

export const {
    setHasAuthority
} = userSlice.actions

export default userSlice.reducer