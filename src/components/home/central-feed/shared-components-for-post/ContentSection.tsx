import React, { useState } from 'react';

const ContentSection = ({ content, index }) => {
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
        <div className='p-3'>
            <p>{renderContent(content, index)}</p>
        </div>
    );
};

export default ContentSection;