import Image from 'next/image';
import React, { useState } from 'react';
import NewsFeed from './NewsFeed';
import PostModal from './posting/PostModal';
import { MdArticle, MdPermMedia } from 'react-icons/md';

const CentralFeed = () => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const openPostModal = () => {
        setIsPostModalOpen(true);
    };

    const closePostModal = () => {
        setIsPostModalOpen(false);
    };

    const posts = [
        {
            username: 'Tom Holland',
            profileImage: '/assets/user.png',
            date: '2024-08-25',
            content: 'Efficient operations are the backbone of any successful business. Ensuring that your team has the right tools, processes, and strategies in place can make a significant difference in productivity and profitability. This is key for long-term success.Efficient operations are the backbone of any successful business. Ensuring that your team has the right tools, processes, and strategies in place can make a significant difference in productivity and profitability. This is key for long-term success.Efficient operations are the backbone of any successful business. Ensuring that your team has the right tools, processes, and strategies in place can make a significant difference in productivity and profitability. This is key for long-term success.Efficient operations are the backbone of any successful business. Ensuring that your team has the right tools, processes, and strategies in place can make a significant difference in productivity and profitability. This is key for long-term success.',
        },
        {
            username: 'Zendaya',
            profileImage: '/assets/user.png',
            date: '2024-08-24',
            content: 'Collaboration and communication are crucial in any team setting. Whether remote or in-person, keeping everyone on the same page is essential. This can significantly impact productivity and team morale, leading to better outcomes.',
        },
        {
            username: 'Chris Hemsworth',
            profileImage: '/assets/user.png',
            date: '2024-08-23',
            content: 'Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence. Being a leader requires a balance of confidence, humility, and a constant drive to improve not just yourself, but your entire team.',
        },
        {
            username: 'Robert Downey Jr.',
            profileImage: '/assets/user.png',
            date: '2024-08-22',
            content: 'Creativity is intelligence having fun. It’s about thinking outside the box and coming up with solutions that others haven’t thought of yet. In the world of business, creativity can lead to innovation, helping companies stay ahead of the competition.',
        },
        {
            username: 'Scarlett Johansson',
            profileImage: '/assets/user.png',
            date: '2024-08-21',
            content: 'Emotional intelligence is key to personal and professional success. Understanding and managing your own emotions, as well as empathizing with others, can improve relationships and foster a positive working environment.',
        },
        {
            username: 'Chris Evans',
            profileImage: '/assets/user.png',
            date: '2024-08-20',
            content: 'Resilience is the ability to bounce back from setbacks. It’s about being able to adapt to challenges and keep moving forward, no matter what obstacles come your way. This is a vital skill in both personal and professional life.',
        },
        {
            username: 'Mark Ruffalo',
            profileImage: '/assets/user.png',
            date: '2024-08-19',
            content: 'Sustainability is not just a buzzword; it’s a necessity. Businesses today must consider the environmental and social impact of their operations and work towards creating a sustainable future for the generations to come.',
        },
        {
            username: 'Brie Larson',
            profileImage: '/assets/user.png',
            date: '2024-08-18',
            content: 'Innovation distinguishes between a leader and a follower. In today’s fast-paced world, staying ahead of the curve requires constant innovation and a willingness to take risks. Those who can adapt and innovate will thrive in the ever-changing business landscape.',
        },
        {
            username: 'Samuel L. Jackson',
            profileImage: '/assets/user.png',
            date: '2024-08-17',
            content: 'Diversity and inclusion are not just about doing the right thing; they are also good for business. Diverse teams bring different perspectives, leading to more creative solutions and better decision-making. Inclusion ensures that everyone’s voice is heard, fostering a culture of respect and collaboration.',
        },
        {
            username: 'Benedict Cumberbatch',
            profileImage: '/assets/user1.png',
            date: '2024-08-16',
            content: 'Continuous learning is the key to staying relevant in today’s ever-changing job market. Whether it’s picking up a new skill or staying updated with industry trends, those who are committed to lifelong learning will always have a competitive edge.',
        },
        {
            username: 'Chadwick Boseman',
            profileImage: '/assets/user1.png',
            date: '2024-08-15',
            content: 'Empowerment involves giving people the authority, tools, and resources they need to succeed. When people are empowered, they are more engaged, more productive, and more likely to go above and beyond in their roles.',
        },
        {
            username: 'Tom Hiddleston',
            profileImage: '/assets/user1.png',
            date: '2024-08-14',
            content: 'Teamwork makes the dream work. Working together towards a common goal, leveraging each other’s strengths, and supporting one another is the foundation of any successful team. Together, we can achieve more than we ever could alone.',
        },
        {
            username: 'Elizabeth Olsen',
            profileImage: '/assets/user1.png',
            date: '2024-08-13',
            content: 'Customer focus means putting the customer at the center of everything you do. Understanding their needs, exceeding their expectations, and building strong relationships are key to long-term success in any business.',
        },
        {
            username: 'Anthony Mackie',
            profileImage: '/assets/user1.png',
            date: '2024-08-12',
            content: 'Adaptability is about being able to change course when necessary. In today’s fast-paced world, those who can adapt to new situations and challenges are more likely to succeed.',
        },
        {
            username: 'Paul Rudd',
            profileImage: '/assets/user1.png',
            date: '2024-08-11',
            content: 'Work-life balance is essential for maintaining long-term productivity and well-being. It’s about finding the right balance between work and personal life, ensuring that neither is neglected.',
        },
        {
            username: 'Chris Pratt',
            profileImage: '/assets/user1.png',
            date: '2024-08-10',
            content: 'Mentorship plays a crucial role in personal and professional growth. A good mentor can provide guidance, share valuable experiences, and help navigate the challenges of career development.',
        },
        {
            username: 'Jeremy Renner',
            profileImage: '/assets/user1.png',
            date: '2024-08-09',
            content: 'Gratitude is a powerful tool for both personal happiness and professional success. Taking the time to appreciate the people and opportunities around you can lead to a more positive and productive work environment.',
        },
        {
            username: 'Don Cheadle',
            profileImage: '/assets/user1.png',
            date: '2024-08-08',
            content: 'Networking is about building relationships. Whether it’s connecting with colleagues, industry peers, or potential clients, a strong network can open doors to new opportunities and resources.',
        },
        {
            username: 'Vin Diesel',
            profileImage: '/assets/user1.png',
            date: '2024-08-07',
            content: 'Trust is the foundation of any successful relationship, be it personal or professional. Building trust takes time, but it is essential for collaboration, communication, and long-term success.',
        },
        {
            username: 'Gal Gadot',
            profileImage: '/assets/user2.png',
            date: '2024-08-06',
            content: 'Self-discipline is the bridge between goals and accomplishment. It’s about doing what needs to be done, even when you don’t feel like it, in order to achieve your long-term objectives.',
        },
        {
            username: 'Jason Momoa',
            profileImage: '/assets/user2.png',
            date: '2024-08-05',
            content: 'Taking initiative is about being proactive rather than reactive. Those who take initiative don’t wait for things to happen; they make things happen, leading to better outcomes and more opportunities.',
        },
        {
            username: 'Ezra Miller',
            profileImage: '/assets/user2.png',
            date: '2024-08-04',
            content: 'Ethical leadership is about doing the right thing, even when it’s not the easy thing. Leading with integrity and making decisions that align with your values builds trust and respect.',
        },
        {
            username: 'Amber Heard',
            profileImage: '/assets/user2.png',
            date: '2024-08-03',
            content: 'Effective communication is key to building strong relationships, resolving conflicts, and achieving goals. Whether verbal or written, clear communication ensures everyone is on the same page and working towards the same objectives.',
        },
        {
            username: 'Margot Robbie',
            profileImage: '/assets/user2.png',
            date: '2024-08-02',
            content: 'Collaboration across teams and departments is essential for innovation and success. Breaking down silos and encouraging cross-functional teamwork leads to more creative solutions and better results.',
        },
    ];


    return (
        <>
            <div className='bg-white p-3 border border-gray-300 rounded-lg'>
                <div className='flex items-center justify-center gap-2'>
                    <Image
                        src="/assets/user.png"
                        alt="Profile"
                        className="rounded-full border-2 border-white w-12 h-12 object-cover object-center"
                        width={48}
                        height={48}
                    />
                    <button onClick={openPostModal} className='hover:bg-gray-100 text-sm text-left border border-gray-400 p-2 pl-4 rounded-full w-full'>
                        Create a post
                    </button>
                </div>
                {/* <div className='text-sm mt-4 flex justify-evenly'>
                    <button className='hover:bg-gray-100 p-2 flex gap-2 items-center text-blue-500'>
                        <MdPermMedia size={20} />Add Media
                    </button>
                    <button className='hover:bg-gray-100 p-2 flex gap-2 items-center text-orange-500'>
                        <MdArticle size={20} />Job Post
                    </button>
                </div> */}
            </div>
            <div className='my-6 border-t border-gray-500'></div>
            <NewsFeed posts={posts} />
            <PostModal
                isOpen={isPostModalOpen}
                onClose={closePostModal}
            />
        </>
    );
};

export default CentralFeed;
