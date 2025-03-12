import classNames from '@/shared/lib/classNames/classNames'
import cls from './PumpSubcategoryMobilePage.module.scss'

import { type PropsWithChildren, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { VFlexBox } from '@/shared/ui/FlexBox/VFlexBox/VFlexBox'
import $api from '@/shared/api'
import { EventAnswer } from '@/shared/types/eventTypes'
import { PageHeader, getSubcatGeneralInfo } from '@/features/PageHeader'
import {
    getPumpData,
    getPumpDataDetail,
    pumpPoll,
    usePumpPoll,
} from '@/entities/PumpDevice'
import { GeneralInfoBlock } from '@/features/SubcategoryGeneralInfo/ui/GeneralInfoBlock'
import { PumpParameter } from '@/entities/PumpDevice/model/types/pumpDevice'
import { SubcategoryTabs } from '@/widgets/SubcategoryTabs/ui/SubcategoryTabs'
import { getPumpDeviceIdBySystem } from '@/entities/ObjectSubCategory'
import { PageMapper } from '../PageMapper/PageMapper'
import { ParameterLinks } from '../ParameterLinks/ParameterLinks'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { MOCK_ID, MOCK_STR_ID } from '@/shared/lib/util/constants'
import { pumpPageSliceActions } from '../../model/slice'
import { usePoll } from '@/shared/hooks/useDevicePoll'
import { FooterWithoutPanel } from '@/shared/ui/FooterWithoutPanel/FooterWithoutPanel'
import { PumpForm } from '@/widgets/ConnectionForm/PumpForm/PumpForm'

interface PumpSubcategoryMobilePageProps {
    className?: string
}

export type ParametersDict = Record<string, PumpParameter[]>

const PumpSubcategoryMobilePage = (
    props: PropsWithChildren<PumpSubcategoryMobilePageProps>,
) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const { data: generalData, refetch: refetchGeneral } = getSubcatGeneralInfo(
        id ?? MOCK_STR_ID,
    )
    const { data: device, isLoading: isLoadingDevices } =
        getPumpDeviceIdBySystem(id ?? MOCK_STR_ID)
    const dispatch = useAppDispatch()
    const {
        data: deviceData,
        isLoading: isDevLoading,
        refetch,
    } = getPumpData(device?.device ?? MOCK_ID, {
        pollingInterval: 15000,
        skip: !device?.device,
    })
    const {
        data: deviceDataDetail,
        isLoading: isDevDetailLoading1,
        refetch: refetchDetail,
    } = getPumpDataDetail(device?.device ?? MOCK_ID, {
        pollingInterval: 15000,
        skip: !device?.device,
    })
    const [poll, isBusy] = usePoll({
        autoPoll: deviceData?.connection_info.connection_type !== 'GSM',
        pollDevice: pumpPoll,
        initialBusy: deviceData?.is_busy,
        id: deviceData?.id ?? MOCK_ID,
        onUpdate: () => {
            refetch()
            refetchGeneral()
            refetchDetail()
        },
    })
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>('subcategory_events/' + id)
        return response.data
    }, [id])

    useEffect(() => {
        return () => {
            dispatch(pumpPageSliceActions.clearParameterSubgroup())
        }
    }, [])

    const content = (
        <VFlexBox className={cls.detail}>
            <PageHeader poll={poll} generalData={generalData} isBusy={isBusy} />
            <PumpForm id={Number(id)} />

            <SubcategoryTabs
                content={{
                    0: [
                        <GeneralInfoBlock
                            key={'general'}
                            device_num={deviceData?.device_num}
                            device_type_verbose_name={
                                deviceData?.device_type_verbose_name
                            }
                            systems={0}
                            address={generalData?.adress}
                            name={generalData?.abonent}
                        />,
                    ],
                    1: [
                        <p key={'events_1'} className={cls.paramTitle}>
                            СПИСОК СОБЫТИЙ
                        </p>,
                        <p key={'events_2'} className={cls.paramTitle}>
                            ЛОГ СОБЫТИЙ
                        </p>,
                        <p key={'events_3'} className={cls.paramTitle}>
                            ДОБАВИТЬ СОБЫТИЕ
                        </p>,
                    ],
                    2: ParameterLinks({
                        deviceDataDetail: deviceDataDetail,
                    }),
                }}
            />
            {deviceData &&
                deviceData.parameters &&
                deviceDataDetail &&
                generalData && (
                    <PageMapper
                        devData={deviceData}
                        deviceDataDetail={deviceDataDetail}
                        generalData={generalData}
                    />
                )}
            <FooterWithoutPanel
                className={cls.footer}
                pollCallback={fetchEvents}
            />
        </VFlexBox>
    )

    return (
        <div className={classNames(cls.PumpSubcategoryMobilePage, {}, [])}>
            {content}
        </div>
    )
}

export default PumpSubcategoryMobilePage
