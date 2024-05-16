import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { InfoUser } from '../../types/User';

const initialState:{value:InfoUser|null} = {
    value:null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action:PayloadAction<InfoUser>) => {
            state.value = action.payload
        },

        // updateUser: (state, action) => {
        //     if (state.value) {
        //         state.value[action.payload.field] = action.payload.value;
        //     }
        // },

        deleteUser: (state) => {
            state.value = null
        }
    }
})

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer