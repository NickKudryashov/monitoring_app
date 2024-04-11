import { ReactElement } from "react";
import cls from "./ReportFilesView.module.scss";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HeatDevice } from "entities/Heatcounters";
import { ArchivesRecord, getFiles } from "pages/HeatSubcategoryPage/api/api";
import { GeneralAnswer } from "features/PageHeader/api/api";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { API_URL } from "shared/api";
function ReportFilesView(props:{deviceData:HeatDevice,archData:ArchivesRecord,generalData:GeneralAnswer}):ReactElement {
    const {deviceData,archData,generalData} = props;
    const {data:files} = getFiles(deviceData?.id);
    console.log(files);
    const downloadPdf = async (filename:string,report_id:number)=>{
        console.log("запрос");
        fetch(`${API_URL}heat_reports/file/${report_id}`,{method:"GET",headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")}}).then(
            response => {
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = filename;
                    a.click();
                    a.remove();
                });
            },rej=>alert("Не удалось скачать архив!"));
    };
    
    return (
        <HFlexBox height="88%" className={cls.ReportFilesView} align="space-around" alignItems="center">
            <VFlexBox width="48%" className={cls.reportGroup}>
                <p className={cls.blockTitle}>МЕСЯЧНЫЕ ОТЧЕТНЫЕ ВЕДОМОСТИ</p>
                {files?.map((el)=> el.autocreated && 
                    <VFlexBox align="center" alignItems="center" className={cls.reportBox} onClick={()=>downloadPdf(el.verbose_filename+".pdf",el.id)} height="10%" width="95%" key={el.id}>
                        <p>{el.verbose_filename}</p>
                        <p>{`${el.start_date}-${el.end_date}`}</p>
                    </VFlexBox>
                )}
            </VFlexBox>
            <VFlexBox width="48%" className={cls.reportGroup}>
                <p className={cls.blockTitle}>ОТЧЕТЫ РУЧНОГО ФОРМИРОВАНИЯ</p>
                {files?.map((el)=> !el.autocreated && 
                    <VFlexBox align="center" alignItems="center" className={cls.reportBox}  onClick={()=>downloadPdf(el.verbose_filename+".pdf",el.id)} height="10%" width="95%" key={el.id}>
                        <p>{el.verbose_filename}</p>
                        <p>{`${el.start_date}-${el.end_date}`}</p>
                    </VFlexBox>
                )}
            </VFlexBox>
        </HFlexBox>
    );
}

export {ReportFilesView};