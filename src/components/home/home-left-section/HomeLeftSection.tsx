import React from 'react';
import PostSection from './PostSection';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const HomeLeftSection = () => {
    const user = useSelector((state: any) => state.user.user);

    return (
        <>
            <div className=' bg-white rounded-lg border shadow'>
                {/* profile icon */}
                <div className=' relative'>
                    <div>
                        <img
                            src={user?.coverImage ? user.coverImage : "/assets/bg.jpg"}
                            alt="back ground"
                            className=" rounded-t-lg h-16 w-full object-cover object-center"
                        />
                    </div>
                    <div className=' w-full flex justify-center absolute transform -translate-y-1/2 '>
                        <img
                            src={user?.profileImage ? user.profileImage : "/assets/user.png"}
                            alt="Profile"
                            className="rounded-full border-2 border-white w-16 h-16 object-cover object-center"
                        />
                    </div>
                </div>

                {/* info */}
                <div className=' pt-8'>
                    <div className='pb-3 px-3 text-center space-y-1 border-b border-gray-300'>
                        <h1 className=' font-bold'>Shahriar Haque</h1>
                        <p className=' text-xs font-semibold'>{user?.designation}</p>
                        <p className=' text-xs'>{user?.about}</p>
                    </div>

                    <Link href={'/my-connections'}>
                        <div className=' hover:bg-gray-100 rounded-b-lg text-sm p-3 flex justify-between'>
                            <p>Connections</p>
                            <p className=' text-sky-500 font-semibold'>{user?.connectionsCount}</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='my-6 border-t border-gray-500'></div>
            <PostSection />
        </>
    );
};

export default HomeLeftSection;
