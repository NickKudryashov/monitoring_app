import {
    ElectroApiDeviceResponse,
    ElectroCounterDeviceDetail,
    ElectroStatistic,
} from "entities/ElectroDevice";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { getSubTab, getTab } from "widgets/SubcategoryTabs";
import cls from "./PageMapper.module.scss";
interface PageMapperProps {
    devData: ElectroApiDeviceResponse;
}

export const PageMapper = (props: PageMapperProps): ReactElement => {
    const { devData } = props;
    const selectedTab = useSelector(getTab);
    const selectedSubTab = useSelector(getSubTab);
    return (
        <>
            {selectedTab === 0 && devData && (
                <VFlexBox align="space-around">
                    <ElectroStatistic
                        className={cls.statistic}
                        autoPollMode={devData.autopoll}
                        id={devData.id}
                        last_poll_seconds={devData.last_poll_seconds}
                        last_update={devData.last_update}
                        pollInterval={devData.interval}
                    />
                    <ElectroCounterDeviceDetail
                        stat={devData?.statistic}
                        className={cls.counters}
                        devname={devData?.name}
                        dev_id={String(devData?.id)}
                    />
                </VFlexBox>
            )}
        </>
    );
};
