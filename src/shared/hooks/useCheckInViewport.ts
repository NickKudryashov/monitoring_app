import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";

interface ViewportCheckProps {
    wrapperRef:MutableRefObject<HTMLElement>;
    triggerRef:MutableRefObject<HTMLElement>;
    changeStatus:(state:boolean)=>void;
}



export const useViewportCheck = ({changeStatus,triggerRef,wrapperRef}:ViewportCheckProps)=>{
    const options = useMemo(()=>
        ({
            root: wrapperRef.current,
            rootMargin: "0px",
            threshold: 1.0,
        })
    ,[wrapperRef]); 
    useEffect(()=>{
        // console.log("INF SCROLL");
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) {
                changeStatus(true);
            }
            else {
                changeStatus(false);
            }
        }, options);
        observer.observe(triggerRef.current);
        return ()=>{

            if (observer) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef.current);
            }
        };
    
    },[changeStatus, options, triggerRef, wrapperRef]);
};