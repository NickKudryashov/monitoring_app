import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./ElectroStatistic.module.scss";

import type { PropsWithChildren } from "react";
import { timeConvert } from "shared/lib/helpers/datetimeConvert";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";

interface ElectroStatisticProps {
    className?: string;
    last_poll_seconds:number;
    last_update:string;
    autoPollMode:boolean;
    pollInterval:number;
    id:number;
    setAutoPollmode:(a:boolean)=>void;
    setPollInterval:(a:number)=>void;
    onEdit:()=>void;
}

export const ElectroStatistic = memo((props: PropsWithChildren<ElectroStatisticProps>) => {
    const { className,last_poll_seconds,last_update,autoPollMode,pollInterval,onEdit,setAutoPollmode,setPollInterval,id } = props;
    
    return (
        <div className={cls.titleBlock}>
            {`Дата последнего опроса ${timeConvert(last_update)}`}
            {last_poll_seconds!==undefined && <br/>}
            {last_poll_seconds!==undefined && `Длительность предыдущего опроса: ${Math.round(last_poll_seconds / 60)} минут`}
            <div className={cls.autoFlagBox}>
                <input  type='checkbox' checked={autoPollMode} onClick={()=>setAutoPollmode(!autoPollMode)} id={"device_autopoll"} />
                <label  htmlFor={"electro_device_autopoll_"+id}>Включить автоопрос</label>
            </div>
            <p>Интвервал автоопроса в минутах:</p>
            <input value={String(pollInterval)} onChange={(e)=>setPollInterval(Number(e.target.value))} />
            <AppButon theme={AppButtonTheme.SHADOW} onClick={onEdit}>Применить изменения</AppButon>
        </div>
    );
});
