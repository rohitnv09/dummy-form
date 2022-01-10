import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: { value: { firstName: "", lastName: "", age: 0, email: "", password: "", contactNumber: "" } },
    reducers: {
        updateFormData: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updateFormData } = userSlice.actions;

export default userSlice.reducer;