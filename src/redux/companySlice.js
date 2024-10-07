import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        companies: [],
        companiesPage: 0,
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setCompaniesPage: (state, action) => {
            state.companiesPage = action.payload;
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

export const { setCompanies, setCompaniesPage, addCompany, editPost, removePost } = companySlice.actions;
export default companySlice.reducer;
