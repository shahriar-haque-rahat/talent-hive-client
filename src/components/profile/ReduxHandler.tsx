'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserProfile } from '@/redux/userSlice';
import { clearTimelinePosts } from '@/redux/postSlice';
import { getUserDetails } from '@/apiFunctions/userData';

interface ReduxHandlerProps {
    id: string;
}

const ReduxHandler = ({ id }: ReduxHandlerProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);

    const fetchUser = async () => {
        const userData = await getUserDetails(user._id, id);

        if (userData) {
            dispatch(clearTimelinePosts());
            dispatch(addUserProfile(userData));
        }
    }

    useEffect(() => {
        fetchUser()
    }, [id, dispatch]);

    return null;
};

export default ReduxHandler;
