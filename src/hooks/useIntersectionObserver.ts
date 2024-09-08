import { useInView } from "react-intersection-observer"

export const useIntersectionObserver = (options = {}) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
        ...options,
    });

    return { ref, inView };
};