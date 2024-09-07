import { MutableRefObject, useCallback, useEffect, useRef } from "react";

export const useDebounce = <T extends any[]>(callback:(...args:T)=>void,delay:number)=>{
    const intervalRef = useRef<ReturnType <typeof setTimeout>>(null) as MutableRefObject<ReturnType <typeof setTimeout>>;
    useEffect(()=>{
        return ()=> {
            if (intervalRef.current){
                clearTimeout(intervalRef.current);
            }
        };
    },[]);
    return useCallback((...args:T)=> {
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }
        intervalRef.current = setTimeout(()=>callback(...args),delay);
    },[callback, delay]);

};
