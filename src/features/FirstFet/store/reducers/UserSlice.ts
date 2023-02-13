import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    users:User[];
    isLoading:boolean;
    error:string;
    count:number; 
}


const initialState: UserState = {
    users:[],
    isLoading:false,
    error:"",
    count:0
};
 

export const userSlice = createSlice({
    initialState,
    name:"user",
    reducers:{
        increment(state,action:PayloadAction<number>) {
            state.count+=1;
        },
    }
});

export const userReducer123 = userSlice.reducer;