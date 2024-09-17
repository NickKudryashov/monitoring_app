//automatic_parameter_chart/<int:id>
//heat_parameter_chart/<int:id>

import $api from "@/shared/api";

//pump_parameter_chart/<int:id>
interface RequestProps {
    id:number;
    startDate:string;
    endDate:string;
}

interface ResponseData {
    min:number;
    max:number;
    datalist:Datalist[]
}

interface Datalist {
    datetime:number;
    value:number;
}
export const getHeatParameterForChart =  async (requestProps:RequestProps)=>{
    const {id,endDate,startDate} = requestProps;
    const response = await $api.post<ResponseData>(`heat_parameter_chart/${id}`,{start_date:(new Date(startDate).getTime()/1000),end_date:(new Date(endDate).getTime()/1000)});
    return response.data;
};
export const getAutoParameterForChart =  async (requestProps:RequestProps)=>{
    const {id,endDate,startDate} = requestProps;
    const response = await $api.post<ResponseData>(`automatic_parameter_chart/${id}`,{start_date:(new Date(startDate).getTime()/1000),end_date:(new Date(endDate).getTime()/1000)});
    return response.data;
};
export const getPumpParameterForChart =  async (requestProps:RequestProps)=>{
    const {id,endDate,startDate} = requestProps;
    const response = await $api.post<ResponseData>(`pump_parameter_chart/${id}`,{start_date:(new Date(startDate).getTime()/1000),end_date:(new Date(endDate).getTime()/1000)});
    return response.data;
};