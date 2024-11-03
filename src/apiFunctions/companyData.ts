import { useServer } from "@/hooks/useAxiosInstances";
import axios from "axios";

export const getCompanies = async (page: number, limit: number) => {
    try {
        const response = await useServer.get(`/company`, {
            params: { page, limit }
        });
        const companies = response.data;

        return companies;
    } catch (error) {
        console.error("Error fetching companies:", error);
        return [];
    }
};

export const getFollowedCompanies = async (userId: string, page: number, limit: number) => {
    try {
        const response = await useServer.get(`/company/followed/${userId}`, {
            params: { page, limit }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching followed companies:", error);
        return { companies: [], page };
    }
};

export const getNotFollowedCompanies = async (userId: string, page: number, limit: number) => {
    try {
        const response = await useServer.get(`/company/not-followed/${userId}`, {
            params: { page, limit }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching not followed companies:", error);
        return { companies: [], page };
    }
};

export const findCompanyById = async (companyId: string, userId: string) => {
    try {
        const response = await useServer.get(`/company/company-details/${companyId}/${userId}`);
        const company = response.data;

        return company;
    } catch (error) {
        console.error("Error fetching company:", error);
        return null;
    }
};

export const getCompaniesByEmployer = async (employerId: string) => {
    try {
        const response = await useServer.get(`/company/${employerId}`);
        const companies = response.data;

        return companies;
    } catch (error) {
        console.error("Error fetching companies:", error);
        return [];
    }
};

export const createCompany = async (companyData: any) => {
    try {
        const response = await useServer.post(`/company`, companyData);
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
        const response = await useServer.patch(`/company/${companyId}`, updateData);
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
        const response = await useServer.delete(`/company/${companyId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting company:", error);
        return null;
    }
};

export const followCompany = async (companyId: string, userId: string) => {
    try {
        const response = await useServer.post(`/company-followers/follow/${companyId}/${userId}`);
        const updatedCompany = response.data;

        return updatedCompany;
    }
    catch (error) {
        console.error("Error updating company:", error);
        return null;
    }
};

export const unfollowCompany = async (companyId: string, userId: string) => {
    try {
        const response = await useServer.post(`/company-followers/unfollow/${companyId}/${userId}`);
        const updatedCompany = response.data;

        return updatedCompany;
    }
    catch (error) {
        console.error("Error updating company:", error);
        return null;
    }
};
