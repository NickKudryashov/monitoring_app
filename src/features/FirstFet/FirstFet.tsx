// import classNames from 'shared/lib/classNames/classNames';
// import cls from './FirstFet.module.scss';

// import type { PropsWithChildren } from 'react';
// import { useSelector } from 'react-redux';
// import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
// import { userSlice } from './store/reducers/UserSlice';

// interface FirstFetProps {
//  className?: string;
// }

// export function FirstFet(props: PropsWithChildren<FirstFetProps>) {
//  const { className } = props;
//  const {increment} = userSlice.actions
//  const dispatch = useAppDispatch()
//  const counter = useAppSelector(state=>state.userReducer.count)
//  return (
// <div className={classNames(cls.FirstFet,{},[className])}>
//     <b>{`Значение счетчика ${counter}`}</b>
//     <button onClick={()=>dispatch(increment())}>ИНК</button>
// </div>
//  );
// }