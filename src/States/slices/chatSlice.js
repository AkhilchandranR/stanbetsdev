import { createSlice } from '@reduxjs/toolkit';

//slice to control the opening and closing of chatwindow
export const chatSlice = createSlice({
    name:'chatwindow',
    initialState:{
        openChatWindow: false,
        showChatIcon: false,
        showSettings: false,
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
        }
    },
})
// export action creators and reducers for using in components
export const { openWindow,closeWindow,showChat,hideChat,showUserSettings,hideUserSettings } = chatSlice.actions;
export default chatSlice.reducer;