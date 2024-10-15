import axios from "axios";

export const getCompanies = async (page = 0, limit = 10) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/company`, {
            params: { page, limit }
        });
        const companies = response.data;

        return companies;
    } catch (error) {
        console.error("Error fetching companies:", error);
        return [];
    }
};

export const getCompaniesByEmployer = async (employerId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/${employerId}`);
        const companies = response.data;

        return companies;
    } catch (error) {
        console.error("Error fetching companies:", error);
        return [];
    }
};

export const createCompany = async (companyData: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/company`, companyData);
        const newCompany = response.data;

        return newCompany;
    }
    catch (error) {
        console.error("Error creating company:", error);
        return null;
    }
};

export const updateCompany = async (companyId: string, updateData: any) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/${companyId}`, updateData);
        const updatedCompany = response.data;

        return updatedCompany;
    }
    catch (error) {
        console.error("Error updating company:", error);
        return null;
    }
};

export const deleteCompany = async (companyId: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/${companyId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting company:", error);
        return null;
    }
};
