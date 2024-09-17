import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./PageHeader.module.scss";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
interface PageHeaderProps {
    objID:string;
    setObjId:(objID:string)=>void;
}

export const PageHeader = (props:PageHeaderProps)=>{
    const {objID,setObjId} = props;
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    return (
        <HFlexBox height="10%">
            <HFlexBox align="space-between">
                <VFlexBox width="40%">
                    <p>Объект</p>
                    <select className={cls.selectors} value={objID} onChange={(e)=>setObjId(e.target.value)}>
                        <option value={""} disabled>{"Выберите объект"}</option>
                        {
                            objects.map((el)=>
                                <option key={el.id} value={el.id}>{el.name}</option>
                            )
                        }
                    </select>
                </VFlexBox>
                <VFlexBox width="40%">
                    <p>Адрес</p>
                    <select className={cls.selectors} value={objID} onChange={(e)=>setObjId(e.target.value)}>
                        <option value={""} disabled>{"Выберите адрес объекта"}</option>
                        {
                            objects.map((el)=>
                                <option key={el.id} value={el.id}>{el.address}</option>
                            )
                        }
                    </select>
                </VFlexBox>
            </HFlexBox>
        </HFlexBox>
    );
};