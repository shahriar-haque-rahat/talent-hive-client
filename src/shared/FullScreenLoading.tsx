import React from "react";
import {Spinner} from "@nextui-org/spinner";

const FullScreenLoading = () => {
    return (
        <section className="flex w-screen h-screen bg-white z-50  justify-center items-center">
            <Spinner size="md" />
        </section>
    );
};

export default FullScreenLoading;
