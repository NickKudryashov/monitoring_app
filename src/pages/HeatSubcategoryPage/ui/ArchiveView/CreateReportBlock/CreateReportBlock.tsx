import { ReactElement, useState } from "react";
import cls from "./CreateReportBlock.module.scss";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import classNames from "shared/lib/classNames/classNames";
import { ArchTypeBlock } from "../ArchTypeBlock/ArchTypeBlock";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { SystemsBlock } from "../SystemsBlock/SystemsBlock";
import { Colontitul } from "../Colontitul/Colontitul";
import { HeatDevice } from "entities/Heatcounters";
import { ArchivesRecord, SystemArchivesInfo } from "pages/HeatSubcategoryPage/api/api";
import $api, { API_URL } from "shared/api";
function CreateReportBlock(props:{deviceData:HeatDevice,archData:ArchivesRecord}):ReactElement {
    const {deviceData,archData} = props;
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
        <VFlexBox className={cls.CreateReportBlock}>
            <p>ФОРМИРОВАНИЕ:</p>
            <VFlexBox align="flex-start" gap="5px"   height="30%" className={cls.infoBlock}>
                <HFlexBox alignItems="center" gap="15px"  align="space-between" height="50%">
                    <HFlexBox gap="5px" width="35%">
                        <p>прибор:</p>
                        <AppInput disabled theme={InputThemes.DESIGNED_PRIMARY} className={cls.input} />
                    </HFlexBox>
                    <HFlexBox width="60%" className={cls.longInput}>
                        <p className={cls.infoTitle}>абонент:</p>
                        <AppInput disabled theme={InputThemes.DESIGNED_PRIMARY} className={classNames(cls.input,{},[])} />
                    </HFlexBox>
                    
                </HFlexBox>
                <HFlexBox gap="15px"  align="space-between" height="60%">
                    <HFlexBox gap="5px" width="35%">
                        <p>считан:</p>
                        <AppInput disabled theme={InputThemes.DESIGNED_PRIMARY} className={cls.input} />
                    </HFlexBox>
                    <HFlexBox width="60%" className={cls.longInput}>
                        <p>адрес:</p>
                        <AppInput disabled theme={InputThemes.DESIGNED_PRIMARY} className={classNames(cls.input,{},[])} />
                    </HFlexBox>
                </HFlexBox>
            </VFlexBox>
            <HFlexBox align="space-around" width="90%" height="50%">
                <ArchTypeBlock currentArchtype={selectedAtchtype} onChangeArchtype={(id:number)=>setSelectedArchtype(id)} currentSystem={selectedSystem} archData={archData} />
                <SystemsBlock sdate={sdate} edate={edate} setSdate={setSdate} setEdate={setEdate} currentArchtype={selectedAtchtype} currentSystem={selectedSystem} onChangeSystem={(id:number)=>setSelectedSystem(id)} deviceData={deviceData} archData={archData} />
            </HFlexBox>
            <HFlexBox className={cls.btns} height="30%" width="90%" alignItems="center" align="center">
                <VFlexBox align="space-between">
                    <AppButon onClick={downloadPDF} className={classNames(cls.pollBtn,{},[])}>Сформировать</AppButon>
                    <AppButon className={classNames(cls.pollBtn,{},[])}>Импорт с УС-2</AppButon>
                </VFlexBox>
                <VFlexBox align="space-between">
                    <AppButon className={classNames(cls.pollBtn,{},[])}>Экспорт файла</AppButon>
                    <AppButon className={classNames(cls.pollBtn,{},[])}>Открыть файл OPC</AppButon>
                </VFlexBox>
            </HFlexBox>

        </VFlexBox>
    );
}

export {CreateReportBlock};