import React from "react";
import { Spinner } from "@nextui-org/spinner";

const FullScreenLoading = () => {
    return (
        <>
            <section className="flex w-full h-[100vh] z-10  justify-center items-center">
                <Spinner size="md" />
            </section>
        </>
    );
};

export default FullScreenLoading;
