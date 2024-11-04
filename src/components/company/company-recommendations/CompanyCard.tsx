import { followCompany as followAPI, unfollowCompany as unfollowAPI } from '@/apiFunctions/companyData';
import { useDispatch } from 'react-redux';
import { followCompany, unfollowCompany } from '@/redux/companySlice';
import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CompanyCard = ({ company, userId, followed }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [buttonLoading1, setButtonLoading1] = useState(false);
    const [buttonLoading2, setButtonLoading2] = useState(false);

    const description = company?.companyDescription;
    const wordCount = description ? description.split(' ').length : 0;

    const handleFollow = async () => {
        try {
            setButtonLoading1(true);

            await followAPI(company._id, userId);
            dispatch(followCompany(company));
        } catch (error) {
            console.log('Error following company', error)
        }

        setButtonLoading1(false);
    };

    const handleUnfollow = async () => {
        try {
            setButtonLoading2(true);

            await unfollowAPI(company._id, userId);
            dispatch(unfollowCompany(company));
        } catch (error) {
            console.log('Error unfollowing company', error)
        }

        setButtonLoading2(false);
    };

    const handleCompanyDetails = () => {
        router.push(`/company?id=${company._id}`);
    }

    return (
        <div className="bg-white rounded-lg p-3 shadow border flex flex-col justify-between">
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
                        <button onClick={handleCompanyDetails} className="text-sky-500 cursor-pointer ml-1">
                            Read More
                        </button>
                    )}
                </p>
            </div>

            {followed ? (
                <button
                    onClick={handleUnfollow}
                    className="w-full mt-2 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold"
                    disabled={buttonLoading2}
                >
                    <FiCheck size={16} /> Unfollow
                </button>
            ) : (
                <button
                    onClick={handleFollow}
                    className="w-full mt-2 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold"
                    disabled={buttonLoading1}
                >
                    <FiPlus size={16} /> Follow
                </button>
            )}
        </div>
    );
};

export default CompanyCard;
