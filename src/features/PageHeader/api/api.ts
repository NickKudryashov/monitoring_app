import { rtkApi } from "shared/api/rtkApi";

export interface GeneralAnswer {
    subcat_name:string;
    user_object_name:string;
    adress:string;
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