import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from "@nextui-org/react";

const UserConnectionCardSkeleton = () => {
    const [cardsToShow, setCardsToShow] = useState(2);

    // Function to handle resizing
    const updateCardsToShow = () => {
        const width = window.innerWidth;
        if (width >= 1280) {
            setCardsToShow(5); // xl
        } else if (width >= 1024) {
            setCardsToShow(4); // lg
        } else if (width >= 768) {
            setCardsToShow(3); // md
        } else {
            setCardsToShow(2); // sm and below
        }
    };

    useEffect(() => {
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, []);

    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4'>
                {/* Render only the number of cards based on screen size */}
                {[...Array(cardsToShow)].map((_, idx) => (
                    <Card key={idx} className="flex flex-col bg-white justify-center items-center gap-3 rounded-lg border shadow" radius="lg">
                        <div className="w-full relative">
                            {/* Cover Image Skeleton */}
                            <Skeleton className="w-full h-28 rounded-none rounded-t-lg">
                                <div className="w-full h-28 bg-default-300 rounded-none rounded-t-lg"></div>
                            </Skeleton>

                            {/* Profile Image Skeleton */}
                            <div className="w-full flex justify-center absolute top-6">
                                <Skeleton className="rounded-full border-2 border-white">
                                    <div className="w-36 h-36 bg-default-300 rounded-full"></div>
                                </Skeleton>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-3 mt-14 pt-0 p-3 items-center justify-center">
                            {/* Name and Designation Skeleton */}
                            <div className="text-center">
                                <Skeleton className="w-32 rounded-lg">
                                    <div className="h-4 w-32 bg-default-300"></div>
                                </Skeleton>
                                <Skeleton className="w-24 rounded-lg mt-2">
                                    <div className="h-3 w-24 bg-default-300"></div>
                                </Skeleton>
                            </div>

                            {/* Button Skeleton */}
                            <Skeleton className="w-full rounded-lg">
                                <div className="h-10 w-full bg-default-300 rounded-lg"></div>
                            </Skeleton>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default UserConnectionCardSkeleton;
