import { ConfigProvider, Empty } from "antd";
import { ReactNode } from "react";

export const AntProvier = ({children}:{children?:ReactNode})=>{
    return (
        <ConfigProvider renderEmpty={() => <Empty description="Нет данных"/>}>
            {children}
        </ConfigProvider>
    )
}