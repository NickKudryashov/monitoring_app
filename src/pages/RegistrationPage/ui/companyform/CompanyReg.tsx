import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import cls from "./CompanyReg.module.scss";
export const CompanyForm = ()=>{
    return (
        <div className={cls.form}>
            <AppInput className={cls.authInp}  placeholder="Полное наименование организации"/>
            <AppInput className={cls.authInp}  placeholder="ИНН"/>
            <AppInput className={cls.authInp}  placeholder="КПП"/>
            <AppInput className={cls.authInp}  placeholder="ФИО"/>
            <AppInput className={cls.authInp}  placeholder="Должность"/>
            <AppInput className={cls.authInp}  placeholder="Юридический адрес"/>
            <AppInput className={cls.authInp}  placeholder="Фактический адрес"/>
            <AppInput className={cls.authInp}  placeholder="Телефон"/>
            <AppInput className={cls.authInp}  placeholder="Email"/>
            <AppInput className={cls.authInp}  placeholder="Имя пользователя"/>
            <AppInput className={cls.authInp}  placeholder="Пароль"/>
            <AppInput className={cls.authInp}  placeholder="Повторите пароль"/>
            <AppInput className={cls.authInp}  placeholder="Промокод"/>

        </div>
    );
};