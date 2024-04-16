import { ReactElement, useState } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./PollBlock.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import classNames from "shared/lib/classNames/classNames";
import { HeatDevice } from "entities/Heatcounters";
import { request_archives } from "features/HeatArchives";
import { ToggleButton } from "shared/ui/ToggleButton/ToggleButton";
import OpenIcon from "shared/assets/icons/ArrowIcon.svg";
const archs = [0,1,2];
const verbmapper:Record<number,string>= { 0:"часовой",1:"суточный",2:"месячный"};
function PollBlock(props:{deviceData:HeatDevice}):ReactElement {
    const {deviceData} = props;
    const [archType,setArchType] = useState(1);
    const [recCount,setRecCount] = useState(1);
    const [rewrite,setRewrite] = useState(false);
    const [mock,setMock] = useState(false);
    const [allSettingsMode,setAllSettingsMode] = useState(false);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    return(
        <VFlexBox height="85%" className={cls.PollBlock}>
            <VFlexBox className={cls.content} alignItems="center" gap="7px">
                <p className={cls.blockTitle}>СНЯТИЕ АРХИВОВ</p>
                <VFlexBox className={classNames(cls.row,{},[cls.first_row])} gap="5px" height={"15%"} width="90%">
                    <p>прибор учета:</p>
                    <AppInput width={"80%"} disabled theme={InputThemes.CLEAR} className={cls.input} value={`${deviceData?.device_type_verbose_name} №${deviceData?.device_num}`} />
                </VFlexBox>
                <HFlexBox align="space-around" height={"3%"}>
                    <p style={{"width":"45%"}}>тип архива:</p>
                    <p style={{"width":"45%"}}>выбор даты:</p>
                </HFlexBox>
                <HFlexBox align="space-around" height="20%">
                    <VFlexBox width="20%" >
                        {
                            archs.map((el)=>
                                <HFlexBox key={el} alignItems="center" className={cls.row} gap="5px" height={"30%"} width="95%">
                                    <AppInput type='radio' checked={el===archType} onClick={()=>setArchType(el)}/>
                                    <HFlexBox className={cls.archtypeBox} height="50%" width="90%" align="center" alignItems="center">
                                        {verbmapper[el]}
                                    </HFlexBox>
                                </HFlexBox>
                            )
                        }
                    </VFlexBox>
                    <HFlexBox width="45%" alignItems="center">
                        <p style={{"width":"10%"}}>с</p>
                        <AppInput type={"date"} theme={InputThemes.DESIGNED_PRIMARY} className={cls.inputDate} onChange={(e)=>setStartDate(e.target.value)} value={startDate} />
                        <p style={{"width":"10%"}}>по</p>
                        <AppInput type={"date"} theme={InputThemes.DESIGNED_PRIMARY} className={cls.inputDate} onChange={(e)=>setEndDate(e.target.value)} value={endDate} />

                    </HFlexBox>
                </HFlexBox>
                <HFlexBox alignItems="center" width="95%" height="5%" onClick={()=>setRewrite(true)}>
                    <AppInput type='radio'   checked={rewrite}/>
                    <p>Перезаписывать архив</p>
                </HFlexBox>
                <HFlexBox alignItems="center" width="95%" height="5%" onClick={()=>setRewrite(false)}>
                    <AppInput type='radio'   checked={!rewrite}/>
                    <p>Дозаписывать архив</p>
                </HFlexBox>
                <VFlexBox height="45%" gap="3px" width={"85%"} >
                    <HFlexBox onClick={()=>setAllSettingsMode((prev)=>!prev)} align="space-between" alignItems="center" className={classNames(cls.input,{},[cls.settingInput])}>
                        <p >Расширенные настройки: </p>
                        <OpenIcon/>
                    </HFlexBox>
                    {allSettingsMode && 
                    <VFlexBox className={cls.moreInfoPlate} height="80%" width="95%">
                        <HFlexBox gap="3px" alignItems="center" width="95%" height="23%" onClick={()=>setMock(true)}>
                            <AppInput type='checkbox'   checked={mock}/>
                            <p>Считать все доступные записи</p>
                        </HFlexBox>
                        <HFlexBox gap="3px" alignItems="center" width="95%" height="23%" onClick={()=>setMock(true)}>
                            <AppInput type='checkbox'   checked={mock}/>
                            <p>Считать записи до заданной даты</p>
                        </HFlexBox>
                        <HFlexBox gap="3px" alignItems="center" width="95%" height="23%" onClick={()=>setMock(true)}>
                            <AppInput type='checkbox'   checked={mock}/>
                            <p>Включить пропуск прибора при отсутствии ответа</p>
                        </HFlexBox>
                        <HFlexBox gap="3px" alignItems="center" width="95%" height="23%">
                            <AppInput width={"10%"} type='number' value={recCount} onChange={(e)=>setRecCount(Number(e.target.value))} />
                            <p>Кол-во записей для пропуска</p>
                        </HFlexBox>
                    </VFlexBox>
                    }
                </VFlexBox>
                <AppButon
                    className={classNames(cls.pollBtn,{},[])}
                    onClick={()=>request_archives({archive_type:archType,device_id:deviceData.id,start_date:startDate,end_date:endDate,rewrite})}
                    theme={AppButtonTheme.SHADOW}
                >снять архив</AppButon>
            </VFlexBox>
        </VFlexBox>
    );
}


export {PollBlock};