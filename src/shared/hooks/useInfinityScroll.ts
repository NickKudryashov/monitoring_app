import { MutableRefObject, useEffect, useMemo, useRef } from "react";

interface InfinityScrollProps {
    wrapperRef:MutableRefObject<HTMLElement>;
    triggerRef:MutableRefObject<HTMLElement>;
    callback:()=>void;
}



export const useInfinityScroll = ({callback,triggerRef,wrapperRef}:InfinityScrollProps)=>{
    const options = useMemo(()=>
        ({
            root: wrapperRef.current,
            rootMargin: "0px",
            threshold: 1.0,
        })
    ,[wrapperRef]); 
    useEffect(()=>{
        console.log("INF SCROLL");
        if (callback) {
            const observer = new IntersectionObserver(([entry])=>{
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);
            observer.observe(triggerRef.current);
            return ()=>{
                if (observer) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                    observer.unobserve(triggerRef.current);
                }
            };}
    
    },[callback, options, triggerRef, wrapperRef]);};