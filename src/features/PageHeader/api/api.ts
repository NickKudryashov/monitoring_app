import { SubcategoryAnswer } from "entities/ObjectSubCategory";
import { rtkApi } from "shared/api/rtkApi";

export interface GeneralAnswer extends SubcategoryAnswer {
    id:number;
    subcat_name:string;
    user_object_name:string;
    adress:string;
    abonent:string;
    last_update:string;
    user_object:number;
}
const generalSubcatQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSubcatGeneral: build.query<GeneralAnswer,string>({
            query: (id) => {
                return {
                    url:"subcat_general/"+id,
                };
            },
        }),
    }),
    overrideExisting: false, 
});

export const getSubcatGeneralInfo = generalSubcatQuery.useGetSubcatGeneralQuery;