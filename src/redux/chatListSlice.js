import { createSlice } from '@reduxjs/toolkit';

const chatListSlice = createSlice({
    name: 'chatList',
    initialState: {
        chatList: [],
    },
    reducers: {
        setChatList: (state, action) => {
            state.chatList = action.payload.sort(
                (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
            );
        },
        addChatContact: (state, action) => {
            const existingContact = state.chatList.find(
                (contact) => contact.otherUserId === action.payload.otherUserId
            );

            if (!existingContact) {
                state.chatList.unshift(action.payload);
            }
        },
        updateChatContact: (state, action) => {
            const index = state.chatList.findIndex(
                (contact) => contact.otherUserId === action.payload.otherUserId
            );

            if (index !== -1) {
                state.chatList.splice(index, 1);
            }

            state.chatList.unshift(action.payload);
        },
        updateMessageReadStatus: (state, action) => {
            const contact = state.chatList.find(
                (contact) => contact.otherUserId === action.payload.otherUserId
            );

            if (contact) {
                contact.lastMessageIsRead = action.payload.lastMessageIsRead;
            }
        },
    },
});

export const { setChatList, addChatContact, updateChatContact, updateMessageReadStatus } = chatListSlice.actions;
export default chatListSlice.reducer;
