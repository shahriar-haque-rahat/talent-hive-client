import { createSlice } from "@reduxjs/toolkit";

const chatListSlice = createSlice({
    name: 'chatList',
    initialState: {
        chatList: [],
    },
    reducers: {
        setChatList: (state, action) => {
            state.chatList = action.payload.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        },
        addChatContact: (state, action) => {
            const contactIndex = state.chatList.findIndex(contact => contact.otherUserId === action.payload.otherUserId);

            if (contactIndex === -1) {
                state.chatList.push({
                    otherUserId: action.payload.otherUserId,
                    lastMessage: action.payload.lastMessage || '',
                    lastMessageTime: action.payload.lastMessageTime || new Date().toISOString(),
                    otherUserProfileImage: action.payload.otherUserProfileImage || '',
                    otherUserFullName: action.payload.otherUserFullName || '',
                });
            } else {
                state.chatList[contactIndex] = {
                    ...state.chatList[contactIndex],
                    lastMessage: action.payload.lastMessage,
                    lastMessageTime: action.payload.lastMessageTime,
                };
            }

            state.chatList.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        },
        updateChatContact: (state, action) => {
            const contactIndex = state.chatList.findIndex(contact => contact.otherUserId === action.payload.otherUserId);

            if (contactIndex !== -1) {
                state.chatList[contactIndex] = {
                    ...state.chatList[contactIndex],
                    lastMessage: action.payload.lastMessage,
                    lastMessageTime: action.payload.lastMessageTime,
                };
            } else {
                state.chatList.push({
                    otherUserId: action.payload.otherUserId,
                    lastMessage: action.payload.lastMessage,
                    lastMessageTime: action.payload.lastMessageTime,
                    otherUserProfileImage: action.payload.otherUserProfileImage || '',
                    otherUserFullName: action.payload.otherUserFullName || '',
                });
            }

            state.chatList.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        },
        deleteChatContact: (state, action) => {
            state.chatList = state.chatList.filter(contact => contact.otherUserId !== action.payload);
        },
    },
});

export const { setChatList, addChatContact, updateChatContact, deleteChatContact } = chatListSlice.actions;

export default chatListSlice.reducer;
