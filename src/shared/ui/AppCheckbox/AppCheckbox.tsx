import classNames from 'shared/lib/classNames/classNames';
import cls from './AppCheckbox.module.scss';

import type { PropsWithChildren } from 'react';


export enum AppCheckboxThemes {
    AUTH='auth'
}


interface AppCheckboxProps {
 className?: string;
 checked:boolean;
 onChange:(value:boolean)=>void;
 label?:string;
}

export function AppCheckbox(props: PropsWithChildren<AppCheckboxProps>) {
 const { className=AppCheckboxThemes.AUTH,checked,onChange,label='' } = props;

 const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>onChange(e.target.checked)
 return (
    <div className={classNames(cls.AppCheckbox,{},[cls[className]])}>
    <input 
        
        type='checkbox'
        checked={checked}
        onChange={onChangeHandler}
    />{label}
    </div>

 );
}