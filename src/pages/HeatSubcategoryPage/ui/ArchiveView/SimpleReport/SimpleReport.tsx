import { ReactElement, useState } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./SimpleReport.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import classNames from "shared/lib/classNames/classNames";
import { HeatDevice } from "entities/Heatcounters";
import { getArchives, getFiles } from "pages/HeatSubcategoryPage/api/api";
import { ArchTypeBlock } from "../ArchTypeBlock/ArchTypeBlock";
import { SystemsBlock } from "../SystemsBlock/SystemsBlock";
import $api, { API_URL } from "shared/api";
function SimpleReport(props: { deviceData: HeatDevice }): ReactElement {
    const { deviceData } = props;
    const { data } = getArchives(String(deviceData?.id));
    const { refetch } = getFiles(deviceData?.id);
    const [selectedSystem, setSelectedSystem] = useState<number>(
        deviceData?.systems[0]?.id ?? 0
    );
    const [archType, setArchType] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const downloadPDF = async () => {
        const temp = {
            archive_type: archType,
            start_date: startDate,
            system_id: selectedSystem,
            end_date: endDate,
            device_id: deviceData.id,
        };
        const pre_response = await $api.post<{ filename: string }>(
            `heat_reports/create/${deviceData.id}`,
            temp
        );
        if (pre_response == undefined) {
            alert("Ошибка формирования архива");
            return;
        }
        fetch(`${API_URL}heat_reports/create/${deviceData.id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        }).then(
            (response) => {
                response.blob().then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = pre_response.data.filename;
                    a.click();
                    a.remove();
                });
            },
            (rej) => alert("Не удалось скачать архив!")
        );
        refetch();
    };
    return (
        <VFlexBox height="85%" className={cls.SimpleReport}>
            <VFlexBox className={cls.content} alignItems="center" gap="7px">
                <p className={cls.blockTitle}>ФОРМИРОВАНИЕ АРХИВОВ</p>
                <VFlexBox
                    className={classNames(cls.row, {}, [cls.first_row])}
                    gap="5px"
                    height={"15%"}
                    width="90%"
                >
                    <p>прибор учета:</p>
                    <AppInput
                        width={"80%"}
                        disabled
                        theme={InputThemes.CLEAR}
                        className={cls.input}
                        value={`${deviceData?.device_type_verbose_name} №${deviceData?.device_num}`}
                    />
                </VFlexBox>
                <HFlexBox align="space-around" height="40%">
                    {data && (
                        <ArchTypeBlock
                            archData={data}
                            currentArchtype={archType}
                            currentSystem={selectedSystem}
                            onChangeArchtype={setArchType}
                        />
                    )}
                    {data && (
                        <SystemsBlock
                            archData={data}
                            currentArchtype={archType}
                            currentSystem={selectedSystem}
                            deviceData={deviceData}
                            sdate={startDate}
                            edate={endDate}
                            setEdate={setEndDate}
                            setSdate={setStartDate}
                            onChangeSystem={setSelectedSystem}
                        />
                    )}
                </HFlexBox>
                <AppButon
                    className={classNames(cls.pollBtn, {}, [])}
                    onClick={() => downloadPDF()}
                    theme={AppButtonTheme.SHADOW}
                >
                    сформировать архив
                </AppButon>
            </VFlexBox>
        </VFlexBox>
    );
}

export { SimpleReport };
