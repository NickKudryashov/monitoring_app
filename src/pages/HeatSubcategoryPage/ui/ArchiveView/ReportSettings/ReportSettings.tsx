import { ReactElement, useState } from "react";
import cls from "./ReportSettings.module.scss";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { Colontitul } from "../Colontitul/Colontitul";
import { HeatDevice } from "entities/Heatcounters";
import { ArchivesRecord, createPeriod, createUpCol, editColsToData, editParamToSchema, getDownCols, getParameters, getPeriods, getUpCols } from "pages/HeatSubcategoryPage/api/api";
import { GeneralAnswer } from "features/PageHeader/api/api";
import { ReportParameters } from "../ReportParameters/ReportParameters";
function ReportSettings(props:{deviceData:HeatDevice,archData:ArchivesRecord,generalData:GeneralAnswer}):ReactElement {
    const {deviceData,archData,generalData} = props;
    const [selectedSystem,setSelectedSystem] = useState<number>(deviceData?.systems[0]?.id ?? 0);
    const {data:upCols} = getUpCols(selectedSystem);
    const {data:downCols} = getDownCols(selectedSystem);
    const {data:parameters} = getParameters(selectedSystem);
    const {data:periods,isLoading:periodsLoading} = getPeriods(selectedSystem);
    const [createperiod] = createPeriod();
    console.log("periods: ",periods);
    const [updateParamBySchema,] = editParamToSchema();
    const [updateColsByDate] = editColsToData();
    const [createup,] = createUpCol();
    const [selectedArchtype, setSelectedArchtype] = useState<number>(1);
    const [sdate,setSdate] = useState("");
    const [edate,setEdate] = useState("");

    const newPeriodHandler = ()=>{
        const sday = Number(sdate.split("-")[2]);
        const eday = Number(edate.split("-")[2]);

        console.log(sdate);
        createperiod({archive_type:selectedArchtype,device_id:deviceData.id,system_sub_id:selectedSystem,end_day:eday,start_day:sday});
    };

    return (
        <VFlexBox height="88%" className={cls.ReportSettings} align="space-around" alignItems="center">
            <p className={cls.blockTitle}>НАСТРОЙКА ФОРМИРОВАНИЯ АРХИВОВ</p>
            <HFlexBox height="5%" width="95%" align="space-around">
                <AppButon className={cls.btn} width="40%" height="100%" theme={AppButtonTheme.SHADOW} onClick={()=>updateParamBySchema({id:selectedSystem})}>Выставить параметры под схему</AppButon>
                <AppButon className={cls.btn} width="40%" height="100%" theme={AppButtonTheme.SHADOW} onClick={()=>updateColsByDate({id:selectedSystem})}>Загрузить колонтитулы по умолчанию</AppButon>
            </HFlexBox>
            <HFlexBox align="center" alignItems="center" width="95%" height="8%" className={cls.borderBox}>
                <p style={{"width":"20%"}}>выбор тепловой системы:</p>
                {
                    deviceData?.systems.map((el)=>
                        <HFlexBox alignItems="center" key={el.id} width="20%" onClick={()=>setSelectedSystem(el.id)}>
                            <AppInput type='radio' checked={el.id===selectedSystem}/>
                            <p>{`ТС${el.index+1} ${el.schema}`}</p>
                        </HFlexBox>
                    )
                }
            </HFlexBox>
            <HFlexBox gap="10px" alignItems="center" width="95%" height="10%" className={cls.borderBox}>
                <p>Отчетный период:</p>
                <HFlexBox alignItems="center" gap="5px" width="30%" height="50%">
                    <p>с</p>
                    <AppInput type='date' value={sdate} onChange={(e)=>setSdate(e.target.value)} className={cls.input}/>

                </HFlexBox>
                <HFlexBox alignItems="center" gap="5px" width="30%" height="50%">
                    <p>по</p>
                    <AppInput type='date' value={edate} onChange={(e)=>setEdate(e.target.value)} className={cls.input}/>

                </HFlexBox>
                <AppButon onClick={newPeriodHandler} className={cls.btn}>Добавить</AppButon>
            </HFlexBox>
            <HFlexBox align="space-around" width="95%" height="25%" className={cls.borderBox}>
                <VFlexBox width="20%">
                    <HFlexBox gap="5px" alignItems="center" onClick={()=>setSelectedArchtype(0)}>
                        <AppInput checked={selectedArchtype===0} type='radio'/>
                        <p>часовые</p>
                    </HFlexBox>
                    <HFlexBox gap="5px" alignItems="center" onClick={()=>setSelectedArchtype(1)}>
                        <AppInput checked={selectedArchtype===1} type='radio'/>
                        <p>суточные</p>
                    </HFlexBox>
                    <HFlexBox gap="5px" alignItems="center" onClick={()=>setSelectedArchtype(2)}>
                        <AppInput checked={selectedArchtype===2} type='radio'/>
                        <p>месячные</p>
                    </HFlexBox>
                </VFlexBox>
                <HFlexBox width="75%" gap="10px" height="95%" className={cls.periodBox}>
                    {
                        !periodsLoading && periods[selectedArchtype]?.map((el)=>
                            <HFlexBox height={"15%"} alignItems="center" align="space-around" width="20%" key={el.id} className={cls.periodCard}>
                                <p>{`с ${el.start_day}`}</p>
                                <p> {`по ${el.end_day}`}</p>
                            </HFlexBox>
                        )
                    }
                </HFlexBox>
            </HFlexBox>
            <HFlexBox align="space-around" height="25%" width="95%" className={cls.borderBox} >
                <VFlexBox width="45%">
                    <p className={cls.hints}>верхние колонтитулы</p>
                    <Colontitul create={()=>createup({name:"Новый:",value:"новый",enabled:false,id:selectedSystem})} up cols={upCols}/>
                </VFlexBox>
                <VFlexBox width="45%">
                    <p className={cls.hints}>нижние колонтитулы</p>
                    <Colontitul up={false} cols={downCols}/>

                </VFlexBox>
            </HFlexBox>
            <ReportParameters parameters={parameters}/>
        </VFlexBox>
    );
}

export {ReportSettings};