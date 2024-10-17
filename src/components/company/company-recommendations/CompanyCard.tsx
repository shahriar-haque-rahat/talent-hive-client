import { followCompany as followAPI, unfollowCompany as unfollowAPI } from '@/apiFunctions/companyData';
import { useDispatch } from 'react-redux';
import { followCompany, unfollowCompany } from '@/redux/companySlice';
import { Image } from '@nextui-org/react';
import React from 'react';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CompanyCard = ({ company, userId, followed }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const description = company?.companyDescription;
    const wordCount = description ? description.split(' ').length : 0;

    const handleReadMore = () => {
        // Route to details page
    };

    const handleFollow = async () => {
        await followAPI(company._id, userId);
        dispatch(followCompany(company));
    };

    const handleUnfollow = async () => {
        await unfollowAPI(company._id, userId);
        dispatch(unfollowCompany(company));
    };

    const handleCompanyDetails = () => {
        router.push(`/company?id=${company._id}`);
    }

    return (
        <div className="bg-white rounded-lg p-3 shadow border">
            <div className="flex gap-3 xl:gap-6 mb-4">
                <div className="flex-shrink-0 w-16 md:w-20 h-16 md:h-20 my-auto">
                    <Image
                        onClick={handleCompanyDetails}
                        src={company.companyProfileImage || "/assets/user.png"}
                        alt="Profile"
                        className="cursor-pointer rounded-full w-16 md:w-20 h-16 md:h-20 border border-gray-300 object-cover object-top"
                    />
                </div>

                <div className="flex-grow flex flex-col gap-1 justify-center">
                    <h1 onClick={handleCompanyDetails} className="text-xl font-semibold hover:underline cursor-pointer">
                        {company.companyName}
                    </h1>
                </div>
            </div>

            <div>
                <p>
                    {wordCount <= 10
                        ? description
                        : `${description.split(' ').slice(0, 10).join(' ')}...`}
                    {wordCount > 10 && (
                        <button onClick={handleReadMore} className="text-sky-500 cursor-pointer ml-1">
                            Read More
                        </button>
                    )}
                </p>
            </div>

            {followed ? (
                <button
                    onClick={handleUnfollow}
                    className="w-full mt-2 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold"
                >
                    <FiCheck size={16} /> Unfollow
                </button>
            ) : (
                <button
                    onClick={handleFollow}
                    className="w-full mt-2 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold"
                >
                    <FiPlus size={16} /> Follow
                </button>
            )}
        </div>
    );
};

export default CompanyCard;
