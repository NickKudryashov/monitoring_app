import { StateSchema } from "app/providers/StoreProvider/config/stateSchema"
import { useSelector } from "react-redux"

type Selector<T,Args extends any[]> = (state:StateSchema,...args:Args)=>T
type Hook<T,Args extends any[]> = (...args:Args)=>T
type Result<T,Args extends any[]> = [Hook<T,Args>,Selector<T,Args>]

export const buildSelector = <T,Args extends any[]>(selector:Selector<T,Args>):Result<T,Args>=>{
    const selected:Hook<T,Args> = (...args:Args)=>{
        return  useSelector((state:StateSchema)=>selector(state,...args))
    }
    return [selected,selector]
}