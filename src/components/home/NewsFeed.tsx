'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { MdBookmarkBorder } from "react-icons/md";

const NewsFeed = ({ posts }) => {
    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleReadMore = (index) => {
        setExpandedPosts((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const renderContent = (content, index) => {
        const words = content.split(' ');
        const isExpanded = expandedPosts[index];

        if (words.length > 20) {
            return (
                <>
                    {isExpanded ? content : words.slice(0, 20).join(' ') + '...'}
                    <span
                        onClick={() => toggleReadMore(index)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                </>
            );
        }
        return content;
    };

    return (
        <div className='space-y-4'>
            {
                posts?.map((post, index) => (
                    <div key={index} className='bg-white border border-gray-300 rounded-lg'>
                        <div className='flex gap-2 p-3'>
                            <Image
                                src={post.profileImage}
                                alt={post.username}
                                className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                                width={1000}
                                height={1000}
                            />
                            <div>
                                <h1 className='font-semibold'>{post.username}</h1>
                                <p className='text-xs mt-2'>{post.date}</p>
                            </div>
                        </div>

                        <div className='mt-2 p-3'>
                            <p>{renderContent(post.content, index)}</p>
                        </div>

                        <div>
                            <Image
                                src='/assets/bg.jpg'
                                alt={post.username}
                                className="border-2 border-white w-full h-96 object-cover object-center"
                                width={1000}
                                height={1000}
                            />
                        </div>

                        {/* singular plural has to be defined */}
                        <div>
                            <div className=' text-xs flex items-center gap-4 text-gray-500 px-3 py-1'>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>10 Likes</p>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>5 Comments</p>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>2 Shares</p>
                            </div>
                            <div className=' flex justify-evenly'>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><AiOutlineLike size={22} />Like</button>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><FaRegCommentDots size={20} />Comment</button>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><RiShareForwardLine size={22} />Share</button>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><MdBookmarkBorder size={22} />Save</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default NewsFeed;
