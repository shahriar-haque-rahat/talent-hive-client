import { deleteCompany } from '@/apiFunctions/companyData';
import { useEdgeStore } from '@/edgestore/edgestore';
import ConfirmationModal from '@/shared/ConfirmationModal';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const EditAndDeleteCompany = ({ company, removeCompany, handleEditCompany }) => {
    const { edgestore } = useEdgeStore();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);

    const confirmDeleteCompany = (companyId) => {
        setCompanyToDelete(companyId);
        setShowDeleteModal(true);
    };

    const handleDeleteCompany = async () => {
        if (companyToDelete) {
            try {
                const response = await deleteCompany(company._id);

                if (response && company.companyProfileImage) {
                    try {
                        await edgestore.employerCompanyLogo.delete({
                            url: company.companyProfileImage,
                        });
                        console.log('Deleted old media:', company.companyProfileImage);
                    } catch (error) {
                        console.error('Failed to delete old media:', error);
                    }
                }

                toast.success('Company deleted');
            }
            catch (error) {
                console.error('Error deleting company: ', error);
            }
            finally {
                setShowDeleteModal(false);
                setCompanyToDelete(null);
                removeCompany(company._id);
            }
        }
    }

    return (
        <>
            <div>
                <div className="absolute right-3 mt-6 flex flex-col items-start text-sm bg-white border shadow-lg rounded-lg ">
                    <button onClick={() => handleEditCompany(company._id)} className='hover:bg-gray-200 py-2 px-3 w-full text-left'>Edit</button>
                    <button onClick={() => confirmDeleteCompany(company._id)} className='hover:bg-gray-200 py-2 px-3 w-full text-left'>Delete</button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteCompany}
                title="Delete Company?"
                message="Are you sure you want to delete this company? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default EditAndDeleteCompany;
