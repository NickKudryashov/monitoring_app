import $api from "shared/api";
interface RequestProps {
    start_date:string,
    end_date:string,
    archive_type:number,
    device_id:number,
    rewrite:boolean
}
interface PollRequestAnswer {
    task_id:string;
}


export const request_archives = async (props:RequestProps)=>{
    const {archive_type,device_id,end_date,start_date,rewrite} = props;
    const response = await $api.post<PollRequestAnswer>("heat_reports/request/"+device_id,{archive_type,start_date,end_date,rewrite});
    return response.data;
};

