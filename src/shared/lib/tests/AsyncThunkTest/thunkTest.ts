import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { AppDispatch } from "@/app/providers/StoreProvider/config/store";
import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";

type ThunkActionReturnType<Returned,Args,Rejected> = (args:Args)=>AsyncThunkAction<Returned, Args, {rejectValue:Rejected}>

export class AsyncThunkTest<Returned,Args,Rejected> {
    dispatch:Dispatch;
    getState:()=>StateSchema;
    thunk:ThunkActionReturnType<Returned,Args,Rejected>;
    constructor(action:ThunkActionReturnType<Returned,Args,Rejected>){
        this.thunk=action;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    async callThunk (args:Args) {
        const action = this.thunk(args);
        const result = await action(this.dispatch,this.getState,undefined);
        return result;
    }
}