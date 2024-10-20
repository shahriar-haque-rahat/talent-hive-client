'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import EmployerCompanyCard from './EmployerCompanyCard';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { getCompaniesByEmployer } from '@/apiFunctions/companyData';
import { Button } from '@nextui-org/react';

interface Company {
    _id: string;
    name: string;
}

const EmployerCompanies = () => {
    const user = useSelector((state: any) => state.user.user);
    const userProfile = useSelector((state: any) => state.user.userProfile);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleFetchCompanies = async () => {
        try {
            const fetchedCompanies = await getCompaniesByEmployer(userProfile._id);
            setCompanies(fetchedCompanies);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    useEffect(() => {
        if (userProfile) {
            handleFetchCompanies();
        }
    }, [userProfile]);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === Math.ceil(companies.length / 2) - 1 ? 0 : prevSlide + 1
        );
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? Math.ceil(companies.length / 2) - 1 : prevSlide - 1
        );
    };

    return (
        <>
            <div className='bg-white border rounded-lg shadow p-3 space-y-2'>
                <div className='px-2'>
                    <Button className='w-full border border-gray-400 rounded-lg bg-white hover:bg-gray-100'>
                        Create a company
                    </Button>
                </div>

                {(companies.length > 0) &&
                    <div>
                        <div className="relative max-w-full overflow-hidden" ref={containerRef}>
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >
                                {companies.map((company) => (
                                    <div
                                        key={company._id}
                                        className="w-1/2 flex-shrink-0 flex px-2"
                                    >
                                        <div className="w-full h-full flex flex-col justify-between bg-white border p-4 rounded-lg shadow min-h-[250px]">
                                            <EmployerCompanyCard company={company} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-start gap-4 mt-2">
                            <button
                                className="text-sky-500 hover:text-sky-600 rounded-full"
                                onClick={handlePrevSlide}
                            >
                                <FaArrowAltCircleLeft size={24} />
                            </button>
                            <button
                                className="text-sky-500 hover:text-sky-600 rounded-full"
                                onClick={handleNextSlide}
                            >
                                <FaArrowAltCircleRight size={24} />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default EmployerCompanies;
