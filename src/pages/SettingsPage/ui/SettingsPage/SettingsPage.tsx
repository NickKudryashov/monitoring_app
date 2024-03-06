import { PropsWithChildren, useState } from "react";
import { DetailView } from "widgets/DetailView";
import cls from "./SettingsPage.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { AddCategory } from "features/AddCategory";
interface SettingsPageProps {
    className?: string;
   }
const MOCK = ["ОБЪЕКТЫ","СИСТЕМЫ","ЗАДАЧИ","АРХИВ","АНАЛИТИКА","ЗАЯВКИ","ПЛАНОВЫЕ РАБОТЫ","ВИДЕОКАМЕРЫ",];
const MOCK1 = [1,2,3,4,5,6,7];
const SettingsPage = (props: PropsWithChildren<SettingsPageProps>) => {
    const { className } = props;
    const [addSubcatModal,setAddSubcatModal] = useState(false);
    const content = (
        <DetailView>
            <HFlexBox gap="20px" height="90%" align="center" className={cls.plate}>
                {
                    MOCK.map((el)=>
                        <VFlexBox alignItems="center" gap="15px" className={cls.featureBox} width="20%" height="49%" key={el}>
                            <p className={cls.featureBoxHeader}>{el}</p>
                            <VFlexBox width="90%"  gap="5px" alignItems="center" align="space-around" height="80%">
                                { MOCK1.map((el1)=>
                                    <HFlexBox className={cls.feature} align={"center"} alignItems="center" height={"13%"} key={el}>
                                        {  (el!=="СИСТЕМЫ" || el1!==1) &&<p>Фича</p>}
                                        {
                                            el==="СИСТЕМЫ" && el1===1 && 
                                            <div>
                                                <p onClick={()=>setAddSubcatModal(true)}>Добавить систему</p>
                                                <AddCategory isOpen={addSubcatModal} onClose={()=>setAddSubcatModal(false)} />
                                            </div>
                                        }
                                    </HFlexBox>)}
                            </VFlexBox>
                        </VFlexBox>
                    )
                }
                
            </HFlexBox>
        </DetailView>
    );
   
    return (
        <div  className={classNames(cls.SettingsPage,{},[])}>
            {content}
            {/* {devData && <AutoPoll autoPoll id={devData.id} onUpdate={refetchDev} />} */}
        </div>
    );
};
   
export default SettingsPage;