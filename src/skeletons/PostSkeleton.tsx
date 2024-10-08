import React from 'react';
import { Card, Skeleton } from "@nextui-org/react";

const PostSkeleton = () => {
    return (
        <Card className="w-full p-6 pb-2" radius="lg">
            {/* User details skeleton */}
            <div className="flex gap-3 items-center space-y-0">
                <Skeleton className="rounded-full">
                    <div className="w-14 h-14 rounded-full bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                    <Skeleton className="w-32 rounded-lg">
                        <div className="h-4 w-32 bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-20 rounded-lg">
                        <div className="h-3 w-20 bg-default-300"></div>
                    </Skeleton>
                </div>
            </div>

            <div className="mt-6 space-y-5">
                {/* Post content skeleton */}
                <Skeleton className="w-full rounded-lg">
                    <div className="h-5 bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-5 bg-default-300"></div>
                </Skeleton>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                {/* Media skeleton */}
                <Skeleton className="w-full rounded-lg">
                    <div className="h-32 bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-32 bg-default-300"></div>
                </Skeleton>
            </div>

            <div className="mt-6 flex justify-evenly space-x-4">
                {/* Interaction section skeleton */}
                <Skeleton className="rounded-lg">
                    <div className="w-10 h-10 bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="w-10 h-10 bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="w-10 h-10 bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="w-10 h-10 bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );
};

export default PostSkeleton;
