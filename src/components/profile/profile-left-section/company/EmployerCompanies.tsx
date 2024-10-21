'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import EmployerCompanyCard from './EmployerCompanyCard';
import { getCompaniesByEmployer } from '@/apiFunctions/companyData';
import { Button } from '@nextui-org/react';
import CompanyPostingModal from './CompanyPostingModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/scrollbar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const EmployerCompanies = () => {
    const user = useSelector((state: any) => state.user.user);
    const userProfile = useSelector((state: any) => state.user.userProfile);
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [companyForEdit, setCompanyForEdit] = useState(null);

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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddOrUpdateCompany = (newCompany) => {
        setCompanies((prevCompanies) => {
            const companyExists = prevCompanies.some(company => company._id === newCompany._id);
    
            if (companyExists) {
                return prevCompanies.map(company =>
                    company._id === newCompany._id ? newCompany : company
                );
            } else {
                return [...prevCompanies, newCompany];
            }
        });
    };

    const handleEditCompany = (companyId) => {
        const res = companies.find((company: any) => company._id === companyId);
        setCompanyForEdit(res)
        setIsModalOpen(true);
    }

    const removeCompany = (companyId) => {
        setCompanies((prevCompanies) => prevCompanies.filter(company => company._id !== companyId));
    }

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <div className='bg-white border rounded-lg shadow p-3 space-y-2'>
                <div className='px-2'>
                    <Button onClick={handleOpenModal} className='w-full border border-gray-400 rounded-lg bg-white hover:bg-gray-100'>
                        Create a company
                    </Button>
                </div>

                {companies.length > 0 && (
                    <div className="w-full max-w-sm md:max-w-2xl xl:max-w-4xl mx-auto">
                        <Swiper
                            modules={[Navigation, Scrollbar]}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current
                            }}
                            onSwiper={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                            scrollbar
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 2 },
                            }}
                            className="mySwiper"
                        >
                            {companies.map((company) => (
                                <SwiperSlide key={company._id}>
                                    <div className=''>
                                        <EmployerCompanyCard company={company} removeCompany={removeCompany} handleEditCompany={handleEditCompany} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom buttons */}
                        <div className="flex justify-start gap-3 mt-2">
                            <button
                                ref={prevRef}
                                className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-500 text-white hover:bg-sky-700"
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            <button
                                ref={nextRef}
                                className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-500 text-white hover:bg-sky-700"
                            >
                                <FaArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <CompanyPostingModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                addOrUpdateCompany={handleAddOrUpdateCompany}
                employerId={user._id}
                company={companyForEdit}
            />
        </>
    );
};

export default EmployerCompanies;
