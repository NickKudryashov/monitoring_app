import { memo, useCallback, useEffect, useMemo, useState } from "react";
import cls from "./HeatArchives.module.scss";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import classNames from "shared/lib/classNames/classNames";
import { fetchArchData, request_archives, request_system_date } from "../model/services/fetchHeatArchives/fetchHeatArchives";
import $api, { API_URL } from "shared/api";
import { selectHeatDeviceById } from "entities/Heatcounters";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { HeatArchivesRecord } from "../model/types/heatArchives";
import { heatArchivesActions } from "../model/slice/heatArchives";
import { Modal } from "shared/ui/Modal/Modal";

export interface HeatArchivesProps {
 className?: string;
 dev_id:number;
 is_open:boolean;
 onClose:()=>void;
}

interface SystemData<T> {
    [Key: number]: T;
}

interface SystemDataRecord {
    name?:string;
    schema?:string;
    id?:number;
    startRecordDate?:string;
    endRecordDate?:string;
    count?:number;
}
export const HeatArchives = memo((props:HeatArchivesProps) => {
    const { className,dev_id,is_open,onClose } = props;
    const [archType,setArchType] = useState("1");
    const [formArchType,setFormArchType] = useState("1");
    const [systemId,setSystemId] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const dispatch = useAppDispatch();
    const {data} = useSelector((state:StateSchema)=>state.archives);
    const [startDateReport,setStartDatReport] = useState("");
    const [endDateReport,setEndDateReport] = useState("");
    const {entities}  = useSelector((state:StateSchema)=>state.heatDevices);
    const dev = entities[dev_id];
    const systems = dev.systems.map(system=>(system.id));
    const [systemArray,setSystemArray] = useState([]);
    const prepareDate = ()=>{   
        const testObj = {
            device_id:Number(dev_id),
            start_date:startDate,
            archive_type:Number(archType),
            end_date:endDate
        };
        const response = request_archives(testObj);
    };

    useEffect(()=>{
        dispatch(heatArchivesActions.clearState());
        systems.map((sys)=>dispatch(fetchArchData(sys)));
    },[dispatch,dev_id]);

    const downloadPDF = async () => {
        const temp = {
            archive_type:Number(formArchType),
            start_date:startDateReport,
            system_id:Number(systemId),
            end_date:endDateReport,
        };
        const response = await $api.post(`heat_reports/create/${dev_id}`,temp);
        if (response==undefined) {
            alert("Ошибка формирования архива");
            return;
        }
        fetch(`${API_URL}heat_reports/create/${dev_id}`,{method:"PUT",headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")}}).then(
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
        <Modal isOpen={is_open} onClose={onClose} >
            <div className={classNames(cls.heatArchives, {}, [className])}>
                <div className={cls.pollBlock}>
                    <input value={startDate} onChange={(e)=>setStartDate(e.target.value)} type="date" placeholder="Дата начала:"/>
                    <input value={endDate} onChange={(e)=>setEndDate(e.target.value)} type="date" placeholder="Дата конца:"/>
                    <select value={archType} onChange={(e)=>setArchType(e.target.value)}>
                        <option value="0">Часовые архивы</option>
                        <option value="1">Суточные архивы</option>
                        <option value="2">Месячные архивы</option>
                    </select>
                    <AppButon theme={AppButtonTheme.SHADOW} onClick={prepareDate}>Снять архив</AppButon>
                </div>
                <div className={cls.reportBlock}>
                    <div className={cls.formData}> 
                        <input value={startDateReport} onChange={(e)=>setStartDatReport(e.target.value)} type="date" placeholder="Дата начала:"/>
                        <input value={endDateReport} onChange={(e)=>setEndDateReport(e.target.value)} type="date" placeholder="Дата конца:"/>
                        <AppButon theme={AppButtonTheme.SHADOW} onClick={downloadPDF}>Сформировать архив</AppButon>

                    </div>
                    <div>
                        <select value={formArchType} onChange={(e)=>setFormArchType(e.target.value)}>
                            <option value="0">Часовые архивы</option>
                            <option value="1">Суточные архивы</option>
                            <option value="2">Месячные архивы</option>
                        </select>
                        <div  className={cls.infoBlock}>
                            {Object?.values(data ?? [])?.map((sys:HeatArchivesRecord)=>
                                <div className={cls.recordInfo} key={sys.id}>
                                    <div className={cls.sysRow}>
                                        <div className={cls.inf}>
                                            <input  type='radio' value={String(sys.id)} onChange={(e)=>setSystemId(e.target.value)} id={String(sys.id)} name="systems" placeholder={sys.name} />
                                            <label  htmlFor={sys.name}>{sys.name+" "+sys.schema}</label>
                                        </div>
                                        <p className={cls.inf}>{" "+sys.start_date+" "}</p>
                                        <p className={cls.inf}>{" "+sys.end_date+" "}</p>
                                        <p className={cls.inf}>{" "+sys.count}</p>
                                    </div>
                                </div>
                            )}
                        </div>   
                    </div>
                </div>
            </div>
        </Modal>
    );
});
