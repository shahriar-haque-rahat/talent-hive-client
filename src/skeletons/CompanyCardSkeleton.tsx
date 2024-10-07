import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from "@nextui-org/react";

const CompanyCardSkeleton = () => {
    const [cardsToShow, setCardsToShow] = useState(2);

    // Function to handle resizing
    const updateCardsToShow = () => {
        const width = window.innerWidth;
        if (width >= 1280) {
            setCardsToShow(4); // xl
        } else if (width >= 1024) {
            setCardsToShow(3); // lg
        } else if (width >= 768) {
            setCardsToShow(2); // md
        } else {
            setCardsToShow(1); // sm and below
        }
    };

    useEffect(() => {
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, []);

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
                {/* Render only the number of cards based on screen size */}
                {[...Array(cardsToShow)].map((_, idx) => (
                    <div key={idx} className=' bg-white p-3 rounded-lg'>
                        <div className="flex gap-3 xl:gap-6 mb-4">
                            <Skeleton className="flex-shrink-0 w-16 md:w-20 h-16 md:h-20 my-auto rounded-full">
                                <div className="rounded-full w-16 md:w-20 h-16 md:h-20 bg-default-300"></div>
                            </Skeleton>
                            <div className="flex-grow flex flex-col gap-2 justify-center">
                                <Skeleton className="w-36 rounded-lg">
                                    <div className="h-6 w-36 bg-default-300"></div>
                                </Skeleton>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Skeleton className="rounded-lg">
                                <div className="h-4 w-full bg-default-300"></div>
                            </Skeleton>
                            <Skeleton className="rounded-lg">
                                <div className="h-4 w-3/4 bg-default-300"></div>
                            </Skeleton>
                            <Skeleton className="rounded-lg">
                                <div className="h-4 w-3/4 bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CompanyCardSkeleton;
