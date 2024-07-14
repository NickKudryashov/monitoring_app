import { ObjectItem } from "entities/Objects";
import { SubcategoryAnswer, SubcatTypes } from "entities/ObjectSubCategory";

export interface SubtabContent {
    name: string;
    id: number;
    user_object_id:number;
    subcat_id:number;
}


export interface SubtabContentDeleteProps {
    name: string;
    id: number;
}


export interface SelectedParameters {
    [SubcatTypes.heat]:SubtabContent[];
    [SubcatTypes.auto]:SubtabContent[];
    [SubcatTypes.pump]:SubtabContent[];
    [SubcatTypes.electro]?:SubtabContent[];
}

export interface ParameterFragment {
    min_value:number;
    max_value:number;
    name:string;
}
export interface ParameterFragmentProps extends ParameterFragment {
    id:number;
}
export interface ParameterFragmentDeleteProps{
    id:number;
}

export interface SystemFragment {
    systemInfo:SubcategoryAnswer;
    parameters:Record<number,ParameterFragment>
}
export interface SystemFragmentProps {
    systemInfo:SubcategoryAnswer;
    parameter:ParameterFragmentProps;
}

export interface SystemFragmentDeleteProps {
    systemInfo:SubcategoryAnswer;
    parameter:ParameterFragmentDeleteProps;
}

export interface ChartFragmentDeleteProps {
    user_object_id:number;
    subcat_id:number;
    id:number;
}

export interface UserObjectFragment {
    userObjectData:ObjectItem;
    systems:Record<number,SystemFragment>
}

export interface ChartFragmentProps {
    userObjectData:ObjectItem;
    system:SystemFragmentProps 
}

export interface ChartBuilderStateSchema {
    selectedParameters:SelectedParameters;
    reportData?:Record<number,UserObjectFragment>;
}

export interface DeleteParameterArgs {
    subtype:SubcatTypes;
    content:SubtabContent
}