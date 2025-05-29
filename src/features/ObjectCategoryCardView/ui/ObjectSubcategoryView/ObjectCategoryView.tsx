import classNames from '@/shared/lib/classNames/classNames'
import cls from './ObjectCategoryView.module.scss'

import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RoutePathAuth } from '@/shared/config/RouteConfig/RouteConfig'
import { HFlexBox } from '@/shared/ui/FlexBox/HFlexBox/HFlexBox'
import { VFlexBox } from '@/shared/ui/FlexBox/VFlexBox/VFlexBox'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { useSelector } from 'react-redux'
import { StateSchema } from '@/app/providers/StoreProvider/config/stateSchema'
import { subcatCardSliceActions } from '../../model/cardSlice'
import {
    SubcatIcon,
    SubcategoryAnswer,
    SubcategoryStatus,
    editSubcatOrder,
    getObjectSubcategoryData,
} from '@/entities/ObjectSubCategory'
import { ROUTE_MAPPER } from '@/shared/lib/helpers/subcategoryTypeMapper'
import { getSelectedSystemCard } from '../../model/selectors/selectors'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { useCalcParams } from '../../hooks/useCalcParams'
import { editUserObject } from '@/entities/Objects'
import EyeIcon from '@/shared/assets/icons/EyeVisible.svg'
import EyeDisableIcon from '@/shared/assets/icons/EyeDisable.svg'
interface ObjectCategoryViewProps {
    className?: string
    adress: string
    abonent: string
    last_update: string
    visible: boolean
    searchParams: URLSearchParams
    id: number
}

export function ObjectCategoryView(props: PropsWithChildren<ObjectCategoryViewProps>) {
    const { className = '', id, adress, last_update, abonent, visible, searchParams } = props
    const params = useMemo(() => {
        const evs = searchParams.get('events')
        const no_answer = searchParams.get('no_answer')
        if (evs) {
            return { events: evs }
        } else if (no_answer) {
            return { no_answer: no_answer }
        } else return {}
    }, [searchParams])
    const { data, isLoading, refetch } = getObjectSubcategoryData({
        id,
        ...params,
    })

    useEffect(() => {
        refetch()
    }, [params])
    const [editOrder, { isLoading: isUpdating }] = editSubcatOrder()
    const [editMutation] = editUserObject()
    const dispatch = useAppDispatch()
    const isMobile = useMobilDeviceDetect()
    const selectedItem = useSelector(getSelectedSystemCard)
    const navigate = useNavigate()
    const onSubcatClick = (el: SubcategoryAnswer) => {
        return ROUTE_MAPPER[el.subcategory_type] + el.id
    }
    const calculateMods = useCallback(
        (index: number) => ({
            [cls.greymarker]: data?.data[index].status === SubcategoryStatus.no_answer,
            [cls.greenmarker]: data?.data[index].status === SubcategoryStatus.success,
        }),
        [data],
    )

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, el: SubcategoryAnswer) => {
        // console.log("старт на ",el.name,el.user_object);
        dispatch(subcatCardSliceActions.setItem(el))
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {}
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {}
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dropHandler = (e: React.DragEvent<HTMLDivElement>, el: SubcategoryAnswer) => {
        e.preventDefault()
        const success = selectedItem && el.user_object === selectedItem.user_object
        if (success) {
            editOrder({ id: selectedItem.id, order_index: el.order_index })
            editOrder({ id: el.id, order_index: selectedItem.order_index })
        }
        dispatch(subcatCardSliceActions.removeItem())
    }

    if (data?.data.length === 0) {
        return null
    }

    return (
        <VFlexBox className={classNames(cls.ObjectCategoryView, {}, [className])}>
            <VFlexBox alignItems='center' align='center' gap='5px' height='20%' className={cls.cardHeader}>
                <HFlexBox height={'40%'} align='center' alignItems='center' gap='7px'>
                    <b className={cls.objType}>{abonent}</b>
                    {visible ? (
                        <EyeIcon
                            className={cls.icon}
                            onClick={() => editMutation({ id, visible: !visible })}
                        />
                    ) : (
                        <EyeDisableIcon
                            className={cls.icon}
                            onClick={() => editMutation({ id, visible: !visible })}
                        />
                    )}
                </HFlexBox>
                <b className={cls.addr}>{adress}</b>

                {/* <div
                    onClick={() => editMutation({ id, visible: !visible })}
                    style={{ height: "47%" }}
                    className={cls.addr}
                >
                    {visible ? <EyeIcon /> : <EyeDisableIcon />}
                </div> */}
                {/* {
                    data &&
                    <p className={cls.sysCountPref}>{`Количество систем: ${data.count}`}</p>
                } */}
            </VFlexBox>
            <VFlexBox height='78%' className={cls.systemsBox}>
                {data &&
                    data.data.map((el, i) => (
                        <HFlexBox
                            align='space-around'
                            alignItems='center'
                            onClick={() => navigate(onSubcatClick(el))}
                            key={el.id}
                            className={classNames(cls.systemLine, calculateMods(i), [])}
                            draggable={true}
                            onDragStart={(e) => dragStartHandler(e, el)}
                            onDragLeave={dragLeaveHandler}
                            onDragEnd={dragEndHandler}
                            onDragOver={dragOverHandler}
                            onDrop={(e) => dropHandler(e, el)}
                        >
                            <p style={{ width: '75%' }}>{el.name}</p>
                            <SubcatIcon subcategory_type={el.subcategory_type} />
                        </HFlexBox>
                    ))}
                {!isMobile && (
                    <div className={classNames(cls.systemLine, {}, [])}>
                        <p>{'+ добавить систему'}</p>
                    </div>
                )}
            </VFlexBox>
            {/* <p className={cls.datetimeField}>{"дата последнего обновления:  "+last_update ?? "-"}</p> */}
        </VFlexBox>
    )
}
