import classNames from 'shared/lib/classNames/classNames';
import cls from './AppTab.module.scss';

import { PropsWithChildren, useState } from 'react';


//Разобраться с any

export enum AppTabThemes {
    AUTH='auth',
}


interface AppTabProps {
 className?: string;
 theme?:AppTabThemes;
 tabs:any[];

}

export function AppTab(props: PropsWithChildren<AppTabProps>) {
    const { className,tabs,theme=AppTabThemes.AUTH } = props;
    const [activeTab,setActiveTab] = useState<number>(0)
 return (
<div className={classNames(cls.AppTab,{},[className,cls[theme]])}>
 
    <div className={cls.container}>
        <div className={cls.buttons}>
            {tabs.map(({name,Content,contentProps},index)=>
            <button onClick={()=>setActiveTab(index)}>{name}</button>
            )}
        </div>
        {tabs.map(({name,Content,contentProps},index)=>
         <div>{index===activeTab && <Content {...contentProps}/>}</div>)}
    </div>

</div>
 );
}