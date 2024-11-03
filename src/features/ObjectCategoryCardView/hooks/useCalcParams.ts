import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useCalcParams = ()=>{
    const [searchParams, setSearchParams] = useSearchParams({
        event: "",
        no_answer: "",
    });
    const result = useMemo(() => {
        const event = searchParams.get("event");
        const no_answer = searchParams.get("no_answer");
        if (event) {
            return { event };
        } else if (no_answer) {
            return { no_answer };
        } else {
            return {};
        }
    }, [searchParams]);
    return result
}