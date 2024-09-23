import React from 'react';
import PostSection from './PostSection';

const LeftSidebar = () => {
    return (
        <>
            <div className=' bg-white rounded-lg pb-4 border border-gray-300'>
                {/* profile icon */}
                <div className=' relative'>
                    <div>
                        <img
                            src="/assets/bg.jpg"
                            alt="back ground"
                            className=" rounded-t-lg h-16 w-full object-cover object-center"
                        />
                    </div>
                    <div className=' w-full flex justify-center absolute transform -translate-y-1/2 '>
                        <img
                            src="/assets/user.png"
                            alt="Profile"
                            className="rounded-full border-2 border-white w-16 h-16 object-cover object-center"
                        />
                    </div>
                </div>

                {/* info */}
                <div className=' pt-12 px-3'>
                    <div className='pb-3 text-center'>
                        <h1 className=' font-bold'>Shahriar Haque</h1>
                        <p className=' text-xs'>MERN Stack Developer || Focused on Building Reliable Web Applications || Interested in Software Engineering</p>
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

export default LeftSidebar;
