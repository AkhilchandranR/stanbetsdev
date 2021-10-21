import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:'user',
    initialState:{
        openStatsModal: false,
        openBetModal: false,
    },
    //we are able mutate because we are using immer.js
    reducers:{
        openStats: (state)=>{
            state.openStatsModal = true
        },
        closeStats: (state)=>{
            state.openStatsModal = false
        },
        openBet: (state)=>{
            state.openBetModal = true
        },
        closeBet: (state)=>{
            state.openBetModal = false
        }
    },
})
// export action creators and reducers for using in components
export const { openStats,closeStats,openBet,closeBet } = userSlice.actions;
export default userSlice.reducer;