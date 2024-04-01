import { ReactElement, useState } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./PollBlock.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import classNames from "shared/lib/classNames/classNames";
import { HeatDevice } from "entities/Heatcounters";
import { request_archives } from "features/HeatArchives";
function PollBlock(props:{deviceData:HeatDevice}):ReactElement {
    const {deviceData} = props;
    const [archType,setArchType] = useState(1);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    return(
        <VFlexBox className={cls.PollBlock} >
            <VFlexBox className={cls.content} alignItems="center" gap="7px">
                <p className={cls.blockTitle}>ОСНОВНЫЕ НАСТРОЙКИ СНЯТИЯ АРХИВОВ</p>
                <HFlexBox alignItems="center" className={classNames(cls.row,{},[cls.first_row])} gap="5px" height={"12%"} width="95%">
                    <p>прибор учета:</p>
                    <AppInput disabled theme={InputThemes.CLEAR} className={cls.input} value={`${deviceData?.device_type_verbose_name} №${deviceData?.device_num}`} />
                </HFlexBox>
                <HFlexBox alignItems="center" className={cls.row} gap="5px" height={"12%"} width="95%">
                    <p>выбор даты: </p>
                    <p>с</p>
                    <AppInput type={"date"} theme={InputThemes.DESIGNED_PRIMARY} className={cls.inputDate} onChange={(e)=>setStartDate(e.target.value)} value={startDate} />
                    <p>по</p>
                    <AppInput type={"date"} theme={InputThemes.DESIGNED_PRIMARY} className={cls.inputDate} onChange={(e)=>setEndDate(e.target.value)} value={endDate} />
                </HFlexBox>
                <HFlexBox alignItems="center" className={cls.row} gap="5px" height={"12%"} width="95%">
                    <p>тип архива:</p>
                    <AppButon theme={AppButtonTheme.SHADOW} onClick={()=>setArchType(0)} className={classNames(cls.btn,{[cls.btn_selected]:archType===0},[])} >Часовые</AppButon>
                    <AppButon theme={AppButtonTheme.SHADOW} onClick={()=>setArchType(1)} className={classNames(cls.btn,{[cls.btn_selected]:archType===1},[])} >Суточные</AppButon>
                    <AppButon theme={AppButtonTheme.SHADOW} onClick={()=>setArchType(2)} className={classNames(cls.btn,{[cls.btn_selected]:archType===2},[])} >Месячные</AppButon>
                </HFlexBox>
                {/* <HFlexBox className={cls.row} gap="5px" height={"12%"} width="90%" alignItems="center">
                    <AppInput className={cls.radio} type="radio"/>
                    <p>дозаписать архив</p>
                    <AppInput className={cls.radio} type="radio"/>
                    <p>перезаписать архив</p>
                </HFlexBox> */}
                {/* <VFlexBox className={cls.row} gap="5px" height={"17%"} width="90%">
                    <HFlexBox gap="5px" height="40%" alignItems="center">
                        <AppInput className={cls.radio} type="radio"/>
                        <p>считать все доступные записи</p>
                    </HFlexBox>
                    <HFlexBox gap="5px" height="40%" alignItems="center">
                        <AppInput className={cls.radio} type="radio"/>
                        <p>считать все записи до заданной даты</p>
                    </HFlexBox>
                </VFlexBox> */}
                {/* <HFlexBox className={cls.row} gap="5px" height={"12%"} width="90%" alignItems="center">
                    <AppInput className={cls.radio} type="checkbox"/>
                    <p>включить прерывание снятия при отсутствии ответа</p>
                </HFlexBox>
                <HFlexBox className={cls.row} gap="5px" height={"12%"} width="90%" alignItems="center">
                    <AppInput className={classNames(cls.inputDate,{},[cls.counter])} type="number" value={"5"}  />
                    <p className={cls.counterLabel}>кол-во записей для пропуска</p>
                </HFlexBox> */}
                <AppButon
                    className={classNames(cls.pollBtn,{},[])}
                    onClick={()=>request_archives({archive_type:archType,device_id:deviceData.id,start_date:startDate,end_date:endDate})}
                    theme={AppButtonTheme.SHADOW}
                >снять архив</AppButon>
            </VFlexBox>
        </VFlexBox>
    );
}


export {PollBlock};