import { ReactElement, useState } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumn.module.scss";
import { PARAMBOX_MAPPER } from "../ParameterView/ParameterView";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatParameters, editHeatParameterName } from "entities/Heatcounters";
import classNames from "shared/lib/classNames/classNames";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { useDebounce } from "shared/hooks/useDebounce";
interface ParameterColumnProps {
    params:HeatParameters[];
    header:string;
}


interface ParameterNameWithID{
    [key : number]:string;
}
export function ParameterColumn (props:ParameterColumnProps):ReactElement{
    const {header,params} = props;
    
    return(
        <VFlexBox width={"45%"} height={"45%"} alignItems="center"className={cls.paramFlexBox}>
            {/* <div className={cls.paramBoxHeader}> */}
            <p className={classNames(cls.sysHeader,{},[cls.paramBoxHeader])}>{`ПАРАМЕТРЫ КОНТУРА ${header}`}</p>
            {/* </div> */}
            <VFlexBox className={cls.rows} height="80%">
                {params?.map((elem) => 
                    <ParameterRow key={elem.id} elem={elem} />
                )}
            </VFlexBox>
        </VFlexBox>
    );
}

interface ParameterRowProps {
    elem:HeatParameters;
}

const ParameterRow = (props:ParameterRowProps)=>{
    const {elem} = props;
    const [paramName,setParamName] = useState(elem.name);
    const [edit] = editHeatParameterName();
    const debouncedEdit = useDebounce(edit,1500);
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setParamName(e.target.value);
        debouncedEdit({id:elem.id,comment:e.target.value});
    };
    return (
        <HFlexBox height={"10%"} className={cls.paramRow}  alignItems="end" align="space-around">
            <div className={cls.paramVerboseWrapper}>
                <AppInput className={cls.inp} theme={InputThemes.CLEAR} value={paramName} onChange={onNameChange}/>
            </div>
            <p className={cls.paramNameField}>{elem.tag}</p>
            <HFlexBox alignItems="center" align="space-around" className={classNames(cls.paramValueWrapper,{[cls.redMark]:!elem.updated},[])}  width={"30%"}>
                <p className={classNames(cls.valueField,{},[])}>{elem.value}</p>
                <p className={cls.dimensionField}>{elem.dimension}</p>

            </HFlexBox>
                        
        </HFlexBox>
    );
};