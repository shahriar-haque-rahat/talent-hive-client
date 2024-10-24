import React from 'react';
import Details from './Details';

interface PostDetails {
    id: string
}

const PostDetails = async ({ id }: PostDetails) => {
    return (
        <>
            <Details postId={id} />
        </>
    );
};

export default PostDetails;
