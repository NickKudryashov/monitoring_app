import { rtkApi } from "shared/api/rtkApi";

const pumpSubcatApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPumpSubcat: build.query<number[],string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/pump",
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getPumpDevs = pumpSubcatApi.useGetPumpSubcatQuery;
