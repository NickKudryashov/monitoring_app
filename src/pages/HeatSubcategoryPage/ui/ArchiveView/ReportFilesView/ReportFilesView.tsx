import { ReactElement } from "react";
import cls from "./ReportFilesView.module.scss";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HeatDevice } from "@/entities/Heatcounters";
import { ArchivesRecord, deleteFile, getFiles } from "@/pages/HeatSubcategoryPage/api/api";
import { GeneralAnswer } from "@/features/PageHeader/api/api";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { API_URL } from "@/shared/api";
import DelIcon from "@/shared/assets/icons/SubcatDeleteIcon.svg";
function ReportFilesView(props:{deviceData:HeatDevice,archData:ArchivesRecord,generalData:GeneralAnswer}):ReactElement {
    const {deviceData,archData,generalData} = props;
    const {data:files,refetch:refetchFiles} = getFiles(deviceData?.id);
    const [removeFile] = deleteFile();
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
    
    const deleteFileHandler = (id:number)=>{
        removeFile({id:id});
        refetchFiles();
    };

    return (
        <HFlexBox height="88%" className={cls.ReportFilesView} align="space-around" alignItems="center">
            <VFlexBox width="48%" gap="10px" className={cls.reportGroup}>
                <p className={cls.blockTitle}>МЕСЯЧНЫЕ ОТЧЕТНЫЕ ВЕДОМОСТИ</p>
                {deviceData?.systems.map((sel)=>
                    <VFlexBox gap="10px" key={sel.id} height="20%" className={cls.systemBox}>
                        <p style={{"textAlign":"center"}}>{sel.name}</p>
                        {files?.map((el)=> el.autocreated && el.system_id===sel.id &&
                        <VFlexBox align="center" alignItems="center" className={cls.reportBox} onClick={()=>downloadPdf(el.verbose_filename+".pdf",el.id)} height="20%" width="45%" key={el.id}>
                            <p>{`${el.start_date}-${el.end_date}`}</p>
                            <DelIcon onClick={(e)=>{e.stopPropagation();deleteFileHandler(el.id);}}/>
                        </VFlexBox>
                        )}
                    </VFlexBox>
                )}
                
            </VFlexBox>
            <VFlexBox gap="10px" width="48%" className={cls.reportGroup}>
                <p className={cls.blockTitle}>ОТЧЕТЫ РУЧНОГО ФОРМИРОВАНИЯ</p>
                {deviceData?.systems.map((el)=>
                    <VFlexBox key={el.id} height="20%" className={cls.systemBox}>
                        <p style={{"textAlign":"center"}}>{el.name}</p>
                        {files?.map((fel)=> !fel.autocreated && fel.system_id===el.id &&
                        <HFlexBox align="center" alignItems="center" className={cls.reportBox} onClick={()=>downloadPdf(fel.verbose_filename+".pdf",fel.id)} height="20%" width="45%" key={fel.id}>
                            <p>{`${fel.start_date}-${fel.end_date}`}</p>
                            <DelIcon onClick={(e)=>{e.stopPropagation();deleteFileHandler(fel.id);}}/>
                        </HFlexBox>                    
                        )}
                    </VFlexBox>
                )}
            </VFlexBox>
        </HFlexBox>
    );
}

export {ReportFilesView};