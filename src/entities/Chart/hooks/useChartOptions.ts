import { ApexOptions } from "apexcharts";
import { locales } from "../locales/locale";
import moment from "moment";
import { useMemo } from "react";

export const useChartOptions = (start_date:string,end_date:string):ApexOptions=>{
    const options:ApexOptions = useMemo(()=> ({
        chart: {
            id: "simple-bar",
            defaultLocale: "ru",
            locales: locales,
        },
        stroke: {
            width: 0.75,
        },
        xaxis: {
            type: "datetime",
            min: new Date(start_date).getTime(),
            max: new Date(end_date).getTime(),
            tickAmount: 6,
            labels: {
                formatter: function (value) {
                    return moment(value).format("DD.MM.YY HH:mm");
                },
                datetimeUTC: false,
            },
        },
    }),[start_date,end_date])
    return options
}