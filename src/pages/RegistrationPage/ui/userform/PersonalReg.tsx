import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import cls from "./PersonalReg.module.scss";
export const PersonalForm = ()=>{
    return (
        <div className={cls.form}>
            <AppInput className={cls.authInp}  placeholder="Фамилия"/>
            <AppInput className={cls.authInp}  placeholder="Имя"/>
            <AppInput className={cls.authInp}  placeholder="Отчество"/>
            <AppInput className={cls.authInp}  placeholder="Место проживания"/>
            <AppInput className={cls.authInp}  placeholder="Телефон"/>
            <AppInput className={cls.authInp}  placeholder="Email"/>
            <AppInput className={cls.authInp}  placeholder="Имя пользователя"/>
            <AppInput className={cls.authInp}  placeholder="Пароль"/>
            <AppInput className={cls.authInp}  placeholder="Повторите пароль"/>
            <AppInput className={cls.authInp}  placeholder="Промокод"/>
        </div>
    );
};