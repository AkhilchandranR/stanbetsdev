import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:'user',
    initialState:{
        openStatsModal: false,
    },
    //we are able mutate because we are using immer.js
    reducers:{
        openStats: (state)=>{
            state.openStatsModal = true
        },
        closeStats: (state)=>{
            state.openStatsModal = false
        },
    },
})
// export action creators and reducers for using in components
export const { openStats,closeStats } = userSlice.actions;
export default userSlice.reducer;