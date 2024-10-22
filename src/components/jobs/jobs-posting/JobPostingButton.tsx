'use client';

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import React, { useState } from 'react';
import JobPostingModal from './JobPostingModal';
import { getCompaniesByEmployer } from '@/apiFunctions/companyData';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const JobPostingButton = () => {
    const user = useSelector((state: any) => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleOpenModal = () => {
        if (selectedCompany) {
            setIsModalOpen(true);
        } else {
            toast.error('Please select a company first.');
        }
    };

    const handleFetchCompanies = async () => {
        try {
            const fetchedCompanies = await getCompaniesByEmployer(user._id);
            setCompanies(fetchedCompanies);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleSelectCompany = (company) => {
        setSelectedCompany(company);
    };

    return (
        <>
            <div className="rounded-lg flex gap-2 border bg-white shadow w-full p-3 mt-2">
                {/* Company Dropdown */}
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="w-full rounded-lg border border-gray-500 bg-transparent hover:bg-gray-200"
                            onClick={handleFetchCompanies}
                        >
                            {selectedCompany
                                ? selectedCompany.companyName
                                : 'Select a Company'}
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Select Company">
                        {companies.length > 0 ? (
                            companies.map((company) => (
                                <DropdownItem
                                    key={company._id}
                                    onClick={() => handleSelectCompany(company)}
                                >
                                    {company.companyName}
                                </DropdownItem>
                            ))
                        ) : (
                            <DropdownItem isDisabled>No companies found</DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>

                {/* Post Job Button */}
                <Button
                    className={`w-full text-lg rounded-lg border 
                        ${selectedCompany
                            ? 'border-gray-500 bg-transparent hover:bg-gray-200'
                            : 'border-gray-400 bg-gray-300 cursor-not-allowed'}`}
                    onClick={handleOpenModal}
                    disabled={!selectedCompany}
                >
                    Post a Job
                </Button>
            </div>

            {/* Job Posting Modal */}
            {isModalOpen && (
                <JobPostingModal
                    isOpen={isModalOpen}
                    onClose={()=>setIsModalOpen(false)}
                    companyId={selectedCompany?._id}
                    jobPost={null}
                />
            )}
        </>
    );
};

export default JobPostingButton;
