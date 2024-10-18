import { followCompany as followAPI, unfollowCompany as unfollowAPI } from '@/apiFunctions/companyData';
import { useDispatch } from 'react-redux';
import { followCompany, unfollowCompany } from '@/redux/companySlice';
import React from 'react';
import { FiCheck, FiPlus } from 'react-icons/fi';
import { createCompanyFollowedEvent } from '@/event-emitter/events';

const InteractionButtons = ({ isFollowed, setCompany, setIsFollowed, company, userId }) => {
    const dispatch = useDispatch();

    const handleFollow = async () => {
        const res = await followAPI(company._id, userId);
        setCompany(res.company)
        dispatch(followCompany(company));
        setIsFollowed(true);

        const event = createCompanyFollowedEvent(company._id);
        window.dispatchEvent(event);
    };

    const handleUnfollow = async () => {
        const res = await unfollowAPI(company._id, userId);
        setCompany(res.company)
        dispatch(unfollowCompany(company));
        setIsFollowed(false);
    };

    return (
        <>
            <div>
                {isFollowed ? (
                    <button
                        onClick={handleUnfollow}
                        className="w-28 text-sm py-2 px-3 rounded-lg border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white flex gap-1 justify-center items-center font-bold"
                    >
                        <FiCheck size={16} /> Unfollow
                    </button>
                ) : (
                    <button
                        onClick={handleFollow}
                        className="w-28 text-sm py-2 px-3 rounded-lg border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white flex gap-1 justify-center items-center font-bold"
                    >
                        <FiPlus size={16} /> Follow
                    </button>
                )}
            </div>
        </>
    );
};

export default InteractionButtons;
