import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (callback:(...args:any[])=>void,delay:number)=>{
    const intervalRef = useRef<ReturnType <typeof setTimeout>>();
    useEffect(()=>{
        return clearTimeout(intervalRef.current);
    },[]);
    return useCallback((...args:any[])=> {
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }
        intervalRef.current = setTimeout(()=>callback(...args),delay);
    },[callback, delay]);

};