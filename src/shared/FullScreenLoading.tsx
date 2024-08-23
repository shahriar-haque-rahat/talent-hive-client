import React from "react";
import { Spinner } from "@nextui-org/spinner";
import Navbar from "@/components/navbar/Navbar";

const FullScreenLoading = () => {
    return (
        <>
            <Navbar />
            <section className="flex w-screen h-screen bg-white z-10  justify-center items-center">
                <Spinner size="md" />
            </section>
        </>
    );
};

export default FullScreenLoading;
