'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getFollowedCompanies, getNotFollowedCompanies } from '@/apiFunctions/companyData';
import { setFollowedCompanies, setNotFollowedCompanies, setFollowedCompaniesPage, setNotFollowedCompaniesPage } from '@/redux/companySlice';
import { Tabs, Tab } from '@nextui-org/react';
import CompanyCard from './CompanyCard';
import CompanyCardSkeleton from '@/skeletons/CompanyCardSkeleton';
import CompanySearch from '@/components/shared/searching-components/CompanySearch';

interface CompanyListProps {
    companies: any[];
    hasMore: boolean;
    userId: string;
    followed: boolean;
    ref: React.Ref<HTMLDivElement>;
}

const Companies = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);

    const followedCompanies = useSelector((state: any) => state.company.followedCompanies);
    const notFollowedCompanies = useSelector((state: any) => state.company.notFollowedCompanies);
    const followedPage = useSelector((state: any) => state.company.followedCompaniesPage);
    const notFollowedPage = useSelector((state: any) => state.company.notFollowedCompaniesPage);

    const { ref: followedRef, inView: followedInView } = useIntersectionObserver();
    const { ref: notFollowedRef, inView: notFollowedInView } = useIntersectionObserver();

    const [hasMoreFollowed, setHasMoreFollowed] = useState(true);
    const [hasMoreNotFollowed, setHasMoreNotFollowed] = useState(true);

    const fetchCompanies = async (isFollowed: boolean) => {
        if (!user) return;

        if (isFollowed) {
            if (!hasMoreFollowed) return;
            const fetchedCompanies = await getFollowedCompanies(user._id, followedPage, 10);
            handleFetchedCompanies(fetchedCompanies, true);
        } else {
            if (!hasMoreNotFollowed) return;
            const fetchedCompanies = await getNotFollowedCompanies(user._id, notFollowedPage, 10);
            handleFetchedCompanies(fetchedCompanies, false);
        }
    };

    const handleFetchedCompanies = (fetchedCompanies: any, isFollowed: boolean) => {
        if (fetchedCompanies && Array.isArray(fetchedCompanies.companies)) {
            const newCompanies = fetchedCompanies.companies;

            if (newCompanies.length < 10) {
                if (isFollowed) setHasMoreFollowed(false);
                else setHasMoreNotFollowed(false);
            }

            if (isFollowed) {
                dispatch(setFollowedCompanies([...followedCompanies, ...newCompanies]));
                dispatch(setFollowedCompaniesPage(fetchedCompanies.page));
            } else {
                dispatch(setNotFollowedCompanies([...notFollowedCompanies, ...newCompanies]));
                dispatch(setNotFollowedCompaniesPage(fetchedCompanies.page));
            }
        }
    };

    useEffect(() => {
        if (followedCompanies.length === 0) fetchCompanies(true);
        if (notFollowedCompanies.length === 0) fetchCompanies(false);
    }, [user]);

    useEffect(() => {
        if (followedInView) {
            fetchCompanies(true);
        }
    }, [followedInView]);

    useEffect(() => {
        if (notFollowedInView) {
            fetchCompanies(false);
        }
    }, [notFollowedInView]);

    return (
        <>
            <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow border'>Company Recommendations</h1>


            <div className='mb-4 md:w-1/2'><CompanySearch /></div>

            <Tabs key={'default'} variant='underlined' aria-label="Company Tabs" radius="lg">
                <Tab title="Unfollowed Companies">
                    <CompanyList
                        companies={notFollowedCompanies}
                        hasMore={hasMoreNotFollowed}
                        userId={user._id}
                        followed={false}
                        ref={notFollowedRef}
                    />
                </Tab>
                <Tab title="Followed Companies">
                    <CompanyList
                        companies={followedCompanies}
                        hasMore={hasMoreFollowed}
                        userId={user._id}
                        followed={true}
                        ref={followedRef}
                    />
                </Tab>
            </Tabs>
        </>
    );
};

const CompanyList = React.forwardRef<HTMLDivElement, CompanyListProps>(({ companies, hasMore, userId, followed }, ref) => (
    <>
        {companies?.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                {
                    companies.map((company) => (
                        <CompanyCard key={company._id} company={company} userId={userId} followed={followed} />
                    ))
                }
            </div>
        ) : (
            <p className='w-full text-center'>No companies</p>
        )}

        {hasMore && (
            <div ref={ref} className="h-fit">
                <CompanyCardSkeleton />
            </div>
        )}
    </>
));

export default Companies;
