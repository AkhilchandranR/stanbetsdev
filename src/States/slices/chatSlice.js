import { TryRounded } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

//slice to control the opening and closing of chatwindow
export const chatSlice = createSlice({
    name:'chatwindow',
    initialState:{
        openChatWindow: false,
        showChatIcon: false,
        showSettings: false,
        showAdmin: false,
        showCreateGame: false,
        showSiteStats: false,
    },
    //we are able mutate because we are using immer.js
    reducers:{
        openWindow: (state)=>{
            state.openChatWindow = true
        },
        closeWindow: (state)=>{
            state.openChatWindow = false
        },
        showChat: (state)=>{
            state.showChatIcon = true
        },
        hideChat: (state)=>{
            state.showChatIcon = false
        },
        showUserSettings: (state)=>{
            state.showSettings = true
        },
        hideUserSettings: (state)=>{
            state.showSettings = false
        },
        showAdminModal: (state)=>{
            state.showAdmin = true
        },
        hideAdminModal: (state)=>{
            state.showAdmin = false
        },
        showGameModal: (state)=>{
            state.showCreateGame = true
        },
        closeGameModal: (state)=>{
            state.showCreateGame = false
        },
        showStatsModal: (state)=>{
            state.showSiteStats = true
        },
        hideStatsModal: (state)=>{
            state.showSiteStats = false
        }
    },
})
// export action creators and reducers for using in components
export const { openWindow,closeWindow,showChat,hideChat,showUserSettings,
    hideUserSettings,showAdminModal,hideAdminModal,showGameModal,closeGameModal,showStatsModal,hideStatsModal } = chatSlice.actions;
export default chatSlice.reducer;