import classNames from "shared/lib/classNames/classNames";
import cls from "./RegPage.module.scss";

import { useState, type PropsWithChildren } from "react";
import { AuthWidget } from "widgets/AuthWidget/AuthWidget";
import { Navbar } from "widgets/Navbar";
import AuthLogoIcon from "shared/assets/icons/AuthLogoIcon.svg";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { AppCheckbox } from "shared/ui/AppCheckbox/AppCheckbox";
import { CompanyForm } from "../companyform/CompanyReg";
import { PersonalForm } from "../userform/PersonalReg";
interface RegPageProps {
 className?: string;
}

export function RegPage(props: PropsWithChildren<RegPageProps>) {
    const { className } = props;
    const [companyForm,setCompanyForm] = useState(true);
    const [checked1,setChecked1] = useState(false);
    const [checked2,setChecked2] = useState(false);
    const [checked3,setChecked3] = useState(false);
    return (
        <div className={classNames(cls.RegPage,{},[className])}>
            <Navbar className={cls.navbar} isAuth={false}/>
            <div className={cls.form}>
                <div className={cls.btns}>
                    <AppButon
                        onClick={()=>setCompanyForm(false)}
                        className={classNames("",{[cls.active_btn]:!companyForm},[])}
                        theme={AppButtonTheme.DESIGNED_PRIMARY}>
                        Физическое лицо
                    </AppButon>
                    <AppButon
                        onClick={()=>setCompanyForm(true)}
                        className={classNames("",{[cls.active_btn]:companyForm},[])} 
                        theme={AppButtonTheme.DESIGNED_PRIMARY}>
                        Юридическое лицо
                    </AppButon>
                </div>
                <h1 className={cls.formHeader}>РЕГИСТРАЦИЯ</h1>
                {
                    companyForm ?
                        <CompanyForm/>
                        :
                        <PersonalForm/>
                }
                <div className={cls.checkBoxes}>
                    <AppCheckbox checked={checked1} onChange={()=>{}} label="Я прочитал и принимаю правила пользования ресурсом"/>
                    <AppCheckbox checked={checked2} onChange={()=>{}} label="Я прочитал и принимаю лицензионное соглашение"/>
                    <AppCheckbox checked={checked3} onChange={()=>{}} label="Я предоставляю согласие на обработку персональных данных"/>
                </div>
                
                <AppButon className={cls.submitBtn} theme={AppButtonTheme.DESIGNED_PRIMARY}>РЕГИСТРАЦИЯ</AppButon>
            </div>
        </div>
    );
}