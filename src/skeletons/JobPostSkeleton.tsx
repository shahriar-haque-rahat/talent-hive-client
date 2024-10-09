import { Card, Skeleton } from '@nextui-org/react';
import React from 'react';

const JobPostSkeleton = () => {
    return (
        <>
            <Card className=' p-3 md:p-6 rounded-none rounded-b-lg'>
                <div className="flex gap-3 xl:gap-6 mb-4">
                    <Skeleton className="flex-shrink-0 w-16 md:w-20 h-16 md:h-20 my-auto rounded-full">
                        <div className="rounded-full w-16 md:w-20 h-16 md:h-20 bg-default-300"></div>
                    </Skeleton>
                    <div className="flex-grow flex flex-col gap-2 justify-center">
                        <Skeleton className="w-48 rounded-lg">
                            <div className="h-4 w-48 bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="w-48 rounded-lg">
                            <div className="h-3 w-48 bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="w-48 rounded-lg">
                            <div className="h-3 w-48 bg-default-300"></div>
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
                </div>
            </Card>
        </>
    );
};

export default JobPostSkeleton;
