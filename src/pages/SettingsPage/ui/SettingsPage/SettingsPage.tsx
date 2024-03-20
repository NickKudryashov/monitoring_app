import { PropsWithChildren, useState } from "react";
import { DetailView } from "widgets/DetailView";
import cls from "./SettingsPage.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { AddCategory } from "features/AddCategory";
import { AddHeatDevice } from "features/AddHeatDevice";
import { AddElectroDevice } from "features/AddElectroDevice";
import { AddPumpDevice } from "features/AddPumpStationDevice";
import { AddAutoDevice } from "features/AddAutoDevice";
import { AddObject } from "features/AddObject";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
interface SettingsPageProps {
    className?: string;
   }
const MOCK = ["ОБЪЕКТЫ","СИСТЕМЫ","ЗАДАЧИ","АРХИВ","АНАЛИТИКА","ЗАЯВКИ","ПЛАНОВЫЕ РАБОТЫ","ВИДЕОКАМЕРЫ",];
const MOCK1 = [1,2,3,4,5,6,7];
const SettingsPage = (props: PropsWithChildren<SettingsPageProps>) => {
    const { className } = props;
    const [addSubcatModal,setAddSubcatModal] = useState(false);
    const [addHeatModal,setAddHeatModal] = useState(false);
    const [addPumpModal,setPumpModal] = useState(false);
    const [addElectroModal,setElectroModal] = useState(false);
    const [addAutoModal,setAutoModal] = useState(false);
    const [addObjectModal,setAddObjectModal] = useState(false);
    const navigate = useNavigate();
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
                                        {  el!=="СИСТЕМЫ" &&<p>Фича</p>}
                                        {
                                            el==="СИСТЕМЫ" && el1===1 && 
                                            <div>
                                                <p onClick={()=>setAddSubcatModal(true)}>Добавить систему</p>
                                                <AddCategory isOpen={addSubcatModal} onClose={()=>setAddSubcatModal(false)} />
                                            </div>
                                        }
                                        {
                                            el==="СИСТЕМЫ" && el1===2 && 
                                            <div>
                                                <p onClick={()=>setAddHeatModal(true)}>Добавить теплосчетчик</p>
                                                <AddHeatDevice isOpen={addHeatModal} onClose={()=>setAddHeatModal(false)} />
                                            </div>
                                        }
                                        {
                                            el==="СИСТЕМЫ" && el1===3 && 
                                            <div>
                                                <p onClick={()=>setElectroModal(true)}>Добавить электро</p>
                                                <AddElectroDevice isOpen={addElectroModal} onClose={()=>setElectroModal(false)} />
                                            </div>
                                        }
                                        {
                                            el==="СИСТЕМЫ" && el1===4 && 
                                            <div>
                                                <p onClick={()=>setPumpModal(true)}>Добавить насосную</p>
                                                <AddPumpDevice isOpen={addPumpModal} onClose={()=>setPumpModal(false)} />
                                            </div>
                                        }
                                        {
                                            el==="СИСТЕМЫ" && el1===5 && 
                                            <div>
                                                <p onClick={()=>setAutoModal(true)}>Добавить автоматику</p>
                                                <AddAutoDevice isOpen={addAutoModal} onClose={()=>setAutoModal(false)} />
                                            </div>
                                        }
                                        {
                                            el==="СИСТЕМЫ" && el1===6 && 
                                            <div>
                                                <p onClick={()=>setAddObjectModal(true)}>Добавить объект</p>
                                                <AddObject isOpen={addObjectModal} onClose={()=>setAddObjectModal(false)} />
                                            </div>
                                        }
                                        {
                                            el==="СИСТЕМЫ" && el1===7 && 
                                            <div>
                                                <p onClick={()=>navigate(RoutePathAuth.object_subcat_edit)}>Системы объекта</p>
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