import $api, { API_URL } from "shared/api";
import { TopLevelElectroDevice } from "../model/types/electroDevice";

export const downloadXLSFile = async (dev: TopLevelElectroDevice) => {
    const response = $api.post(`electro_report/${dev.id}`);
    fetch(`${API_URL}electro_report/${dev.id}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
    }).then((response) => {
        response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            // console.log(url);
            a.href = url;
            a.download = `${dev.name}_${dev.device_type_verbose_name}_отчет.xlsx`;
            a.click();
            a.remove();
        });
    });
};