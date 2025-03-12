export {useAutoPoll} from "./model/hooks/useAutoPoll";
export {ParameterColumn as AutoParameterColumn} from "./ui/ParameterColumn/ParameterColumn";
export {ParameterRow as AutoParameterRow} from "./ui/ParameterRow/ParameterRow";
export type {AutoParameter,ParameterGroup,AutomaticDeviceData} from "./model/types/AutomaticDeviceTypes";
export {ParameterComposition as AutoDevParametersComposition} from "./ui/ParameterComposition/ParameterComposition";
export {getAutomaticDeviceTypes} from "./api/AutomaticDeviceApi";
export {ManualPoll as AutoDevicePoll} from './model/service/pollService'
export {useEditAutoConnectionInfoMutation
    ,useGetAutoConnectionInfoQuery} from './api/AutomaticDeviceApi'