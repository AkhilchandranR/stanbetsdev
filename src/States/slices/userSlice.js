import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:'user',
    initialState:{
        openStatsModal: false,
        openBetModal: false,
        chatUserId : null,
        betGameId: null,
        editGameId: null,
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
        },
        setChatUser:(state,action)=>{
            state.chatUserId = action.payload.chatUserId
        },
        setBetGameId:(state,action)=>{
            state.betGameId = action.payload.betGameId
        },
        setEditGameId:(state,action)=>{
            state.editGameId = action.payload.editGameId
        }
    },
})
// export action creators and reducers for using in components
export const { openStats,closeStats,openBet,closeBet,setChatUser,setBetGameId,setEditGameId } = userSlice.actions;
export default userSlice.reducer;