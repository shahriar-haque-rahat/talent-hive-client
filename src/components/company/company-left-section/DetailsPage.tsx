'use client'

import { deleteCompany, findCompanyById } from '@/apiFunctions/companyData';
import { Image, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { BsDot } from "react-icons/bs";
import CompanyJobs from './CompanyJobs';
import InteractionButtons from './InteractionButtons';
import { useSelector } from 'react-redux';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import { useEdgeStore } from '@/edgestore/edgestore';
import { useRouter } from 'next/navigation';
import CompanyPostingModal from '@/components/profile/profile-left-section/company/CompanyPostingModal';
import JobPosting from './JobPosting';

interface CompanyDetails {
    id: string
}

const DetailsPage = ({ id }: CompanyDetails) => {
    const { edgestore } = useEdgeStore();
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user);
    const [company, setCompany] = useState();
    const [isFollowed, setIsFollowed] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [jobPosts, setJobPosts] = useState([]);

    const handleProfile = (userId) => {
        router.push(`/profile?id=${userId}`);
    }

    const fetchCompanyDetails = async () => {
        const res = await findCompanyById(id, user._id);

        if (res) {
            setCompany(res.company);
            setIsFollowed(res.isFollowed)
        }
    }

    const handleInvalidLink = (message: string) => {
        toast.error(message);
    };

    // edit company
    const handleUpdateCompany = (newCompany) => {
        setCompany(newCompany);
    };

    // delete company
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
                router.push(`/profile?id=${user._id}`);
            }
        }
    }

    useEffect(() => {
        if (id) {
            fetchCompanyDetails();
        }
    }, [id])

    return (
        <>
            {company &&
                <div>
                    <div className=' lg:sticky top-20 z-20 bg-gray-100'>
                        <div className='relative bg-white p-4 rounded-lg border shadow flex items-center justify-between'>
                            {(user._id === company.employerId._id || user._id === company.employerId) &&
                                <div className='absolute top-2 right-3 flex gap-2'>
                                    <button onClick={() => setIsModalOpen(true)} className='text-xs text-sky-500 font-bold hover:text-sky-600'>Edit</button>
                                    <p>|</p>
                                    <button onClick={() => confirmDeleteCompany(company._id)} className='text-xs text-red-500 font-bold hover:text-red-600'>Delete</button>
                                </div>
                            }

                            <div key={company._id} className='flex flex-col md:flex-row gap-3 xl:gap-6 w-full items-center text-center md:text-start'>
                                <div className='flex-shrink-0 w-40 h-40 my-auto'>
                                    <Image
                                        src={company.companyProfileImage ? company.companyProfileImage : "/assets/user.png"}
                                        alt="Profile"
                                        className="rounded-lg w-40 h-40 border-2 border-white object-cover object-top"
                                    />
                                </div>

                                <div className='flex-grow flex flex-col gap-2 justify-between'>
                                    <h1 className=' text-2xl font-semibold'>{company.companyName}</h1>
                                    <p className='text-lg'>{company.companyEmail}</p>
                                    <p>{company.companyContactNumber}</p>
                                    <p onClick={() => handleProfile(company.employerId._id)} className='cursor-pointer hover:underline'><span className='font-bold'>Founder: </span>{company.employerId.fullName}</p>

                                    <div className=' flex gap-2 justify-center md:justify-start items-start text-gray-700'>
                                        {company.facebookLink?.startsWith('http') ? (
                                            <Link
                                                href={company.facebookLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Tooltip placement="top" content="Facebook">
                                                    <div>
                                                        <FaFacebook className='cursor-pointer text-xl mb-3' />
                                                    </div>
                                                </Tooltip>
                                            </Link>
                                        ) : (
                                            <Tooltip placement="top" content="Facebook">
                                                <div onClick={() => handleInvalidLink('Facebook link not available')}>
                                                    <FaFacebook className='cursor-pointer text-xl mb-3' />
                                                </div>
                                            </Tooltip>
                                        )}

                                        {company.linkedInLink?.startsWith('http') ? (
                                            <Link
                                                href={company.linkedInLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Tooltip placement="top" content="LinkedIn">
                                                    <div>
                                                        <FaLinkedin className='cursor-pointer text-xl mb-3' />
                                                    </div>
                                                </Tooltip>
                                            </Link>
                                        ) : (
                                            <Tooltip placement="top" content="LinkedIn">
                                                <div onClick={() => handleInvalidLink('LinkedIn link not available')}>
                                                    <FaLinkedin className='cursor-pointer text-xl mb-3' />
                                                </div>
                                            </Tooltip>
                                        )}

                                        <p><BsDot /></p>
                                        <p className=' text-sm'>{company.followers} {(company.followers > 1) ? 'Followers' : 'Follower'}</p>
                                    </div>
                                </div>

                                <div>
                                    <InteractionButtons isFollowed={isFollowed} setCompany={setCompany} setIsFollowed={setIsFollowed} company={company} userId={user._id} />
                                </div>
                            </div>
                        </div>

                        <div className='mt-2 p-4 bg-white rounded-lg border shadow'>
                            <p><span className='font-bold'>About: </span>{company.companyDescription}</p>
                        </div>

                        <div className='mt-2 h-28 px-6 py-8 bg-white rounded-t-lg border border-b-gray-300 flex justify-between'>
                            <h1 className=' text-2xl font-semibold '>Jobs for you</h1>
                            {(user._id === company.employerId._id) && <JobPosting companyId={company._id} setJobPosts={setJobPosts} />}
                        </div>
                    </div>

                    <CompanyJobs companyId={company._id} jobPosts={jobPosts} setJobPosts={setJobPosts} />
                </div>
            }

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteCompany}
                title="Delete Company?"
                message="Are you sure you want to delete this company? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
            />

            <CompanyPostingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                addOrUpdateCompany={handleUpdateCompany}
                employerId={user._id}
                company={company}
            />
        </>
    );
};

export default DetailsPage;
