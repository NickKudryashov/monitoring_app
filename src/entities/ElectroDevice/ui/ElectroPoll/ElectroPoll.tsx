import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect, useRef, useState } from "react";
import cls from "./ElectroPoll.module.scss";

import type { PropsWithChildren } from "react";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { ManualPoll } from "./Service/Polling";

interface ElectroPollProps {
 className?: string;
 onUpdate:()=>void;
 id:number;
 autopoll:boolean;
 isBusy:boolean;

}

export const ElectroPoll = memo((props: PropsWithChildren<ElectroPollProps>) => {
    const { className,id,onUpdate,autopoll,isBusy } = props;
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const loop_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>(isBusy);
    const [loading,setIsLoading] = useState(pollFlag.current);

    useEffect(()=>{
        poll();
        loop_ref.current = setInterval(poll,60000);
        return ()=>{
            pollFlag.current = false;
            if (timer_ref.current) {
                clearInterval(timer_ref.current);
                timer_ref.current = null;
            }
            if (loop_ref.current) {
                clearInterval(loop_ref.current);
                loop_ref.current = null;
            }
        };
    },[id]);


    const poll = async () => {
        if (timer_ref.current) {
            console.log("выход из полл так как есть таймер реф");
            return;
        }
        const response = await ManualPoll.pollDevice(id);
        const task_id = response?.data?.task_id ?? undefined;
        if (!task_id) {
            return;
        }
        setIsLoading(true);
        pollFlag.current = true;
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(id,task_id);
            if (response.data.result!==null) {
                clearInterval(timer_ref.current);
                timer_ref.current=null;
                console.log("очистили таймер реф каррент",timer_ref.current);
                setIsLoading(false);
                pollFlag.current = false;
                onUpdate();
            }
        },2000);
    };

    return (
        <div className={cls.container}>
            {!autopoll && <AppButon theme={AppButtonTheme.SHADOW} onClick={poll} disabled={loading} className={classNames(cls.electroDevicePoll,{},[className,cls.btn])}>
                {loading? "Идет опрос.." : "Опросить прибор" }
            </AppButon>}
            <div className={cls.loadbox}>
                {/* {loading && <Loader/>} */}
                {/* {status} */}
            </div>
            <br/>
        </div>
    );
});
