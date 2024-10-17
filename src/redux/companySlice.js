import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        followedCompanies: [],
        notFollowedCompanies: [],
        followedCompaniesPage: 0,
        notFollowedCompaniesPage: 0,
    },
    reducers: {
        setFollowedCompanies: (state, action) => {
            state.followedCompanies = action.payload;
        },
        setNotFollowedCompanies: (state, action) => {
            state.notFollowedCompanies = action.payload;
        },
        setFollowedCompaniesPage: (state, action) => {
            state.followedCompaniesPage = action.payload;
        },
        setNotFollowedCompaniesPage: (state, action) => {
            state.notFollowedCompaniesPage = action.payload;
        },
        followCompany: (state, action) => {
            const company = action.payload;
            state.followedCompanies.unshift(company);
            state.notFollowedCompanies = state.notFollowedCompanies.filter(
                (c) => c._id !== company._id
            );
        },
        unfollowCompany: (state, action) => {
            const company = action.payload;
            state.notFollowedCompanies.unshift(company);
            state.followedCompanies = state.followedCompanies.filter(
                (c) => c._id !== company._id
            );
        },
        addCompany: (state, action) => {
            const { companyData } = action.payload;
            state.companies.unshift(companyData);
        },
        editPost: (state, action) => {
            const { companyId, editedData } = action.payload;

            const companyIndex = state.companies.findIndex(company => company._id === companyId);
            if (companyIndex !== -1) {
                state.companies[companyIndex] = {
                    ...state.companies[companyIndex],
                    ...editedData,
                };
            }
        },
        removePost: (state, action) => {
            const companyId = action.payload;
            state.companies = state.companies.filter(company => company._id !== companyId);
        },
    },
});

export const { setFollowedCompanies, setNotFollowedCompanies, setFollowedCompaniesPage, setNotFollowedCompaniesPage, setCompanies, setCompaniesPage, addCompany, followCompany, unfollowCompany, editPost, removePost } = companySlice.actions;

export default companySlice.reducer;
