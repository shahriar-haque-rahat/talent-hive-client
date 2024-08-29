'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { BiBookmarkAlt, BiCommentDetail, BiLike, BiShare } from 'react-icons/bi';

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
            {Array.isArray(posts) &&
                posts?.map((post, index) => (
                    <div key={index} className='bg-white border border-gray-300 rounded-lg'>
                        <div className='flex gap-2 p-3'>
                            <Image
                                src={post.profileImage}
                                alt={post.fullName}
                                className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                                width={48}
                                height={48}
                            />
                            <div>
                                <h1 className='font-semibold'>{post.fullName}</h1>
                                <p className='text-xs mt-2'>{post.timestamp.slice(0, 10)}</p>
                            </div>
                        </div>

                        <div className='mt-2 p-3'>
                            <p>{renderContent(post.content, index)}</p>
                        </div>

                        <div>
                            <Image
                                src='/assets/bg.jpg'
                                alt='image loading...'
                                className="border-2 border-white w-full h-96 object-cover object-center"
                                width={1000}
                                height={1000}
                            />
                        </div>

                        {/* TODO: singular plural has to be defined */}
                        <div>
                            <div className=' text-xs flex items-center justify-end gap-2 text-gray-500 px-3 py-1'>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>10 Likes</p><p className=' font-bold'>.</p>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>5 Comments</p><p className=' font-bold'>.</p>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>5 Shares</p>
                            </div>
                            <div className=' flex justify-evenly'>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><BiLike size={20} />Like</button>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><BiCommentDetail size={20} />Comment</button>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><BiShare className=' z-0' style={{ transform: "scaleX(-1)" }} size={20} />Share</button>
                                <button className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'><BiBookmarkAlt size={20} />Save</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default NewsFeed;
