'use client'

import React, { useState } from 'react';
import NavbarContent from './NavbarContent';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const prevValue = scrollY.getPrevious() ?? 0;
        if (latest > prevValue && latest > 30) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <>
            <motion.div
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed max-w-screen shadow top-0 left-0 right-0 z-50 bg-white">
                <NavbarContent />
            </motion.div >
        </>
    );
};

export default Navbar;
