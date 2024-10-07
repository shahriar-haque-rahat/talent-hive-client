'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getCompanies } from '@/apiFunctions/companyData';
import { setCompanies, setCompaniesPage } from '@/redux/companySlice';
import CompanyCard from './CompanyCard';
import CompanyCardSkeleton from '@/skeletons/CompanyCardSkeleton';

const Companies = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const companies = useSelector((state: any) => state.company.companies);
    const page = useSelector((state: any) => state.company.companiesPage);
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const fetchCompanies = async () => {
        if (!user || !hasMore) return;

        const fetchedCompanies = await getCompanies(page, 10);

        if (fetchedCompanies && fetchedCompanies.companies && Array.isArray(fetchedCompanies.companies)) {
            if (fetchedCompanies.companies.length < 10) {
                setHasMore(false);
            }

            const existingCompanyIds = new Set(companies.map(company => company._id));
            const newCompanies = fetchedCompanies.companies.filter(company => !existingCompanyIds.has(company._id));

            if (newCompanies.length > 0) {
                dispatch(setCompanies([...companies, ...newCompanies]));
                dispatch(setCompaniesPage(fetchedCompanies.page));
            }
        }
        else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (companies.length === 0) {
            fetchCompanies();
        }
    }, [user]);

    useEffect(() => {
        if (inView && hasMore) {
            fetchCompanies();
        }
    }, [inView, hasMore]);

    return (
        <>
            <div>
                <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow border'>Company Recommendations</h1>
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                        companies?.map(company => (
                            <CompanyCard company={company} />
                        ))
                    }
                </div>
            </div>

            {/* Element to trigger for more fetch */}
            {hasMore && (
                <div ref={ref} className="h-fit">
                    <CompanyCardSkeleton />
                </div>
            )}
        </>
    );
};

export default Companies;
