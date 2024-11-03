import { Button, Image } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';

const ApplicantsList = ({ applicants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleProfile = (userId: string) => {
        router.push(`/profile?id=${userId}`);
    }

    const onClose = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleInvalidLink = (message: string) => {
        toast.error(message);
    };

    return (
        <>
            <div>
                <Button
                    onClick={openModal}
                    className='bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-500 hover:text-white'
                >
                    Applicants
                </Button>
            </div>

            {/* Applicants list modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                    <div className="bg-white w-full md:max-w-[50%] h-[70vh] p-6 rounded-lg relative overflow-hidden flex flex-col">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <MdClose size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Applicants</h2>

                        {/* Applicants List */}
                        <div className=" space-y-2">
                            {applicants.map((applicant: any) => (
                                <div className=' border rounded-lg p-3 space-y-1'>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="flex-shrink-0">
                                            <Image
                                                onClick={() => handleProfile(applicant.applicantId._id)}
                                                src={applicant.applicantId.profileImage ? applicant.applicantId.profileImage : "/assets/user.png"}
                                                alt={applicant.applicantId.fullName}
                                                className="cursor-pointer w-12 h-12 rounded-full object-top object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <p onClick={() => handleProfile(applicant.applicantId._id)} className="cursor-pointer hover:underline font-bold text-base">{applicant.applicantId.fullName}</p>
                                            <p className="text-xs text-gray-500">{applicant.applicantId.email}</p>
                                        </div>
                                    </div>

                                    {applicant.resumeLink?.startsWith('http') ? (
                                        <Link
                                            href={applicant.resumeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <button className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'>
                                                View Resume
                                            </button>
                                        </Link>
                                    ) : (
                                        <button onClick={() => handleInvalidLink('Resume not available')} className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'>
                                            View Resume
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplicantsList;
