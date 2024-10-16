'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUserProfile } from '@/redux/userSlice';
import { clearTimelinePosts } from '@/redux/postSlice';

interface ReduxHandlerProps {
    userData: any;
}

const ReduxHandler = ({ userData }: ReduxHandlerProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData) {
            dispatch(clearTimelinePosts());
            dispatch(addUserProfile(userData));
        }
    }, [userData, dispatch]);

    return null;
};

export default ReduxHandler;
