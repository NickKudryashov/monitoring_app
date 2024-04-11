import { ReactElement, useState } from "react";
import { PollBlock } from "../PollBlock/PollBlock";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ArchiveView.module.scss";
import { CreateReportBlock } from "../CreateReportBlock/CreateReportBlock";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Colontitul } from "../Colontitul/Colontitul";
import { getArchives } from "pages/HeatSubcategoryPage/api/api";
import { HeatDevice } from "entities/Heatcounters";
import { GeneralAnswer } from "features/PageHeader/api/api";
function ArchiveView(props:{id:string,deviceData:HeatDevice,generalData:GeneralAnswer}):ReactElement {
    const {id,deviceData,generalData} = props;
    const {data,isLoading} = getArchives(id);
    return(
        <VFlexBox gap="20px" className={cls.ArchiveView}>
            <HFlexBox align="space-between" height="70%">
                {!isLoading && <CreateReportBlock generalData={generalData} deviceData={deviceData} archData={data}/>}
            </HFlexBox>
            <HFlexBox align="space-between" height="20%">
                {/* <Colontitul/> */}
                {/* <Colontitul/> */}
            </HFlexBox>
        </VFlexBox>
    );
}

export {ArchiveView};