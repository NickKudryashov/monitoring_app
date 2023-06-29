import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";
import $api from "shared/api";
import { HeatArchivesRecord } from "../../types/heatArchives";

// 'heat_reports/request/<int:dev_id>'
// 'heat_reports/create/<int:dev_id>'
// heat_reports/info/<int:system_id>
interface RequestProps {
    start_date:string,
    end_date:string,
    archive_type:number,
    device_id:number
}
interface PollRequestAnswer {
    task_id:string;
}

interface RecordInfoProps {
    start_date:string;
    end_date:string;
    count:number;
    name:string;
    formula:string;
    schema:string;

}

type TaskStatus = boolean | null

export const request_archives = async (props:RequestProps)=>{
    const {archive_type,device_id,end_date,start_date} = props;
    const response = await $api.post<PollRequestAnswer>("heat_reports/request/"+device_id,{archive_type,start_date,end_date});
    return response.data;
};

export const request_polling_status = async (task_id:string)=>{
    const response = await $api.put<{status:TaskStatus}>("heat_reports/request/0",{task_id});
    return response.data;
};

export const request_system_date = async (system_id:number)=>{
    const response = await $api.get<RecordInfoProps>(`heat_reports/info/${system_id}`);
    return response.data;
};

export const fetchArchData = createAsyncThunk(
    "archives",async (sysId:number,thunkApi)=>{
        const response =  await $api.get<RecordInfoProps>(`heat_reports/info/${sysId}`);
        return {
            ...response.data,
            id:sysId
        };
    }
);

// export const get_archive = (props:RequestProps)=>{
//     const {archive_type,device_id,end_date,start_date} = props;
//     const 
// }
// interface ICategoryPageProps {
 
// }

// export const fetchArchivesData = createAsyncThunk<HeatArchivesRecord[],number,ThunkConfig<string>>("***/Archives", async (system_id, thunkApi) => {
//     const { dispatch, extra, rejectWithValue, getState } = thunkApi;

//     try {
//         const response = await request_system_date(system_id);
//         response.
//         if (!response.data) throw new Error();

//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return rejectWithValue("ERROR");
//     }
// });