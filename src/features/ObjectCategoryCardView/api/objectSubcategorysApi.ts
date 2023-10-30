import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
interface SubcategoryAnswer {
    id:number;
    name:string;
}

interface ObjectAnswer {
    data:SubcategoryAnswer[];
    count:number;
}
const objectSubcategoryQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getObjectSubcategorys: build.query<ObjectAnswer,number>({
            query: (id) => {
                return {
                    url:"subcategory/"+id,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getObjectSubcategoryData = objectSubcategoryQuery.useGetObjectSubcategorysQuery;