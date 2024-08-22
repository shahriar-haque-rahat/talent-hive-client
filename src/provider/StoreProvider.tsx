"use client";
import { ReactNode } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";

interface StoreInterface {
    children: ReactNode;
}
const StoreProvider = ({ children }: StoreInterface) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
