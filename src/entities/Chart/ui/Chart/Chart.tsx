import { ReactElement, useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { mockData } from "./mock";
import { useSelector } from "react-redux";
import { getDatasets } from "entities/Chart/model/selectors/selectors";
import cls from "./Chart.module.scss";
export const BaseChart = (props: {
    start_date: string;
    end_date: string;
}): ReactElement => {
    const { start_date, end_date } = props;
    const datasets = useSelector(getDatasets);
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
        console.log(result);
        return result;
    }, [datasets]);
    const options: ApexOptions = {
        chart: {
            id: "simple-bar",
        },
        xaxis: {
            type: "datetime",
            min: new Date(start_date).getTime(),
            max: new Date(end_date).getTime(),
            tickAmount: 6,
        },
    };
    return (
        <div className={cls.chart}>
            <Chart
                options={options}
                type="line"
                series={series}
                height={"95%"}
            />
        </div>
    );
};
