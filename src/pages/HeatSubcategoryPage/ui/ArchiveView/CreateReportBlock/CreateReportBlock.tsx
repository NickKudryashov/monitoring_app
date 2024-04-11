import { ReactElement, useState } from "react";
import cls from "./CreateReportBlock.module.scss";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import classNames from "shared/lib/classNames/classNames";
import { ArchTypeBlock } from "../ArchTypeBlock/ArchTypeBlock";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { SystemsBlock } from "../SystemsBlock/SystemsBlock";
import { HeatDevice } from "entities/Heatcounters";
import { ArchivesRecord } from "pages/HeatSubcategoryPage/api/api";
import $api, { API_URL } from "shared/api";
import { GeneralAnswer } from "features/PageHeader/api/api";
function CreateReportBlock(props:{deviceData:HeatDevice,archData:ArchivesRecord,generalData:GeneralAnswer}):ReactElement {
    const {deviceData,archData,generalData} = props;
    const [selectedSystem,setSelectedSystem] = useState<number>(deviceData?.systems[0]?.id ?? 0);
    const [selectedAtchtype, setSelectedArchtype] = useState<number>(1);
    const [sdate,setSdate] = useState("");
    const [edate,setEdate] = useState("");
    console.log("arch data: ",archData);
    const downloadPDF = async () => {
        const temp = {
            archive_type:selectedAtchtype,
            start_date:sdate,
            system_id:selectedSystem,
            end_date:edate,
            device_id:deviceData.id
        };
        const response = await $api.post(`heat_reports/create/${deviceData.id}`,temp);
        if (response==undefined) {
            alert("Ошибка формирования архива");
            return;
        }
        fetch(`${API_URL}heat_reports/create/${deviceData.id}`,{method:"PUT",headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")}}).then(
            response => {
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${"test"}_отчет.pdf`;
                    a.click();
                    a.remove();
                });
            },rej=>alert("Не удалось скачать архив!"));
    };
    return (
        <VFlexBox align="space-between" className={cls.CreateReportBlock}>
            <p className={cls.blockTitle}>ФОРМИРОВАНИЕ</p>
            <VFlexBox align="flex-start" gap="5px"   height="20%" className={cls.infoBlock}>
                <HFlexBox alignItems="center" gap="15px"  align="space-between" height="50%">
                    <HFlexBox alignItems="center" gap="5px" width="38%">
                        <p className={cls.infoBlockTitle}>прибор:</p>
                        <AppInput disabled value={`${deviceData?.device_type_verbose_name} №${deviceData?.device_num}`} theme={InputThemes.CLEAR} className={cls.input} />
                    </HFlexBox>
                    <HFlexBox alignItems="center" width="60%" >
                        <p className={cls.infoBlockTitle}>абонент:</p>
                        <AppInput disabled value={generalData?.abonent} theme={InputThemes.CLEAR} className={classNames(cls.input,{},[cls.longInput])} />
                    </HFlexBox>
                    
                </HFlexBox>
                <HFlexBox gap="15px"  align="space-between" height="50%">
                    <HFlexBox alignItems="center" gap="5px" width="38%">
                        <p className={cls.infoBlockTitle}>считан:</p>
                        <AppInput disabled value={""} theme={InputThemes.CLEAR} className={cls.input} />
                    </HFlexBox>
                    <HFlexBox alignItems="center" width="60%" >
                        <p className={cls.infoBlockTitle}>адрес:</p>
                        <AppInput disabled value={generalData?.adress} theme={InputThemes.CLEAR} className={classNames(cls.input,{},[cls.longInput])} />
                    </HFlexBox>
                </HFlexBox>
            </VFlexBox>
            <HFlexBox align="space-around" height="50%">
                <ArchTypeBlock currentArchtype={selectedAtchtype} onChangeArchtype={(id:number)=>setSelectedArchtype(id)} currentSystem={selectedSystem} archData={archData} />
                <SystemsBlock sdate={sdate} edate={edate} setSdate={setSdate} setEdate={setEdate} currentArchtype={selectedAtchtype} currentSystem={selectedSystem} onChangeSystem={(id:number)=>setSelectedSystem(id)} deviceData={deviceData} archData={archData} />
            </HFlexBox>
            <HFlexBox className={cls.btns} height="20%" width="90%" alignItems="center" align="center">
                <VFlexBox align="center" alignItems="center">
                    <AppButon theme={AppButtonTheme.SHADOW} onClick={downloadPDF} className={classNames(cls.pollBtn,{},[])}>сформировать</AppButon>
                    {/* <AppButon className={classNames(cls.pollBtn,{},[])}>Импорт с УС-2</AppButon> */}
                </VFlexBox>
                {/* <VFlexBox align="space-between">
                    <AppButon className={classNames(cls.pollBtn,{},[])}>Экспорт файла</AppButon>
                    <AppButon className={classNames(cls.pollBtn,{},[])}>Открыть файл OPC</AppButon>
                </VFlexBox> */}
            </HFlexBox>

        </VFlexBox>
    );
}

export {CreateReportBlock};