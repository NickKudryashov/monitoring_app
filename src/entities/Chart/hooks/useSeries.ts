import { useMemo } from "react";
import { useGetChartDatasets } from "../model/selectors/selectors";

export const useSeries = ()=>{
    const datasets = useGetChartDatasets();
    const series = useMemo(() => {
        const result = datasets.map((el) => {
            const tempData = el.data.map((el) => [
                el.datetime * 1000,
                el.value,
            ]);
            return {
                name: el.name,
                data: tempData,
            };
        });
        return result;
    }, [datasets]);

    return series
}