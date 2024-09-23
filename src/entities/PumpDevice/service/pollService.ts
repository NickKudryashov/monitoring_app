import $api from "@/shared/api";

export const pumpPoll = async (id:number)=>$api.post<{task_id:string}>("pump/poll/"+id)