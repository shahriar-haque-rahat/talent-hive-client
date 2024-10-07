import React from 'react';
import PostSection from './PostSection';
import { useSelector } from 'react-redux';

const HomeLeftSection = () => {
    const user = useSelector((state: any) => state.user.user);

    return (
        <>
            <div className=' bg-white rounded-lg pb-4 border shadow'>
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
                <div className=' pt-8 px-3'>
                    <div className='pb-3 text-center space-y-1'>
                        <h1 className=' font-bold'>Shahriar Haque</h1>
                        <p className=' text-xs font-semibold'>{user?.designation}</p>
                        <p className=' text-xs'>{user?.about}</p>
                    </div>

                    <div className=' text-sm pt-3 flex justify-between border-t border-gray-300 '>
                        <p>Connections</p>
                        <p className=' text-sky-500 font-semibold'>12</p>
                    </div>
                </div>
            </div>
            <div className='my-6 border-t border-gray-500'></div>
            <PostSection />
        </>
    );
};

export default HomeLeftSection;
