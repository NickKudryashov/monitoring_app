import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";

interface ViewportCheckProps {
    wrapperRef:MutableRefObject<HTMLElement>;
    triggerRef:MutableRefObject<HTMLElement>;
}



export const useViewportCheck = ({triggerRef,wrapperRef}:ViewportCheckProps):boolean=>{
    const [inView,setInView] = useState(false)
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
            setInView(entry.isIntersecting);
        }, options);
        observer.observe(triggerRef.current);
        return ()=>{
            if (observer && triggerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef.current);
            }
        };
    
    },[options, triggerRef, wrapperRef]);
    return inView
};