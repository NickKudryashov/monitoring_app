import { ReactElement } from "react";
import Chart from "react-apexcharts";
import cls from "./Chart.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { useSeries } from "../../hooks/useSeries";
import { useChartOptions } from "../../hooks/useChartOptions";
export const BaseChart = (props: {
    start_date: string;
    end_date: string;
    className?: string;
}): ReactElement => {
    const { start_date = "", end_date = "", className = "" } = props;
    const series = useSeries();
    const options = useChartOptions(start_date, end_date);

    return (
        <div className={classNames(cls.chart, {}, [className])}>
            <Chart
                id="chartCanvas"
                options={options}
                type="line"
                series={series}
                height={"95%"}
            />
        </div>
    );
};
