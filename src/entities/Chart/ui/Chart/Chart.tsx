import { ReactElement, useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { getDatasets } from "entities/Chart/model/selectors/selectors";
import { jsPDF } from "jspdf";
import cls from "./Chart.module.scss";
import { Moment } from "moment";
import { AppButon } from "shared/ui/AppButton/AppButton";
import moment from "moment";
import classNames from "shared/lib/classNames/classNames";
import { locales } from "entities/Chart/locales/locale";
export const BaseChart = (props: {
    start_date: string;
    end_date: string;
    className?: string;
}): ReactElement => {
    const { start_date, end_date, className } = props;
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
                formatter: function (value, timestamp) {
                    return moment(value).format("DD.MM.YY HH:mm");
                },
                datetimeUTC: false,
            },
        },
    };

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
