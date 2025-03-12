import { GSMConnection, InternetConnection } from "@/shared/types/connectionTypes";
import { FormInstance } from "antd";
import { useEffect } from "react"
interface HookProps {
    isGetSuccess:boolean;
    form:FormInstance
    currentConnection?:InternetConnection | GSMConnection
}
export const useInitData = ({form,isGetSuccess,currentConnection}:HookProps)=>{
    useEffect(() => {
            if (isGetSuccess && form && currentConnection) {
                if (currentConnection.connection_type === 'GSM') {
                    form.setFieldsValue({
                        connection_type: 'GSM',
                        phonenumber: currentConnection.phonenumber,
                    })
                } else {
                    form.setFieldsValue({
                        connection_type: currentConnection.connection_type,
                        ip: currentConnection.ip,
                        port: currentConnection.port,
                    })
                }
            }
        }, [isGetSuccess, form])
}

export const prepareData = ({form}:{form:FormInstance<InternetConnection | GSMConnection>}):InternetConnection | GSMConnection=>{
    const { connection_type } = form.getFieldsValue()
    if (connection_type === 'GSM') {
        const phone = form.getFieldValue('phonenumber')
        return {connection_type,phonenumber:phone} 
    } else {
        const ip = form.getFieldValue('ip')
        const port = form.getFieldValue('port')
        return {connection_type,ip,port} 
    }
}